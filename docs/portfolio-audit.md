# Portfolio Discovery Audit

## 1. Executive Summary

No redesign or implementation changes were made during this audit. The repository is a static GitHub Pages portfolio with 21 HTML pages, one shared CSS file, many inline style/script blocks, local assets, a sitemap, robots file, and one pull-request link-check workflow.

Most current evidence is strongest around operational BI, Microsoft Fabric, Power Platform digitisation, and supporting technical projects. The site already separates some primary operational projects from supporting technical projects in `projects.html:72-136`, which aligns well with the confirmed future content model.

The largest strategic mismatch is information architecture. The current source still contains a standalone Experience page that explicitly says it is aligned to CV wording (`experience.html:6-10`) and includes a conventional employment timeline (`experience.html:137-184`). The confirmed future strategy excludes a dedicated Experience route.

The largest maintainability issue is duplication. Navigation, footer, CV links, mobile-menu script, theme-relevant colours, and project metadata are repeated across many HTML files. Style is split between a shared stylesheet, page-level inline CSS, and older Tailwind CDN pages.

The most important technical risks before redesign are responsive overflow on some routes, incomplete SEO coverage, accessibility gaps in the mobile menu and heading hierarchy, and large image assets.

## 2. Audit Scope And Limitations

### Verified Scope

- Repository status, branch, remote, and working-tree cleanliness were checked before audit work.
- `$website-revamp` was loaded from `C:\Users\arsal\.agents\skills\website-revamp\SKILL.md`.
- The skill's implementation, design/content, and responsive/accessibility references were read.
- Local repository files, hidden/config directories, HTML routes, CSS, assets, sitemap, robots file, and GitHub Actions workflow were inspected.
- Live current portfolio homepage and projects page returned HTTP 200.
- Live reference portfolio returned HTTP 200 and was inspected for high-level design principles only.
- Rendered checks were run with system Chrome through Playwright without installing dependencies or saving screenshots.

### Limitations

- No external dependency installation was performed.
- No deployment, commit, push, or PR action was performed.
- No full automated accessibility scan such as axe was run.
- Colour contrast was source-reviewed but not fully measured across every state.
- Browser rendering checks covered representative pages and widths, not every route.
- Remote reference-site source was not copied or saved.

## 3. Repository Map

Verified top-level structure:

- `index.html` - homepage.
- `projects.html` - projects index.
- `approach.html` - delivery approach/playbook.
- `experience.html` - standalone experience timeline.
- `404.html` - custom not-found page.
- `robots.txt` - allows all crawlers and points to sitemap.
- `sitemap.xml` - lists a subset of public routes.
- `.github/workflows/pr-site-checks.yml` - PR-only link check.
- `assets/` - shared images, logos, tool icons, CSS, CV files, placeholders.
- `assets/css/site.css` - shared CSS used by several newer pages.
- `assets/cv/` - linked PDF CV plus placeholder text file.
- `insights/` - insights index and four note pages.
- `projects/` - case-study pages and project asset folders.

There is no verified `package.json`, lockfile, framework config, Jekyll `_config.yml`, `CNAME`, `.nojekyll`, or build config in the workspace search.

## 4. Technology-Stack Findings

### Verified Facts

- The project is static HTML/CSS/JavaScript.
- Several pages use page-level inline CSS blocks, for example `index.html:13-102`, `projects.html:13-51`, and `experience.html:13-117`.
- Some newer case-study pages link `../assets/css/site.css`, for example `projects/self-service-kiosk-case-study.html:13`.
- Older/supporting pages load Tailwind CSS from jsDelivr and Font Awesome from cdnjs, for example `projects/football_analysis_case_study.html:7-8`.
- The only JavaScript observed is small inline mobile-menu toggling on many pages, for example `index.html:265-274` and `projects.html:152-161`.
- There is no package-managed build process in the repository.

### Reasonable Inference

The site is genuinely static and likely deployed directly by GitHub Pages from repository files.

## 5. Deployment Findings

### Verified Facts

- Remote origin is `https://github.com/ArsalanIftikhar/arsalaniftikhar.github.io.git`.
- A GitHub Actions workflow runs only on pull requests targeting `main` (`.github/workflows/pr-site-checks.yml:3-5`).
- That workflow uses `lycheeverse/lychee-action@v2.4.0` to check local HTML links (`.github/workflows/pr-site-checks.yml:14-28`).
- No deployment workflow was found.
- No custom domain file was found.

### Recommendation

