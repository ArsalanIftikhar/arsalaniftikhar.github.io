import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outputRoot = path.join(root, "_site");
const pages = ["index.html", "projects.html", "about.html", "contact.html"];
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

function getCssBlock(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, "i"))?.[1] || "";
}

function getHexToken(css, tokenName) {
  return css.match(new RegExp(`${tokenName}\\s*:\\s*(#[0-9a-f]{6})`, "i"))?.[1] || "";
}

function isNearWhite(hex) {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) {
    return false;
  }

  const red = Number.parseInt(hex.slice(1, 3), 16);
  const green = Number.parseInt(hex.slice(3, 5), 16);
  const blue = Number.parseInt(hex.slice(5, 7), 16);
  return red >= 242 && green >= 242 && blue >= 242;
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
  addCheck(failures, /aria-label="Switch to (?:dark|light) theme"/i.test(themeButton), `${page} theme toggle must retain an accessible action label.`);
  addCheck(failures, !/data-theme-toggle-text/i.test(html) && !/>\s*(?:Light|Dark)\s*</i.test(html), `${page} theme toggle must not visibly show Light or Dark.`);
  if (page === "index.html") {
    addCheck(failures, /class="profile-image"[^>]*src="\/assets\/profile\.jpeg"/i.test(html), "Homepage must include the restored profile image.");
    addCheck(failures, !/data-hero-visual/i.test(html), "Homepage must not include the removed animated hero visual.");
    addCheck(failures, /class="impact-item__number"/i.test(html), "Homepage metric numerals must use the compact impact strip number element.");
  }
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
  const lightCanvas = getHexToken(css, "--color-canvas");
  const panelBlock = getCssBlock(css, ".panel");
  const desktopHeaderBlock = css.match(/@media\s*\(min-width:\s*769px\)[\s\S]*?\.site-header__inner\s*\{[^}]*grid-template-columns:\s*auto\s+minmax\(0,\s*1fr\)\s+auto/i);
  const themeToggleBlock = getCssBlock(css, ".theme-toggle");
  const impactNumberBlock = getCssBlock(css, ".impact-item__number");
  const impactItemBlock = getCssBlock(css, ".impact-item");

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
  addCheck(failures, lightCanvas.length > 0 && !isNearWhite(lightCanvas), "Light canvas must be visibly tinted, not near-white.");
  addCheck(failures, /var\(--gradient-surface\)\s+padding-box/i.test(panelBlock) && /var\(--gradient-border\)\s+border-box/i.test(panelBlock), "Cards must use tinted surfaces with gradient borders instead of plain white cards.");
  addCheck(failures, Boolean(desktopHeaderBlock) && /\.site-nav\s*\{[^}]*grid-column:\s*2/i.test(css) && /\.site-header__actions\s*\{[^}]*grid-column:\s*3/i.test(css), "Desktop header must align brand, navigation and controls in one row.");
  addCheck(failures, /inline-size:\s*44px/i.test(themeToggleBlock) && /block-size:\s*44px/i.test(themeToggleBlock) && /padding:\s*0/i.test(themeToggleBlock), "Theme toggle must be compact while retaining a 44px touch target.");
  addCheck(failures, /\.profile-image\b/.test(css) && /\.profile-figure\b/.test(css), "CSS must style the restored hero image and figure.");
  addCheck(failures, !/data-hero|hero-line|hero-bar|hero-flow|heroPulse|heroLineDraw/i.test(css), "CSS must not retain removed animated hero visual selectors.");
  addCheck(failures, /var\(--gradient-accent\)/i.test(impactNumberBlock) && /background-clip:\s*text/i.test(impactNumberBlock), "Impact numerals must use gradient or comparable accent treatment.");
  addCheck(failures, /\.impact-list\s*\{[^}]*grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\)/i.test(css), "Impact strip must use a five-column desktop layout.");
  addCheck(failures, !/box-shadow/i.test(impactItemBlock) && !/border-radius/i.test(impactItemBlock), "Impact strip items must not be styled as cards.");
  addCheck(failures, /\.capability-card__header\s+h3/i.test(css) && /\.work-card__header\s+h3/i.test(css), "Capability and project cards must use inline icon-title header rows.");
  addCheck(failures, !/note-card|note-grid|theme-toggle__text|impact-card|impact-card__/i.test(css), "CSS must not retain removed note-card, visible theme text, or old impact-card selectors.");
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
