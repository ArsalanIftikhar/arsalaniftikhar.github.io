import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outputRoot = path.join(root, "_site");

const prohibitedPhrases = [
  "Focused Technical Breadth",
  "core capability story",
  "without competing",
  "Use the Right Route",
  "Career route",
  "Consulting route",
  "Qualified public metrics",
  "evidence layer",
  "primary evidence",
  "secondary evidence",
  "content hierarchy",
  "portfolio strategy",
  "visitor route",
];

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

function hasCanonical(html, canonicalUrl) {
  return new RegExp(`<link\\s+rel="canonical"\\s+href="${escapeRegExp(canonicalUrl)}"`, "i").test(html);
}

function hasHref(html, href) {
  return new RegExp(`<a\\b[^>]*href="${escapeRegExp(href)}"`, "i").test(html);
}

function hasAll(decoded, values) {
  return values.every((value) => decoded.includes(value));
}

function outputPathForUrl(url) {
  const cleanUrl = url.split("#")[0].split("?")[0];

  if (cleanUrl === "/") {
    return path.join(outputRoot, "index.html");
  }

  if (cleanUrl.endsWith("/")) {
    return path.join(outputRoot, cleanUrl.slice(1), "index.html");
  }

  return path.join(outputRoot, cleanUrl.replace(/^\//, ""));
}

function sectionHtml(html, className) {
  return html.match(new RegExp(`<section\\b[^>]*class="${className}[^"]*"[^>]*>[\\s\\S]*?<\\/section>`, "i"))?.[0] || "";
}

function validateBlockedContact(decoded, page, failures) {
  const blockedContactPatterns = [
    /\+44\s*7594\s*967785/i,
    /\+447594967785/i,
    /07594967785/i,
    /447594967785/i,
    /7594967785/i,
    /tel:/i,
    /wa\.me/i,
    /whatsapp/i,
  ];

  for (const pattern of blockedContactPatterns) {
    addCheck(failures, !pattern.test(decoded), `${page} must not contain phone, tel, WhatsApp, or wa.me details.`);
  }
}

function validateProhibitedPhrases(decoded, page, failures) {
  for (const phrase of prohibitedPhrases) {
    addCheck(failures, !decoded.includes(phrase), `${page} must not contain planning-language phrase: ${phrase}.`);
  }
}

async function main() {
  if (!existsSync(outputRoot)) {
    throw new Error("_site does not exist. Run `npm run build` before `npm run check:home-work`.");
  }

  const [homeHtml, workHtml, aboutHtml, contactHtml, workData] = await Promise.all([
    readFile(path.join(outputRoot, "index.html"), "utf8"),
    readFile(path.join(outputRoot, "projects.html"), "utf8"),
    readFile(path.join(outputRoot, "about.html"), "utf8"),
    readFile(path.join(outputRoot, "contact.html"), "utf8"),
    readFile(path.join(root, "src/_data/work.json"), "utf8").then(JSON.parse),
  ]);

  const homeDecoded = decodeHtml(homeHtml);
  const workDecoded = decodeHtml(workHtml);
  const aboutDecoded = decodeHtml(aboutHtml);
  const contactDecoded = decodeHtml(contactHtml);
  const homeHero = decodeHtml(sectionHtml(homeHtml, "home-hero"));
  const failures = [];

  const homeFeatured = workData.selectedWork.filter((item) => item.includeOnHome);
  const expectedMetrics = ["£200M", "4 years", "4–8 hrs/day", "200/day", "£500k"];
  const expectedSupporting = [
    "Warehouse Assignment Similarity Analysis",
    "House-Price Prediction and Machine-Learning Comparison",
    "Sales Analytics Dashboard",
  ];
  const removedProjects = [
    /Football Python Analysis/i,
    /football_analysis_case_study/i,
    /n8n Email-Routing Automation/i,
    /n8n_email_routing_case_study/i,
    /Smart[-\s]?Device Usage Analysis/i,
    /smart_device_analysis_case_study/i,
  ];

  addCheck(failures, hasCanonical(homeHtml, "https://arsalaniftikhar.github.io/"), "Homepage canonical URL must be exact.");
  addCheck(
    failures,
    getTitle(homeHtml) === "Arsalan Iftikhar | Senior BI & Data Analyst",
    "Homepage title must be Arsalan Iftikhar | Senior BI & Data Analyst.",
  );
  addCheck(failures, countMatches(homeHtml, /<h1\b/gi) === 1, "Homepage must contain exactly one h1.");
  addCheck(
    failures,
    /<h1[^>]*>\s*Senior BI &amp; Data Analyst\s*<\/h1>/i.test(homeHtml),
    "Homepage h1 must prioritise the professional role.",
  );
  addCheck(failures, homeDecoded.includes("Arsalan Iftikhar"), "Homepage must include the name as an identity label.");
  addCheck(
    failures,
    hasAll(homeDecoded, [
      "Senior BI Analyst at GXO Logistics",
      "Data & AI Lead at NexAura",
      "I build trusted reporting, data pipelines and automation that turn complex operational data into practical decisions.",
    ]),
    "Homepage hero must include the final role-focused introductory copy.",
  );
  addCheck(failures, !/West Yorkshire|Open to relocation/i.test(homeHero), "Homepage hero must not include location or relocation wording.");
  addCheck(failures, homeDecoded.includes("West Yorkshire") && homeDecoded.includes("open to relocation"), "Homepage contact preview must include location and relocation wording.");
  addCheck(failures, homeDecoded.includes("View Work") && hasHref(homeHtml, "/projects.html"), "Homepage must include a View Work link.");
  addCheck(failures, hasHref(homeHtml, "/assets/cv/Arsalan-Iftikhar-CV.pdf"), "Homepage must include the CV link.");
  addCheck(
    failures,
    /<img\b(?=[^>]*class="profile-image")(?=[^>]*src="\/assets\/profile\.jpeg")(?=[^>]*width="1536")(?=[^>]*height="1024")(?=[^>]*alt="Illustration of a data analyst working with dashboards and charts")/i.test(homeHtml),
    "Homepage must restore the profile image with meaningful alt text and dimensions.",
  );
  addCheck(failures, !/data-hero-visual/i.test(homeHtml), "Homepage must not include the animated SVG hero visual.");
  addCheck(failures, countMatches(homeHtml, /class="impact-item\b/gi) === 5, "Homepage must render five compact impact strip items.");
  addCheck(failures, hasAll(homeDecoded, expectedMetrics), "Homepage must include all five approved impact values.");
  addCheck(
    failures,
    hasAll(homeDecoded, [
      "Logistics contract",
      "BI & data experience",
      "Process time saved",
      "Self-service report views",
      "Annual savings supported",
    ]),
    "Homepage must include all five compact impact labels.",
  );
  addCheck(failures, !/Impact at a glance|Selected measures from operational reporting|10\+ recurring processes automated/i.test(homeDecoded), "Homepage must not include the removed impact heading, intro, or 10+ metric.");
  addCheck(
    failures,
    hasAll(homeDecoded, homeFeatured.map((item) => item.title)) && countMatches(homeHtml, /work-card--selected/gi) === 4,
    "Homepage must include exactly the four approved homepage Selected Work items.",
  );
  addCheck(failures, !homeDecoded.includes("NexAura Healthcare Management System"), "Homepage must not feature HMS.");
  addCheck(failures, !homeDecoded.includes("Multilingual Quality-Assurance Product"), "Homepage must not feature multilingual QA.");
  addCheck(failures, countMatches(homeHtml, /class="capability-card\b/gi) === 3, "Homepage must render three capability groups.");
  addCheck(
    failures,
    hasAll(homeDecoded, [
      "Business Intelligence & Analytics",
      "Data Engineering & Automation",
      "Applied AI & Technical Delivery",
    ]),
    "Homepage must include the three capability groups.",
  );
  addCheck(failures, hasHref(homeHtml, "/about.html"), "Homepage must include the About link.");
  addCheck(failures, hasHref(homeHtml, "/contact.html#career") && hasHref(homeHtml, "/contact.html#consulting"), "Homepage must include Career and Consulting enquiry links.");
  addCheck(failures, !/Technical Notes|View all Technical Notes|\/insights\//i.test(homeDecoded), "Homepage must not surface Technical Notes.");
  for (const pattern of removedProjects) {
    addCheck(failures, !pattern.test(homeDecoded), "Homepage must not surface removed supporting projects.");
  }
  addCheck(
    failures,
    !/<h[1-3][^>]*>[^<]*Experience/i.test(homeHtml) && !/\btimeline\b/i.test(homeDecoded),
    "Homepage must not include an Experience section or timeline.",
  );
  addCheck(failures, !/AI Teaching Assistant/i.test(homeDecoded), "Homepage must not include AI Teaching Assistant.");
  validateProhibitedPhrases(homeDecoded, "Homepage", failures);
  validateBlockedContact(homeDecoded, "Homepage", failures);

  addCheck(failures, hasCanonical(workHtml, "https://arsalaniftikhar.github.io/projects.html"), "Work canonical URL must be exact.");
  addCheck(failures, getTitle(workHtml) === "Work | Arsalan Iftikhar", "Work title must be Work | Arsalan Iftikhar.");
  addCheck(failures, countMatches(workHtml, /<h1\b/gi) === 1, "Work page must contain exactly one h1.");
  addCheck(failures, workDecoded.includes("Professional case studies and technical projects across business intelligence, data engineering, automation and applied AI."), "Work page must include the final introduction.");
  addCheck(failures, countMatches(workHtml, /work-card--selected/gi) === 6, "Work page must render six Selected Work cards.");
  addCheck(failures, countMatches(workHtml, /work-card--supporting/gi) === 3, "Work page must render exactly three Additional Project cards.");
  addCheck(failures, hasAll(workDecoded, workData.selectedWork.map((item) => item.title)), "Work page must include all six Selected Work items.");
  addCheck(failures, hasAll(workDecoded, expectedSupporting), "Work page must include the three retained Additional Projects.");
  addCheck(failures, !/Technical Notes|View all Technical Notes|\/insights\/|note-card/i.test(workDecoded), "Work page must not surface Technical Notes or the insights hub.");
  for (const pattern of removedProjects) {
    addCheck(failures, !pattern.test(workDecoded), "Work page must not surface removed supporting projects.");
  }
  addCheck(failures, !/AI Teaching Assistant/i.test(workDecoded), "Work page must not include AI Teaching Assistant.");
  addCheck(
    failures,
    !/(<input\b[^>]*type="search"|<button\b[^>]*(filter|sort|facet|search)|<select\b[^>]*(filter|sort|facet|search))/i.test(workHtml),
    "Work page must not include unsupported search, sort, faceted, or filter controls.",
  );
  addCheck(
    failures,
    !/\b(evidence|verification|approval)\b/i.test(workDecoded),
    "Work page must not include evidence, verification, or approval terminology.",
  );
  validateProhibitedPhrases(workDecoded, "Work page", failures);
  validateBlockedContact(workDecoded, "Work page", failures);

  addCheck(failures, getTitle(aboutHtml) === "About | Arsalan Iftikhar", "About page title must be About | Arsalan Iftikhar.");
  addCheck(failures, countMatches(aboutHtml, /<h1\b/gi) === 1 && /<h1[^>]*>\s*About\s*<\/h1>/i.test(aboutHtml), "About page must have one h1: About.");
  addCheck(
    failures,
    hasAll(aboutDecoded, [
      "I’m a Senior BI & Data Analyst with four years of experience building reporting, automation and data products across logistics operations and consultancy work.",
      "My work sits between analysis and engineering.",
      "I work primarily with Power BI, SQL, Microsoft Fabric, Python, PySpark and Power Platform.",
      "The common thread is turning ambiguous operational problems into maintainable systems that support real decisions.",
      "West Yorkshire, UK · Open to relocation",
    ]),
    "About page must include the final visitor-facing wording and location line.",
  );
  addCheck(failures, hasHref(aboutHtml, "/projects.html") && hasHref(aboutHtml, "/contact.html") && hasHref(aboutHtml, "/assets/cv/Arsalan-Iftikhar-CV.pdf"), "About page must keep Work, Contact and CV links.");
  validateProhibitedPhrases(aboutDecoded, "About page", failures);
  validateBlockedContact(aboutDecoded, "About page", failures);

  addCheck(failures, getTitle(contactHtml) === "Contact | Arsalan Iftikhar", "Contact page title must be Contact | Arsalan Iftikhar.");
  addCheck(failures, countMatches(contactHtml, /<h1\b/gi) === 1 && /<h1[^>]*>\s*Contact\s*<\/h1>/i.test(contactHtml), "Contact page must have one h1: Contact.");
  addCheck(
    failures,
    hasAll(contactDecoded, [
      "Based in West Yorkshire, UK, and open to relocation.",
      "Career and professional enquiries",
      "For roles, interviews or professional conversations, email me or connect on LinkedIn.",
      "NexAura consulting enquiries",
      "For business intelligence, automation and data-product consulting, use my NexAura email.",
    ]),
    "Contact page must include the final visitor-facing wording.",
  );
  addCheck(failures, !/\broute\b/i.test(contactDecoded), "Contact page visible copy must not use route language.");
  validateProhibitedPhrases(contactDecoded, "Contact page", failures);
  validateBlockedContact(contactDecoded, "Contact page", failures);

  const linkedItems = [...workData.selectedWork, ...workData.supportingProjects];

  for (const item of linkedItems) {
    addCheck(failures, item.url.startsWith("/"), `${item.id} must use a root-relative public URL.`);

    if (item.id === "nexaura-healthcare-management-system") {
      addCheck(failures, item.url === "/contact.html", "HMS must link to /contact.html instead of a fake case-study URL.");
    }

    const outputPath = outputPathForUrl(item.url);
    addCheck(failures, existsSync(outputPath), `${item.id} link target is missing from generated output: ${item.url}`);
  }

  if (failures.length > 0) {
    console.error("Home/Work validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Home, Work, About and Contact validation passed.");
  console.log(`Impact strip metrics checked: ${expectedMetrics.length}`);
  console.log(`Homepage Selected Work checked: ${homeFeatured.length}`);
  console.log(`Work Selected Work checked: ${workData.selectedWork.length}`);
  console.log(`Additional Projects checked: ${workData.supportingProjects.length}`);
  console.log(`work.json public links checked: ${linkedItems.length}`);
}

main().catch((error) => {
  console.error("Unexpected validation error:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