Keep GitHub Pages deployment simple unless a future static-site generator requires a build step. If templating is introduced, add a Pages-compatible build workflow intentionally rather than assuming GitHub Pages will build it.

## 6. Page And Route Inventory

| Route | Source | Purpose | Current Navigation | Redesign Direction |
| --- | --- | --- | --- | --- |
| `/` and `/index.html` | `index.html` | Homepage, positioning, metrics, featured projects, NexAura summary, contact | Primary nav | Preserve concept; replace IA/copy around confirmed strategy |
| `/projects.html` | `projects.html` | Project index with primary/supporting/current groups | Primary nav | Preserve as future Work route or consolidate into `/work` |
| `/approach.html` | `approach.html` | BI/automation delivery playbook | Primary nav | Consolidate into About or selected methodology content |
| `/experience.html` | `experience.html` | Conventional work timeline | Orphaned from main nav, but file exists | Consolidate/remove from redesigned IA after approval; do not duplicate CV |
| `/404.html` | `404.html` | Not-found page | System route | Preserve and align visual system later |
| `/projects/fabric-modernisation-case-study.html` | Case study | Fabric modernisation | Linked from home/projects/approach | Preserve selected-work evidence; update naming if needed |
| `/projects/fabric-timecard-pipeline-case-study.html` | Case study | Fabric workforce/timecard pipeline | Linked from projects; in sitemap | Promote or align with Selected Work item |
| `/projects/floor-walk-powerapp-case-study.html` | Case study | Inventory/floor-walk digitisation | Linked from home/projects/approach | Preserve; align with inventory-check selected work |
| `/projects/self-service-kiosk-case-study.html` | Case study | Employee/frontline kiosk | Linked from home/projects/approach | Preserve; likely selected work |
| `/projects/warehouse-assignment-similarity-analysis.html` | Case study | Python EDA support project | Linked from projects; in sitemap | Preserve as Supporting Project |
| `/projects/sales_analysis_case_study.html` | Case study | Power BI fundamentals support project | Linked from projects | Preserve as Supporting Project |
| `/projects/ai-qa-coaching-case-study.html` | Case study | AI QA/coaching background | Not linked from projects except historical/current summary path | Investigate positioning for multilingual QA selected work |
| `/projects/football_analysis_case_study.html` | Case study | Python football analysis | Not linked from current projects page | Preserve/investigate as Supporting Project |
| `/projects/house_prices_case_study.html` | Case study | House-price prediction | Not linked from current projects page | Preserve/investigate as Supporting Project |
| `/projects/n8n_email_routing_case_study.html` | Case study | n8n/OpenAI email routing | Not linked from current projects page | Preserve/investigate as Supporting Project |
| `/projects/smart_device_analysis_case_study.html` | Case study | Bellabeat-style device analysis | Not linked from current projects page | Preserve/investigate as Supporting Project |
| `/insights/` | `insights/index.html` | Insights index | Not in main nav or sitemap | Investigate whether to preserve visibly |
| `/insights/fabric-migration-notes.html` | Insight | Fabric migration controls | Linked from insights index | Preserve/investigate |
| `/insights/power-apps-notes.html` | Insight | Power Apps delivery notes | Linked from insights index | Preserve/investigate |
| `/insights/documentation-visibility.html` | Insight | Documentation controls | Linked from insights index | Preserve/investigate |
| `/insights/advanced-sql-patterns.html` | Insight | SQL reliability patterns | Linked from insights index | Preserve/investigate |

### Navigation Issues

- `experience.html` exists as a complete route but is absent from the current main nav and sitemap.
- `insights/` exists but is absent from the current main nav and sitemap.
- Several supporting project pages exist but are not linked from `projects.html`.
- Main navigation currently uses Home / Projects / Approach / Contact / Download CV, not the intended Home / Work / About / Contact / Download CV.

## 7. Content Inventory

### Hero And Positioning

Verified current hero:

- Name at `index.html:121`.
- Role line: "BI Developer / Senior Data Analyst..." at `index.html:122`.
- Summary copy at `index.html:123`.
- Ten capability pills at `index.html:124-135`.
- Primary CTAs at `index.html:136-140`.

Issue: the current role line puts BI Developer before Senior Data Analyst, while the confirmed primary identity is Senior BI & Data Analyst.

### Impact Metrics

Current metrics appear at `index.html:143-164`:

- Major logistics BI/data delivery.
- 4-8 staff hours/day saved.
- 10+ recurring reports automated.
- c.200 report views/day.
- Mentoring/coordinating 4 junior contributors.

