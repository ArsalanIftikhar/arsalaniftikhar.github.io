import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outputRoot = path.join(root, "_site");
const route = "projects/fabric-modernisation-case-study.html";
const routePath = path.join(outputRoot, route);
const canonicalUrl = "https://arsalaniftikhar.github.io/projects/fabric-modernisation-case-study.html";
const expectedTitle = "Operational BI and Performance Reporting | Arsalan Iftikhar";
const expectedSummary =
  "Operational reporting and performance analysis combining Power BI, SQL, semantic modelling and automation to create trusted recurring outputs for senior and operational stakeholders.";
const expectedRole =
  "I owned recurring operational and performance reporting, developed the underlying models and logic, automated manual processes, and worked with stakeholders to turn results into management action.";

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

function hasAll(decoded, values) {
  return values.every((value) => decoded.includes(value));
}

async function main() {
  if (!existsSync(outputRoot)) {
    throw new Error("_site does not exist. Run `npm run build` before `npm run check:operational-bi-case-study`.");
  }

  const failures = [];
  addCheck(failures, existsSync(routePath), `Missing generated Operational BI case-study route: ${route}`);

  if (!existsSync(routePath)) {
    console.error("Operational BI case-study validation failed:");
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
  addCheck(failures, decoded.includes("Operational BI and Performance Reporting"), "Public title is missing.");
  addCheck(failures, decoded.includes(expectedSummary), "Summary is missing or changed.");
  addCheck(failures, decoded.includes(expectedRole), "Personal-role statement is missing or changed.");
  addCheck(
    failures,
    hasAll(decoded, ["Power BI", "SQL", "Power Query", "DAX", "Semantic modelling"]),
    "Required BI and semantic-model technologies are missing.",
  );
  addCheck(failures, /KPI|metric-definition|metric definition|metric logic/i.test(decoded), "KPI or metric-definition content is missing.");
  addCheck(failures, /stakeholder/i.test(decoded), "Stakeholder content is missing.");
  addCheck(failures, /reconcil/i.test(decoded) && /validat/i.test(decoded), "Reconciliation and validation content is missing.");
  addCheck(failures, /automat/i.test(decoded), "Automation content is missing.");
  addCheck(
    failures,
    decoded.includes("10+") && /Recurring processes automated/i.test(decoded),
    "Automation metric is missing.",
  );
  addCheck(failures, decoded.includes("£500,000"), "£500,000 outcome metric is missing.");
  addCheck(
    failures,
    /supporting[\s\S]{0,120}£500,000|£500,000[\s\S]{0,120}supporting/i.test(decoded),
    "`supporting` must appear near the £500,000 outcome statement.",
  );
  addCheck(
    failures,
    /Fabric modernisation|Microsoft Fabric|migration planning|platform transition/i.test(decoded),
    "Fabric modernisation context is missing.",
  );
  addCheck(failures, hasHref(html, "/projects.html"), "Back-to-Work link is missing.");
  addCheck(failures, hasHref(html, "/contact.html"), "Contact link is missing.");
  addCheck(failures, hasHref(html, "/assets/cv/Arsalan-Iftikhar-CV.pdf"), "CV link is missing.");

  const blockedPatterns = [
    /Professional Journey/i,
    /\btimeline\b/i,
    /\+44\s*7594\s*967785/i,
    /\+447594967785/i,
    /07594967785/i,
    /447594967785/i,
    /7594967785/i,
    /tel:/i,
    /wa\.me/i,
    /whatsapp/i,
    /Technical Notes|\/insights\//i,
    /\b(evidence|verification|approval)\b/i,
    /(placeholder|TODO|TBC|owner question|unresolved|lorem|draft claim|to be confirmed)/i,
    /fake dashboard|dashboard screenshot|src="[^"]*(?:placeholder|fake|dashboard)[^"]*"/i,
    /GXO Fabric Modernisation|Flagship Case Study/i,
  ];

  for (const pattern of blockedPatterns) {
    addCheck(failures, !pattern.test(decoded), `Blocked wording or reference found: ${pattern}.`);
  }

  addCheck(failures, !/<img\b/i.test(html), "Case study must not include image references for this text/process-led migration.");
  addCheck(
    failures,
    !/(sk-[A-Za-z0-9_-]{12,}|Bearer\s+[A-Za-z0-9._-]+|client_secret|tenant_id|AccountKey=|DefaultEndpointsProtocol=|SharedAccessSignature|postgres:\/\/|mongodb:\/\/|jdbc:)/i.test(decoded),
    "Case study must not include secret-like token or connection-string patterns.",
  );

  if (failures.length > 0) {
    console.error("Operational BI case-study validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Operational BI case-study validation passed.");
  console.log(`Route checked: /${route}`);
  console.log("SEO, shell, contribution, KPI, controls, automation, metrics, Fabric context, links and sensitive-content checks passed.");
}

main().catch((error) => {
  console.error("Unexpected validation error:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
