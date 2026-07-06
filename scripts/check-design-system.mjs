import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outputRoot = path.join(root, "_site");
const pages = ["about.html", "contact.html"];
const cssPath = path.join(outputRoot, "assets/css/portfolio.css");
const themeScriptPath = path.join(outputRoot, "assets/js/theme.js");
const navigationScriptPath = path.join(outputRoot, "assets/js/navigation.js");

function addCheck(failures, condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function countMatches(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

function getSingleButton(html, attribute, page, failures) {
  const pattern = new RegExp(`<button\\b(?=[^>]*${attribute})[^>]*>`, "gi");
  const buttons = html.match(pattern) || [];
  addCheck(failures, buttons.length === 1, `${page} must contain exactly one ${attribute} button.`);
  return buttons[0] || "";
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function getAttribute(tag, attribute) {
  const match = tag.match(new RegExp(`${attribute}="([^"]+)"`, "i"));
  return match ? match[1] : "";
}

function validateHtml(page, html, failures) {
  const decoded = decodeHtml(html);
  const themeButton = getSingleButton(html, "data-theme-toggle", page, failures);
  const navButton = getSingleButton(html, "data-nav-toggle", page, failures);
  const navControls = getAttribute(navButton, "aria-controls");
  const hasAriaPressed = /\saria-pressed=/.test(themeButton);
  const usesSwitch = /\srole="switch"/i.test(themeButton);
  const hasAriaChecked = /\saria-checked=/.test(themeButton);

  addCheck(failures, /href="\/assets\/css\/portfolio\.css"/i.test(html), `${page} must link /assets/css/portfolio.css.`);
  addCheck(failures, /src="\/assets\/js\/theme\.js"\s+defer/i.test(html), `${page} must load /assets/js/theme.js with defer.`);
  addCheck(failures, /src="\/assets\/js\/navigation\.js"\s+defer/i.test(html), `${page} must load /assets/js/navigation.js with defer.`);
  addCheck(failures, /\saria-expanded="(?:true|false)"/i.test(navButton), `${page} navigation toggle must have aria-expanded.`);
  addCheck(failures, navControls.length > 0, `${page} navigation toggle must have aria-controls.`);
  addCheck(
    failures,
    navControls.length > 0 && new RegExp(`<nav\\b[^>]*id="${navControls}"`, "i").test(html),
    `${page} must contain the navigation element referenced by aria-controls.`,
  );
  addCheck(
    failures,
    (hasAriaPressed && !usesSwitch && !hasAriaChecked) || (!hasAriaPressed && usesSwitch && hasAriaChecked),
    `${page} theme toggle must use exactly one accessible state pattern.`,
  );
  addCheck(failures, /href="#main-content"/i.test(html), `${page} must include a skip link.`);
  addCheck(failures, /<main\b[^>]*id="main-content"/i.test(html), `${page} must include main#main-content.`);
  addCheck(failures, countMatches(html, /<h1\b/gi) === 1, `${page} must contain exactly one h1.`);

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

  addCheck(
    failures,
    !/(fonts\.googleapis|fonts\.gstatic|fontawesome|font-awesome|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com|bootstrapcdn)/i.test(html),
    `${page} must not reference external fonts or icon libraries.`,
  );
  addCheck(failures, !/<[a-z][^>]*\son[a-z]+\s*=/i.test(html), `${page} must not contain inline event handlers.`);
}

function validateCss(css, failures) {
  const purePageBackground = /(?:body|html|:root|\[data-theme="light"\])[^{}]*\{[^}]*background(?:-color)?\s*:\s*(?:#fff\b|#ffffff\b|white\b|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\))/i;
  const pureCanvasToken = /--color-canvas\s*:\s*(?:#fff\b|#ffffff\b|white\b|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\))/i;

  addCheck(failures, /--color-canvas\s*:/.test(css), "CSS must define --color-canvas.");
  addCheck(failures, /--color-surface\s*:/.test(css), "CSS must define --color-surface.");
  addCheck(failures, /--color-text\s*:/.test(css), "CSS must define --color-text.");
  addCheck(failures, /\[data-theme="light"\]/.test(css), "CSS must include light-theme tokens.");
  addCheck(failures, /\[data-theme="dark"\]/.test(css), "CSS must include dark-theme overrides.");
  addCheck(
    failures,
    /@media\s*\(prefers-color-scheme:\s*dark\)/i.test(css) && /:root:not\(\[data-theme\]\)/.test(css),
    "CSS must include an OS-preference fallback.",
  );
  addCheck(failures, /@media\s*\(prefers-reduced-motion:\s*reduce\)/i.test(css), "CSS must include reduced-motion rules.");
  addCheck(failures, /:focus-visible/.test(css), "CSS must include :focus-visible styling.");
  addCheck(
    failures,
    /@media\s*\(max-width:\s*768px\)/i.test(css) && /\.site-nav/.test(css) && /\.nav-toggle/.test(css),
    "CSS must include responsive navigation rules.",
  );
  addCheck(failures, !/@import/i.test(css), "CSS must not contain @import.");
  addCheck(
    failures,
    !purePageBackground.test(css) && !pureCanvasToken.test(css),
    "CSS must not assign a pure page background to the primary canvas.",
  );
  addCheck(
    failures,
    !/(--[a-z-]*(status|evidence|approval|confidentiality|readiness)|evidence[-\s]?status|approval[-\s]?status|confidentiality[-\s]?status|readiness[-\s]?system)/i.test(css),
    "CSS must not include status, evidence, approval, confidentiality, or readiness token systems.",
  );
}

function validateJavaScript(themeScript, navigationScript, failures) {
  const networkPattern = /https?:\/\/|fetch\s*\(|XMLHttpRequest|sendBeacon|navigator\.sendBeacon|new\s+WebSocket/i;

  addCheck(failures, themeScript.includes("portfolio-theme"), "Theme script must use the portfolio-theme storage key.");
  addCheck(
    failures,
    /try\s*\{[\s\S]*localStorage[\s\S]*\}\s*catch/.test(themeScript),
    "Theme script must wrap storage access defensively.",
  );
  addCheck(failures, navigationScript.includes("aria-expanded"), "Navigation script must update aria-expanded.");
  addCheck(failures, navigationScript.includes('"Escape"') || navigationScript.includes("'Escape'"), "Navigation script must handle Escape.");
  addCheck(failures, !networkPattern.test(themeScript), "Theme script must not contain an external URL or network call.");
  addCheck(failures, !networkPattern.test(navigationScript), "Navigation script must not contain an external URL or network call.");
}

async function main() {
  if (!existsSync(outputRoot)) {
    throw new Error("_site does not exist. Run `npm run build` before `npm run check:design`.");
  }

  const failures = [];

  for (const filePath of [cssPath, themeScriptPath, navigationScriptPath]) {
    addCheck(failures, existsSync(filePath), `Missing generated asset: ${path.relative(outputRoot, filePath).split(path.sep).join("/")}.`);
  }

  for (const page of pages) {
    const htmlPath = path.join(outputRoot, page);
    addCheck(failures, existsSync(htmlPath), `Missing generated page: ${page}.`);
    if (existsSync(htmlPath)) {
      validateHtml(page, await readFile(htmlPath, "utf8"), failures);
    }
  }

  if (existsSync(cssPath)) {
    validateCss(await readFile(cssPath, "utf8"), failures);
  }

  if (existsSync(themeScriptPath) && existsSync(navigationScriptPath)) {
    validateJavaScript(
      await readFile(themeScriptPath, "utf8"),
      await readFile(navigationScriptPath, "utf8"),
      failures,
    );
  }

  if (failures.length > 0) {
    console.error("Design-system validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Design-system validation passed.");
  console.log(`Generated pages checked: ${pages.length}`);
  console.log("Generated assets checked: assets/css/portfolio.css, assets/js/theme.js, assets/js/navigation.js");
  console.log("Theme, navigation, focus, reduced-motion, contact exclusions and dependency-free checks passed.");
}

main().catch((error) => {
  console.error("Unexpected validation error:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