Recommendation: preserve the strongest metrics, but confirm public evidence and wording before redesign.

### Capability Labels

Current capability cards appear at `index.html:167-188`:

- Governed BI & Semantic Modelling.
- Fabric, SQL & Data Quality Controls.
- Power Platform & Reporting Automation.
- Stakeholder Delivery & Adoption.

These are broadly aligned with the confirmed hierarchy, though AI should remain secondary rather than equal to BI.

### Projects And Case Studies

`projects.html:72-136` already distinguishes primary operational BI projects, supporting technical/analytical projects, and current AI/automation work.

Current homepage featured projects (`index.html:191-210`):

- Self-Service Kiosk.
- GXO Fabric Modernisation.
- Floor Walk Power App.

Current NexAura summary (`index.html:213-233`):

- AI QA & Call-Centre Coaching.
- Healthcare Management System.
- E-commerce Reporting Automation.

Gap: the confirmed selected-work set is not yet fully represented as six clear case-study entries.

### Employment Content

`experience.html:137-184` contains a conventional work timeline with titles, dates, companies, and CV-style bullets. This conflicts with the confirmed exclusion of a dedicated Experience section.

### About Content

No dedicated About route exists. Some contextual information is distributed across the homepage, Approach page, and Experience page.

### Contact Details

Current contact content includes one career email link and phone/WhatsApp routes at `index.html:243-248`. The future strategy requires separate career/professional and consulting/NexAura contact routes.

### CV Links

The PDF CV is linked repeatedly across navigation, footer, and CTAs, for example `index.html:138`, `index.html:242`, and `projects.html:63`.

The adjacent text CV file is a placeholder with outdated contact data and appears unreferenced by HTML. It should be investigated before redesign content is finalised.

### Images And Assets

Current visible evidence assets include profile photo, Fabric/PySpark screenshots, kiosk/VuePilot/Raspberry Pi screenshots, sales dashboard assets, football charts, smart-device charts, house-price image, and n8n workflow image.

Several asset folders contain placeholder files. Some icon/logo/tool assets exist but are not currently referenced by the HTML/CSS/XML source scan.

## 8. Current Strengths

- The current homepage is already evidence-led rather than purely biographical.
- The content has strong BI and operations language: Power BI, SQL, Fabric, validation, governance, semantic modelling, and stakeholder delivery.
- Several case studies use useful structures: problem, solution, role, evidence, impact, and next steps.
- `projects.html` already separates primary operational work from supporting projects.
- Live homepage and projects page returned HTTP 200.
- Local href/src scan found no missing local file targets.
- The PR workflow checks local links on pull requests to `main`.

## 9. Positioning And Information-Architecture Issues

### High - Current Role Hierarchy Does Not Fully Match Confirmed Strategy

Verified: `index.html:122` presents "BI Developer / Senior Data Analyst..." while the confirmed primary identity is Senior BI & Data Analyst.

Recommendation: adjust future copy so Senior BI & Data Analyst is primary, with BI engineering, analytics engineering, Fabric, and automation as supporting evidence.

### High - Dedicated Experience Page Conflicts With Confirmed IA

Verified: `experience.html:6-10` labels the route as an Experience page aligned to CV wording, and `experience.html:137-184` contains work-history timeline content.

Recommendation: consolidate the useful proof from this page into selected case studies or About context. Do not recreate a work timeline in the redesign.

### Medium - No Dedicated About Route

Verified: no `about.html` exists, and current nav points to Approach instead.

Recommendation: create future About content around working style, technical judgement, location, and current context, without duplicating CV history.

## 10. Visual-System Findings

### Verified Facts

- Shared CSS has light-only tokens: `--primary-color`, `--accent-color`, `--text-dark`, `--text-light`, `--bg-light`, `--bg-white`, and `--border-color` at `assets/css/site.css:9-16`.
- Body background is `--bg-light`; cards and headers use white backgrounds (`assets/css/site.css:19-30`).
- Many pages define their own local token sets and CSS blocks, for example `projects.html:13-51`.
- No current theme toggle, `data-theme`, `localStorage`, or `prefers-color-scheme` implementation was found locally.
- Reduced-motion handling exists for some hover and nav underline transitions (`assets/css/site.css:269-283`) but is not a full motion system.

### Assessment

Introducing a maintainable light/dark system is feasible, but not trivial in the current structure because colour tokens and layout styles are duplicated across inline page CSS, shared CSS, and Tailwind CDN pages.

