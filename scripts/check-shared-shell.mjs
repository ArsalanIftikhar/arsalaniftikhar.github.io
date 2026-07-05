import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outputRoot = path.join(root, "_site");

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function countMatches(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

function hasHref(html, href) {
  const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`<a\\b[^>]*href="${escaped}"`, "i").test(html);
}

function addCheck(failures, condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

async function main() {
  if (!existsSync(outputRoot)) {
    throw new Error("_site does not exist. Run `npm run build` before `npm run check:shell`.");
  }

  const [profile, contacts, cv, routes, seo] = await Promise.all([
    readJson("src/_data/profile.json"),
    readJson("src/_data/contacts.json"),
    readJson("src/_data/cv.json"),
    readJson("src/_data/routes.json"),
    readJson("src/_data/seo.json"),
  ]);

  const pages = [
    {
      file: "about.html",
      route: routes.about,
      extraChecks(html, decoded, failures) {
        addCheck(
          failures,
          decoded.includes(profile.primaryTitle) || decoded.includes(profile.coreProposition),
          "about.html must include the confirmed primary title or proposition.",
        );
        addCheck(failures, decoded.includes(profile.location), "about.html must include West Yorkshire, UK.");
        addCheck(failures, decoded.includes(profile.relocation), "about.html must include Open to relocation.");
      },
    },
    {
      file: "contact.html",
      route: routes.contact,
      extraChecks(html, decoded, failures) {
        addCheck(
          failures,
          decoded.includes(contacts.career.email),
          "contact.html must include the career email address.",
        );
        addCheck(
          failures,
          decoded.includes(contacts.consulting.email),
          "contact.html must include the consulting email address.",
        );
      },
    },
  ];

  const phoneAndMessagingPatterns = [
    /\+44\s*7594\s*967785/i,
    /\+447594967785/i,
    /07594967785/i,
    /447594967785/i,
    /7594967785/i,
    /tel:/i,
    /wa\.me/i,
    /whatsapp/i,
  ];

  const statusTerminologyPatterns = [
    /evidence[-\s]?status/i,
    /verification[-\s]?status/i,
    /approval[-\s]?status/i,
    /confidentiality[-\s]?status/i,
    /readiness[-\s]?field/i,
    /evidence[-\s]?quality/i,
    /conditional[-\s]?publication/i,
    /draft[-\s]?claim/i,
    /unresolved[-\s]?metric/i,
  ];

  const failures = [];
  const checked = [];

  for (const page of pages) {
    const outputPath = path.join(outputRoot, page.file);
    const html = await readFile(outputPath, "utf8");
    const decoded = decodeHtml(html);
    const pageFailures = [];
    const canonicalUrl = seo.baseCanonicalUrl + page.route.canonicalPath;

    addCheck(pageFailures, /^<!doctype html>/i.test(html.trimStart()), `${page.file} must start with <!doctype html>.`);
    addCheck(pageFailures, /<html\s+lang="en">/i.test(html), `${page.file} must use <html lang="en">.`);
    addCheck(pageFailures, countMatches(html, /<h1\b/gi) === 1, `${page.file} must contain exactly one h1.`);
    addCheck(pageFailures, /href="#main-content"/i.test(html), `${page.file} must include a skip link.`);
    addCheck(pageFailures, /<header\b/i.test(html), `${page.file} must include a header landmark.`);
    addCheck(pageFailures, /<nav\b/i.test(html), `${page.file} must include a navigation landmark.`);
    addCheck(pageFailures, /<main\b[^>]*id="main-content"/i.test(html), `${page.file} must include main#main-content.`);
    addCheck(pageFailures, /<footer\b/i.test(html), `${page.file} must include a footer landmark.`);
    addCheck(pageFailures, /<title>[^<]+<\/title>/i.test(html), `${page.file} must include a page title.`);
    addCheck(
      pageFailures,
      /<meta\s+name="description"\s+content="[^"]+"/i.test(html),
      `${page.file} must include a meta description.`,
    );
    addCheck(
      pageFailures,
      new RegExp(`<link\\s+rel="canonical"\\s+href="${canonicalUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "i").test(html),
      `${page.file} must include canonical URL ${canonicalUrl}.`,
    );
    addCheck(pageFailures, hasHref(html, routes.home.url), `${page.file} must include the Home link.`);
    addCheck(pageFailures, hasHref(html, routes.work.url), `${page.file} must include the Work link.`);
    addCheck(pageFailures, hasHref(html, routes.about.url), `${page.file} must include the About link.`);
    addCheck(pageFailures, hasHref(html, routes.contact.url), `${page.file} must include the Contact link.`);
    addCheck(pageFailures, hasHref(html, cv.url), `${page.file} must include the CV link.`);
    addCheck(pageFailures, hasHref(html, contacts.linkedin.url), `${page.file} must include the LinkedIn link.`);

    for (const pattern of phoneAndMessagingPatterns) {
      addCheck(
        pageFailures,
        !pattern.test(decoded),
        `${page.file} must not contain phone, tel, WhatsApp, or wa.me contact details.`,
      );
    }

    for (const pattern of statusTerminologyPatterns) {
      addCheck(
        pageFailures,
        !pattern.test(decoded),
        `${page.file} must not contain evidence, verification, approval, readiness, or draft-status terminology.`,
      );
    }

    page.extraChecks(html, decoded, pageFailures);

    if (pageFailures.length > 0) {
      failures.push(...pageFailures);
    } else {
      checked.push(page.file);
    }
  }

  if (failures.length > 0) {
    console.error("Shared shell validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Shared shell validation passed.");
  console.log(`Pages checked: ${checked.length}`);
  for (const file of checked) {
    console.log(`- ${file}`);
  }
  console.log("Semantic shell, shared links, contact exclusions and public-content terminology checks passed.");
}

main().catch((error) => {
  console.error("Unexpected validation error:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
