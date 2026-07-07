import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outputRoot = path.join(root, "_site");
const route = "projects/fabric-timecard-pipeline-case-study.html";
const routePath = path.join(outputRoot, route);
const canonicalUrl = "https://arsalaniftikhar.github.io/projects/fabric-timecard-pipeline-case-study.html";
const expectedTitle = "Microsoft Fabric Workforce-Data Pipeline | Arsalan Iftikhar";

function addCheck(failures, condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countMatches(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

function getTitle(html) {
  return decodeHtml(html.match(/<title>([^<]+)<\/title>/i)?.[1] || "");
}

function hasCanonical(html) {
  return new RegExp(`<link\\s+rel="canonical"\\s+href="${escapeRegExp(canonicalUrl)}"`, "i").test(html);
}

function hasHref(html, href) {
  return new RegExp(`<a\\b[^>]*href="${escapeRegExp(href)}"`, "i").test(html);
}

function hasImageWithAlt(html, src) {
  const tag = html.match(new RegExp(`<img\\b(?=[^>]*src="${escapeRegExp(src)}")[^>]*>`, "i"))?.[0] || "";
  const alt = decodeHtml(tag.match(/\salt="([^"]+)"/i)?.[1] || "").trim();
  return alt.length >= 24 && !/^(screenshot|image|fabric pipeline|pyspark)$/i.test(alt);
}

function hasAll(decoded, values) {
  return values.every((value) => decoded.includes(value));
}

async function main() {
  if (!existsSync(outputRoot)) {
    throw new Error("_site does not exist. Run `npm run build` before `npm run check:fabric-case-study`.");
  }

  const failures = [];
  addCheck(failures, existsSync(routePath), `Missing generated Fabric case-study route: ${route}`);

  if (!existsSync(routePath)) {
    console.error("Fabric case-study validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  const html = await readFile(routePath, "utf8");
  const decoded = decodeHtml(html);

  addCheck(failures, getTitle(html) === expectedTitle, `Title must be exactly: ${expectedTitle}`);
  addCheck(failures, hasCanonical(html), `Canonical URL must be exactly: ${canonicalUrl}`);
  addCheck(failures, countMatches(html, /<h1\b/gi) === 1, "Case study must contain exactly one h1.");
  addCheck(failures, /<header\b[^>]*class="site-header"/i.test(html), "Case study must use the shared header.");
  addCheck(failures, /<nav\b[^>]*id="primary-navigation"/i.test(html), "Case study must use the shared primary navigation.");
  addCheck(failures, /<main\b[^>]*id="main-content"/i.test(html), "Case study must include main#main-content.");
  addCheck(failures, /<footer\b[^>]*class="site-footer"/i.test(html), "Case study must use the shared footer.");
  addCheck(failures, decoded.includes("Microsoft Fabric Workforce-Data Pipeline"), "Public title is missing.");
  addCheck(
    failures,
    decoded.includes("A Microsoft Fabric pipeline that ingests workforce data through authenticated APIs, reconstructs shifts and breaks, and produces controlled incremental outputs for operational reporting."),
    "Summary is missing or changed.",
  );
  addCheck(
    failures,
    decoded.includes("I designed and developed the Python/PySpark pipeline, covering incremental loading, Delta MERGE logic, run logging and legacy-reporting reconciliation."),
    "Personal-role statement is missing or changed.",
  );
  addCheck(
    failures,
    hasAll(decoded, ["Microsoft Fabric", "Python", "PySpark", "REST APIs"]) &&
      (/Delta MERGE/i.test(decoded) || /Delta tables/i.test(decoded)),
    "Required technologies are missing.",
  );
  addCheck(failures, /OAuth-authenticated Kronos REST APIs/i.test(decoded), "OAuth/API extraction content is missing.");
  addCheck(failures, /shift and break records/i.test(decoded) && /reconstruct/i.test(decoded), "Shift reconstruction content is missing.");
  addCheck(failures, /historical and incremental loads/i.test(decoded) || /incremental loading/i.test(decoded), "Incremental-loading content is missing.");
  addCheck(failures, /run logging/i.test(decoded), "Run-logging content is missing.");
  addCheck(failures, /reconciliation against legacy reporting/i.test(decoded) || /legacy reporting/i.test(decoded), "Validation and reconciliation content is missing.");
  addCheck(failures, html.includes('src="/assets/Fabric Pipeline.PNG"'), "Fabric pipeline image is missing.");
  addCheck(failures, html.includes('src="/assets/PySpark.PNG"'), "PySpark image is missing.");
  addCheck(failures, hasImageWithAlt(html, "/assets/Fabric Pipeline.PNG"), "Fabric pipeline image needs meaningful alt text.");
  addCheck(failures, hasImageWithAlt(html, "/assets/PySpark.PNG"), "PySpark image needs meaningful alt text.");
  addCheck(failures, hasHref(html, "/projects.html"), "Back-to-Work link is missing.");
  addCheck(failures, hasHref(html, "/contact.html"), "Contact link is missing.");
  addCheck(failures, hasHref(html, "/assets/cv/Arsalan-Iftikhar-CV.pdf"), "CV link is missing.");

  const blockedPatterns = [
    /\+44\s*7594\s*967785/i,
    /\+447594967785/i,
    /07594967785/i,
    /447594967785/i,
    /7594967785/i,
    /tel:/i,
    /wa\.me/i,
    /whatsapp/i,
  ];

  for (const pattern of blockedPatterns) {
    addCheck(failures, !pattern.test(decoded), "Case study must not contain phone, tel, WhatsApp, or wa.me details.");
  }

  addCheck(failures, !/Technical Notes|\/insights\//i.test(decoded), "Case study must not link Technical Notes.");
  addCheck(
    failures,
    !/\b(evidence|verification|approval)\b/i.test(decoded),
    "Case study must not include evidence, verification, or approval terminology.",
  );
  addCheck(
    failures,
    !/(placeholder|TODO|TBC|owner question|unresolved|lorem|draft claim|to be confirmed)/i.test(decoded),
    "Case study must not include placeholder or unresolved wording.",
  );
  addCheck(
    failures,
    !/(sk-[A-Za-z0-9_-]{12,}|Bearer\s+[A-Za-z0-9._-]+|client_secret|tenant_id|AccountKey=|DefaultEndpointsProtocol=|SharedAccessSignature|postgres:\/\/|mongodb:\/\/|jdbc:)/i.test(decoded),
    "Case study must not include secret-like token or connection-string patterns.",
  );

  if (failures.length > 0) {
    console.error("Fabric case-study validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Fabric case-study validation passed.");
  console.log(`Route checked: /${route}`);
  console.log("SEO, shell, contribution, workflow, controls, assets, links and sensitive-content checks passed.");
}

main().catch((error) => {
  console.error("Unexpected validation error:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