### Recommendation

Before implementing themes, centralise design tokens, navigation, footer, button, card, and project-card patterns. Decide whether that centralisation happens through a disciplined static refactor or lightweight static-site templating.

## 11. Responsive Findings

Rendered Chrome checks covered widths 320, 375, 430, 768, 1024, and 1440 for:

- `index.html`
- `projects.html`
- `projects/self-service-kiosk-case-study.html`
- `projects/football_analysis_case_study.html`

### Verified Findings

- Homepage had no horizontal overflow at tested widths.
- Self-service case study had no horizontal overflow at tested widths.
- `projects.html` overflowed horizontally at 320px. The rendered page had `scrollWidth` 352px against a 320px viewport. The likely source is `.grid { grid-template-columns: repeat(auto-fit, minmax(320px,1fr)); }` combined with mobile padding (`projects.html:26-31` and `projects.html:50`).
- `projects/football_analysis_case_study.html` overflowed at 320, 375, and 430px. The rendered offenders were code blocks and images. Source evidence includes Tailwind CDN styling and code blocks at `projects/football_analysis_case_study.html:7-8`, `projects/football_analysis_case_study.html:67-76`, and `projects/football_analysis_case_study.html:124-154`.
- Desktop nav switches to mobile nav at max-width 768px, meaning tablet-width 768px still uses the collapsed menu (`assets/css/site.css:320-357`).

### Recommendation

Future redesign should define explicit responsive rules for narrow mobile, larger mobile, tablet, laptop, and large desktop. Project cards, code blocks, image containers, long labels, and contact links need special handling.

## 12. Accessibility Findings

### Confirmed Strengths

- All HTML files have `lang="en"`.
- Most pages include `<main>`, `<header>`, `<nav>`, and `<footer>` landmarks.
- Most meaningful images have alt text.
- External links commonly use `rel="noopener noreferrer"`.
- Reduced-motion CSS exists for some transitions.

### Confirmed Issues

- The mobile-menu button has an accessible label but no `aria-expanded` or `aria-controls`, for example `index.html:108`, `projects.html:57`, and `assets/css/site.css:305-357`.
- The mobile-menu button's rendered target was about 25x29px in tested pages, below common touch-target guidance.
- No skip link was found.
- Several routes have no `<h1>`: `experience.html`, `projects/football_analysis_case_study.html`, `projects/house_prices_case_study.html`, `projects/n8n_email_routing_case_study.html`, and `projects/smart_device_analysis_case_study.html`.
- Focus styling is mostly browser default plus nav underline; no consistent focus system is defined.
- There is no theme-control semantic implementation because there is no theme control yet.

### Requires Further Browser Testing

- Full colour contrast across all text/background states.
- Keyboard flow after mobile menu opens.
- Screen-reader announcement of menu state.
- 200% zoom behaviour on all pages.

## 13. Performance Findings

### Verified Facts

- Three kiosk JPEGs are very large: `assets/Kiosk - home.jpeg` is about 3.47 MB at 4284x2641; two unreferenced kiosk screenshots are about 3.2-3.3 MB each.
- The self-service kiosk page lazy-loads several evidence screenshots (`projects/self-service-kiosk-case-study.html:125-150`).
- Many image tags do not specify `width` and `height`, increasing layout-shift risk.
- Google Fonts are loaded through CSS `@import` in shared CSS (`assets/css/site.css:1`) and repeated inline in several pages.
- Older pages load Tailwind from jsDelivr and Font Awesome from cdnjs (`projects/football_analysis_case_study.html:7-8`).
- The sales dashboard PDF is about 878 KB and linked from the sales case study.

### Recommendation

During redesign, prepare a formal asset pass: choose case-study evidence images, resize/compress large screenshots, add dimensions, prefer modern image formats where appropriate, and remove only after explicit confirmation.

## 14. SEO And Discoverability Findings

### Verified Strengths

- Newer primary pages have titles, meta descriptions, and Open Graph metadata.
- `robots.txt` allows crawling and points to the sitemap (`robots.txt:1-4`).
- Sitemap exists and includes root, index, projects, approach, and five case-study routes (`sitemap.xml:3-11`).
- CV links are prominent.

### Confirmed Gaps

- No canonical URLs were found.
- No `og:image`, Twitter Card metadata, or structured data was found.
- Sitemap is incomplete: it omits insights pages, several supporting project pages, the sales case study, AI QA page, and the Experience page.
- Several older project pages lack full meta description/Open Graph coverage.
- `/` and `/index.html` are both listed in the sitemap (`sitemap.xml:3-4`), which is not necessarily wrong but should be intentional.

### Recommendation

In the redesign, define canonical URL policy, social-sharing metadata, page descriptions, structured data, and sitemap generation from a central route list.

## 15. Maintainability Findings

### Verified Facts

- Inline style blocks appear in nearly every HTML page.
- Inline scripts for mobile-menu toggling are repeated across many pages.
- Navigation/footer/CV links are repeated widely.
- Contact and role positioning content appears in several places.
- There is no shared content-data layer for projects, routes, contact methods, role labels, CV path, or SEO metadata.
- Placeholder files exist across asset/project folders.

### Risks

- Updating CV links, navigation labels, role title, contact routes, or theme tokens requires repeated manual edits.
- Experience content can drift from the CV.
- Project descriptions and metrics can drift between homepage cards, project index cards, and case-study pages.
- Supporting pages using Tailwind CDN and newer pages using local CSS will be harder to theme consistently.

### Recommendation

Centralise common profile data, route data, project metadata, selected-work/supporting-project classification, contact routes, and CV path before or during redesign.

## 16. Reference-Site Observations

The reference portfolio was inspected as inspiration only. No source code, wording, layout, assets, illustrations, or visual identity should be copied.

Useful observed principles:

- The live reference site exposes a dark theme state on the root element and a visible theme toggle with an accessible label.
- It uses restrained iconography via an SVG icon sprite.
- It separates personal and business/NexAura contact routes.
- It groups capabilities into clearer capability families.
- It uses project cards with type labels and visual/icon cues.
- It uses motion/reveal classes, which should only be adopted if reduced-motion support is implemented.

Important caveat: the reference site includes a conventional Experience section, which conflicts with the confirmed strategy for this portfolio and should not be copied.

## 17. Architecture-Options Comparison

### Option 1 - Refactor Current Static HTML/CSS/JS

Benefits:

- Lowest migration risk.
- No new dependency or build process required.
- GitHub Pages compatibility remains simple.
- Fast runtime and simple hosting.

Costs:

- Repeated markup remains difficult unless aggressively centralised by convention.
- Dark/light theming across inline CSS and Tailwind pages is still labour-intensive.
- SEO, sitemap, and project metadata remain manual.

Suitability:

- Good if the redesign must remain no-build.
- Risky for long-term maintenance unless the page count is reduced and repetition is actively removed.

### Option 2 - Introduce Lightweight Static-Site Templating

Benefits:

- Shared layouts, navigation, footer, metadata, project data, and contact routes.
- Good fit for GitHub Pages with an Actions build step.
- Maintains static output and strong performance.
- Makes Selected Work vs Supporting Projects easier to maintain.
- Better foundation for theme tokens and consistent accessibility patterns.

Costs:

- Requires an approved build tool/dependency.
- Requires migration of existing pages into templates/data.
- Requires a deployment workflow update.

Suitability:

- Strong fit for a 20+ page personal portfolio with repeated content and evolving case studies.

### Option 3 - Rebuild With A Static-Site Framework

Benefits:

- Components, routing, image optimisation options, and content collections.
- Stronger developer ergonomics for complex future growth.
- Easier to create richer interactive components.

Costs:

- Highest migration cost.
- More tooling and dependency surface.
- More deployment complexity than the current site needs.
- Framework choice could distract from evidence/content quality.

Suitability:

- Not justified solely because it is modern. Consider only if the portfolio will grow into a larger content product or needs framework-level interactivity.

## 18. Provisional Architecture Recommendation

Provisional recommendation: choose Option 2, lightweight static-site templating, after the content model is confirmed and after explicit approval for adding a build step.

Reasoning: the current site is static and does not need a full framework, but the number of pages, repeated navigation/footer/CV links, duplicated project metadata, incomplete sitemap coverage, and future light/dark theme requirement make purely manual static HTML increasingly fragile.

Evidence still required before final decision:

- Whether the portfolio owner wants a no-build GitHub Pages workflow.
- Whether future updates will be made by editing Markdown/data files or HTML.
- Whether all current supporting pages should remain published.
- Which case-study assets will be used and whether image processing is needed.

## 19. Preserve / Consolidate / Replace / Investigate Matrix

| Item | Classification | Rationale |
| --- | --- | --- |
| Homepage purpose | Preserve | Already evidence-led and job-search oriented |
| Homepage role wording | Replace | Does not match confirmed primary identity |
| Impact metrics | Preserve with verification | Strong proof, but public evidence should be confirmed |
| Projects index grouping | Preserve/refine | Already separates primary/supporting/current work |
| Experience page | Consolidate | Duplicates CV-style timeline and conflicts with future IA |
| Approach page | Consolidate | Useful methodology, but future nav has About instead |
| Insights pages | Investigate | Useful proof material, currently hidden from nav/sitemap |
| Older Tailwind project pages | Preserve/investigate | Supporting evidence, but inconsistent style/responsiveness |
| Shared CSS | Replace/refactor | Good starting point but light-only and incomplete as system |
| Large evidence images | Preserve/investigate | Useful artefacts, but need curation/compression |
| Placeholder files | Investigate | May be legacy scaffolding; do not delete without approval |
| CV PDF link | Preserve | Central conversion action |
| CV text placeholder | Investigate | Unreferenced and contains stale contact data |

## 20. Prioritised Issue Register

### Critical

No Critical issues were verified during this audit.

### High

- **High - IA conflict:** Dedicated Experience page duplicates CV-style employment history. Evidence: `experience.html:6-10`, `experience.html:137-184`.
- **High - Maintainability drift:** Navigation, footer, styles, scripts, CV path, and project data are repeated across many pages. Evidence: repeated style/script inventory and repeated CV links.
- **High - Theme-readiness gap:** Current site is light-only with duplicated hard-coded colour tokens and no theme toggle. Evidence: `assets/css/site.css:9-16`, `projects.html:13-51`.

### Medium

- **Medium - Responsive overflow:** `projects.html` overflows at 320px; football case study overflows below tablet widths. Evidence: rendered Chrome checks and `projects.html:30`, `projects/football_analysis_case_study.html:67-76`, `projects/football_analysis_case_study.html:124-154`.
- **Medium - Accessibility menu semantics:** Mobile toggle lacks `aria-expanded`/`aria-controls` and has a small rendered target. Evidence: `index.html:108`, `projects.html:57`.
- **Medium - Heading hierarchy:** Several pages have no `<h1>`.
- **Medium - SEO incompleteness:** Missing canonical/social image/Twitter/structured data, incomplete sitemap. Evidence: `sitemap.xml:3-11`.
- **Medium - Asset weight:** Large kiosk JPEGs and missing image dimensions create page-weight/layout-shift risk.

### Low

- **Low - Placeholder residue:** Multiple `placeholder.txt` files exist.
- **Low - Orphaned/hidden content:** Supporting project and insights pages exist but are not surfaced consistently.
- **Low - External font/CDN inconsistency:** Some pages depend on external CDNs while newer pages use local/shared CSS.

### Observations

- Local href/src target check found no missing local file targets.
- Live homepage and projects page returned HTTP 200.
- Reference site demonstrates useful principles but includes elements, especially Experience, that should not be copied.

## 21. Recommended Phased Redesign Sequence

1. Confirm content model and route map: Home, Work, About, Contact, Download CV.
2. Map current pages into Selected Work, Supporting Projects, About/context, or archive candidates.
3. Confirm case-study claims, metrics, screenshots, and contribution boundaries.
4. Choose architecture approach: no-build static refactor or lightweight static templating.
5. Centralise shared data: profile, roles, location, contact routes, CV path, projects, SEO metadata.
6. Build theme-ready design tokens and accessible navigation.
7. Redesign Home and Work first.
8. Migrate selected case studies.
9. Rework About and Contact.
10. Audit/migrate supporting projects and insights.
11. Run full responsive, accessibility, performance, SEO, and link validation.

## 22. Questions Or Assets Needed From Portfolio Owner

- Which case-study screenshots can be public, and which need redaction?
- What public evidence supports each metric currently shown?
- Which Selected Work items need dedicated pages versus summary cards?
- What exact contribution wording is approved for the Healthcare Management System?
- Should the phone/WhatsApp route remain public?
- Is the PDF CV current?
- Should insights remain visible in the redesigned site?
- Which supporting projects should remain published?
- Should the redesigned site include downloadable project PDFs or only web pages?
- Is a lightweight build step acceptable for GitHub Pages?

## 23. Suggested Scope For The Next Single Codex Task

Create a content and route model for the redesigned portfolio before touching website implementation. The task should map every current page and asset into Home, Work, About, Contact, Selected Work, Supporting Projects, archive/investigate, and shared data fields. It should also define the case-study schema and evidence checklist for the six Selected Work items.
