# Portfolio Migration Plan

## Purpose

This plan translates the proposed Eleventy architecture into small, reviewable branches and pull requests. It is migration planning only. It does not install dependencies, implement the redesign, change workflows, commit, push, or deploy.

General rules for every phase:

- Start from a clean working tree on an approved branch.
- Do not work directly on `main` or `master`.
- Keep each pull request narrowly scoped.
- Do not delete, rename, move, or replace files without explicit approval.
- Do not publish unsupported metrics, confidential details, or unreviewed screenshots.
- Production content and data files contain only final public material.
- Unresolved wording, metrics, screenshots, contribution questions, and confidentiality questions remain in planning notes or pull-request tasks and are not encoded as statuses in the site.
- Run the listed validation commands only after the relevant tooling exists.
- Review `git status --short`, `git diff --stat`, and the relevant diffs before requesting review.

## Phase 0: Architecture Approval

| Item | Plan |
|---|---|
| Recommended branch name | `docs/portfolio-architecture-decision` |
| Exact scope | Approve the architecture decision and phased migration plan. Documentation only. |
| Files or areas allowed to change | `docs/portfolio-architecture-decision.md`, `docs/portfolio-migration-plan.md`. |
| Files or areas to preserve | All HTML, CSS, JavaScript, assets, CV files, workflows, config files, `README.md`, `AGENTS.md`, and the `$website-revamp` skill. |
| Validation commands | `git diff --check`; `git status --short`; `git diff --stat`; inspect both new docs directly. |
| Acceptance criteria | Eleventy architecture is accepted or revised; migration phases are approved; no implementation files changed. |
| Rollback point | Delete or revise the two documentation files before merge. |
| Dependency on earlier phases | None. |
| Suggested commit boundaries | One docs commit for architecture decision and migration plan. |
| Live site changes after merge | No. |

## Phase 1: Build-System Foundation

| Item | Plan |
|---|---|
| Recommended branch name | `build/portfolio-eleventy-foundation` |
| Exact scope | Add package and lock files, minimal Eleventy configuration, source/output directories, asset passthrough, local build, and local preview. No visual redesign. |
| Files or areas allowed to change | `package.json`, lockfile, `eleventy.config.js`, initial `src/` or approved temporary source directory, `_site` ignore rule, minimal copied/passthrough asset mapping, optional build-only workflow draft if approved. |
| Files or areas to preserve | Existing root HTML, existing CSS, existing JavaScript, current assets, current CV, current documentation, and current PR link-check workflow unless the PR explicitly updates it for generated output. |
| Validation commands | `npm ci`; `npm run build`; `npm run dev` smoke check; `git diff --check`; route output inventory against current routes. |
| Acceptance criteria | Eleventy builds a static output directory; assets pass through; no intended visual/content change; generated output is not committed; branch documents whether GitHub Pages source remains unchanged or is switched to Actions with explicit instruction; no editorial workflow schemas are created. |
| Rollback point | Revert this PR to return to the current no-build static repository. |
| Dependency on earlier phases | Phase 0 approval. |
| Suggested commit boundaries | One commit for package/config; one commit for source/output directory setup and passthrough; one commit for minimal build docs or validation scripts if included. |
| Live site changes after merge | Ideally no visual change. If deployment workflow/source is changed in this phase, live infrastructure changes but rendered pages must remain equivalent. |

## Phase 2: Shared Layouts and Data

| Item | Plan |
|---|---|
| Recommended branch name | `build/shared-layouts-data` |
| Exact scope | Add base layout, header, navigation, footer, profile/contact/CV data, route data, and SEO foundation. Central data is limited to practical reusable public website content and configuration. Existing appearance may remain temporary. |
| Files or areas allowed to change | `src/_includes/layouts/`, `src/_includes/components/`, `src/_data/`, minimal generated source pages needed to exercise the layout. |
| Files or areas to preserve | Current page content, current assets, current public route set, and existing styling unless needed to wire the shared shell. |
| Validation commands | `npm ci`; `npm run build`; generated route preservation check; generated link check; basic keyboard nav smoke check. |
| Acceptance criteria | Home, Work, About placeholder, Contact placeholder, 404, and compatibility routes can share one shell; nav label is `Work` while `/projects.html` remains the URL; CV/contact values come from data. |
| Rollback point | Revert this PR after Phase 1 remains intact. |
| Dependency on earlier phases | Phase 1. |
| Suggested commit boundaries | One commit for data files; one commit for base layout and components; one commit for SEO/canonical shell. |
| Live site changes after merge | Possible minor markup/source change only if generated site is already live; no intentional redesign. |

## Phase 3: Theme-Ready Design System

| Item | Plan |
|---|---|
| Recommended branch name | `design/theme-ready-system` |
| Exact scope | Add design tokens, typography scale, background system, light/dark mode, accessible navigation states, reduced-motion behaviour, shared cards, buttons, and focus states. |
| Files or areas allowed to change | Shared CSS in the Eleventy source, theme/navigation JavaScript modules, layout components, card/button components, token documentation if useful. |
| Files or areas to preserve | Content wording, routes, project classification, CV files, and unreviewed assets. |
| Validation commands | `npm ci`; `npm run build`; CSS quality check when available; JS lint when available; keyboard navigation check; reduced-motion check; responsive overflow checks at 320, 375, 430, 768, 1024, and 1440px. |
| Acceptance criteria | Theme works with OS preference, explicit stored preference, no-JS fallback, visible focus, accessible toggle semantics, no horizontal overflow on representative pages, and no pure-white default background. |
| Rollback point | Revert this PR while keeping build and shared data phases. |
| Dependency on earlier phases | Phases 1 and 2. |
| Suggested commit boundaries | One commit for tokens/base CSS; one commit for theme module/toggle; one commit for shared card/button/navigation states. |
| Live site changes after merge | Yes, visual system changes if generated site is live. |

## Phase 4: Home and Work

| Item | Plan |
|---|---|
| Recommended branch name | `feature/home-work-eleventy` |
| Exact scope | Build the new homepage and Work hub using confirmed positioning, Selected Work hierarchy, Supporting Projects, and Technical Notes previews. |
| Files or areas allowed to change | `src/index.njk`, `src/projects.njk`, relevant data files, shared card/list components, page-specific CSS only if it belongs in the shared system. |
| Files or areas to preserve | Existing case-study page content, supporting-project page content, Technical Note page content, assets, CV file. |
| Validation commands | `npm ci`; `npm run build`; link check; SEO metadata check for `/` and `/projects.html`; responsive checks; keyboard nav; route preservation. |
| Acceptance criteria | `/` remains canonical homepage; `/projects.html` is labelled Work; homepage uses `Senior BI & Data Analyst`; no public phone/WhatsApp; Work separates Selected Work, Supporting Projects, and Technical Notes; no unsupported metrics are newly introduced. |
| Rollback point | Revert this PR while retaining build, layout, and design-system foundation. |
| Dependency on earlier phases | Phases 1-3. |
| Suggested commit boundaries | One commit for homepage; one commit for Work hub; one commit for SEO/sitemap route data updates. |
| Live site changes after merge | Yes. This is the first major content/IA change if the generated site is live. |

## Phase 5: Selected Work Migration

Use one small pull request per case study or tightly paired case-study group. Preserve existing URLs during the initial migration.

### Phase 5a: Microsoft Fabric Workforce-Data Pipeline

| Item | Plan |
|---|---|
| Recommended branch name | `content/fabric-workforce-data-pipeline` |
| Exact scope | Migrate `projects/fabric-timecard-pipeline-case-study.html` into the case-study schema and preserve `/projects/fabric-timecard-pipeline-case-study.html`. |
| Files or areas allowed to change | One Markdown case-study source, case-study data references, related Technical Note links, public-safe assets selected for the case study. |
| Files or areas to preserve | Other project pages, unrelated assets, route slugs, CV, workflows. |
| Validation commands | `npm ci`; `npm run build`; route preservation; link check; SEO check; accessibility spot check; responsive check for the case-study route. |
| Acceptance criteria | Contribution boundary is explicit; only final agreed metrics are included; assets are public-safe; current URL preserved; related notes linked where useful. |
| Rollback point | Revert this case-study PR. |
| Dependency on earlier phases | Phases 1-4. |
| Suggested commit boundaries | One commit for content migration; one commit for data/related links if needed. |
| Live site changes after merge | Yes, one case-study route changes. |

### Phase 5b: Operational BI and Performance Reporting

| Item | Plan |
|---|---|
| Recommended branch name | `content/operational-bi-performance-reporting` |
| Exact scope | Migrate `projects/fabric-modernisation-case-study.html` into the Selected Work model while preserving its current URL initially. |
| Files or areas allowed to change | One Markdown case-study source, project data, final agreed metric references, public-safe assets selected for the case study. |
| Files or areas to preserve | Experience timeline content outside the case-study narrative, other project routes, dashboard screenshots not selected for public use. |
| Validation commands | `npm ci`; `npm run build`; route preservation; link check; SEO check; responsive and accessibility spot checks. |
| Acceptance criteria | Case study is framed around operational BI/performance reporting; direct ownership versus wider team work is clear; `10+ recurring reports automated` appears only after final wording has been agreed. |
| Rollback point | Revert this case-study PR. |
| Dependency on earlier phases | Phases 1-4. |
| Suggested commit boundaries | One commit for content; one commit for metric/data linkage if needed. |
| Live site changes after merge | Yes, one case-study route changes. |

### Phase 5c: Inventory-Check Process Digitisation

| Item | Plan |
|---|---|
| Recommended branch name | `content/inventory-check-process-digitisation` |
| Exact scope | Migrate `projects/floor-walk-powerapp-case-study.html` while preserving `/projects/floor-walk-powerapp-case-study.html`. |
| Files or areas allowed to change | One Markdown case-study source, data, related note links, public-safe assets selected for the case study. |
| Files or areas to preserve | Other project pages, operational screenshots not selected for public use, route slug. |
| Validation commands | `npm ci`; `npm run build`; route preservation; link check; SEO check; responsive and accessibility spot checks. |
| Acceptance criteria | Digitisation story is clear; Power Apps/BI controls are accurate; `4-8 staff hours/day saved` appears only after final wording and scope have been agreed. |
| Rollback point | Revert this case-study PR. |
| Dependency on earlier phases | Phases 1-4. |
| Suggested commit boundaries | One commit for content; one commit for data/assets if needed. |
| Live site changes after merge | Yes, one case-study route changes. |

### Phase 5d: Employee Self-Service Reporting Kiosk

| Item | Plan |
|---|---|
| Recommended branch name | `content/self-service-reporting-kiosk` |
| Exact scope | Migrate `projects/self-service-kiosk-case-study.html` while preserving `/projects/self-service-kiosk-case-study.html`. |
| Files or areas allowed to change | One Markdown case-study source, data, redacted/optimised kiosk assets selected for publication. |
| Files or areas to preserve | Original asset files unless replacement is explicitly requested, unrelated project pages, route slug. |
| Validation commands | `npm ci`; `npm run build`; route preservation; link check; asset-size check; SEO check; responsive and accessibility spot checks. |
| Acceptance criteria | Kiosk role/contribution boundary is explicit; `c.200 report views/day` appears only after final wording has been agreed; screenshots are public-safe and responsive. |
| Rollback point | Revert this case-study PR. |
| Dependency on earlier phases | Phases 1-4. |
| Suggested commit boundaries | One commit for content; one commit for asset substitutions if needed. |
| Live site changes after merge | Yes, one case-study route changes. |

### Phase 5e: Multilingual Quality-Assurance Product

| Item | Plan |
|---|---|
| Recommended branch name | `content/multilingual-quality-assurance-product` |
| Exact scope | Re-scope `projects/ai-qa-coaching-case-study.html` to the confirmed multilingual QA product or keep the current page as a compatibility route if a new route is later chosen. |
| Files or areas allowed to change | One case-study source, project data, final public caveat wording, synthetic/redacted examples selected for publication. |
| Files or areas to preserve | Client/product confidential details, unsupported outcome metrics, unrelated NexAura content. |
| Validation commands | `npm ci`; `npm run build`; route preservation; link check; SEO check; accessibility and responsive spot checks. |
| Acceptance criteria | Public wording is accurate; ongoing or MVP wording is used if needed; contribution boundary is clear; synthetic or redacted page content is labelled. |
| Rollback point | Revert this case-study PR. |
| Dependency on earlier phases | Phases 1-4 plus final owner-provided content. |
| Suggested commit boundaries | One commit for content; one commit for data/public labels. |
| Live site changes after merge | Yes, one case-study route changes. |

### Phase 5f: NexAura Healthcare Management System

| Item | Plan |
|---|---|
| Recommended branch name | `content/nexaura-healthcare-management-system` |
| Exact scope | Create the new HMS Selected Work case study from final owner-provided material. Preserve no existing dedicated URL because none exists today. |
| Files or areas allowed to change | One new Markdown case-study source, project data, Work page data, public-safe diagrams or illustrative assets. |
| Files or areas to preserve | Confidential healthcare/client/security details, Azure/GitHub configuration detail not selected for publication, unrelated project pages. |
| Validation commands | `npm ci`; `npm run build`; link check; SEO check; accessibility and responsive checks; sensitive-information review checklist. |
| Acceptance criteria | Describes technical and delivery leadership without implying sole development; security/RBAC/OIDC/Key Vault details are pattern-level and public-safe; lifecycle wording is accurate. |
| Rollback point | Revert this case-study PR. |
| Dependency on earlier phases | Phases 1-4 plus final owner-provided content and public-safety review. |
| Suggested commit boundaries | One commit for content; one commit for data/assets if needed. |
| Live site changes after merge | Yes, a new Selected Work route appears if linked from Work. |

## Phase 6: About, Contact and Compatibility Pages

| Item | Plan |
|---|---|
| Recommended branch name | `content/about-contact-compatibility` |
| Exact scope | Build About, Contact, Experience compatibility, Approach compatibility, and 404 pages. |
| Files or areas allowed to change | `src/about.njk`, `src/contact.njk`, `src/experience.njk`, `src/approach.njk`, `src/404.njk`, contact/profile data, route/SEO data. |
| Files or areas to preserve | CV file, project page content, public phone/WhatsApp exclusion, current project routes. |
| Validation commands | `npm ci`; `npm run build`; link check; SEO/noindex check; keyboard navigation; route preservation; responsive checks. |
| Acceptance criteria | About has no employment timeline; Contact separates career/professional and NexAura routes; public phone/WhatsApp absent; `experience.html` and `approach.html` are lightweight noindex compatibility pages; `/404.html` exists and links to recovery routes. |
| Rollback point | Revert this PR while keeping migrated Home/Work/case studies. |
| Dependency on earlier phases | Phases 1-5, although this can run after Phase 4 if case-study links are stubbed carefully. |
| Suggested commit boundaries | One commit for About; one for Contact; one for compatibility pages and 404. |
| Live site changes after merge | Yes. |

## Phase 7: Supporting Projects and Technical Notes

| Item | Plan |
|---|---|
| Recommended branch name | `content/supporting-projects-technical-notes` |
| Exact scope | Migrate and standardise supporting project pages and Technical Notes while preserving existing URLs. |
| Files or areas allowed to change | Markdown sources for supporting projects, Markdown sources for Technical Notes, project/note data, existing assets selected for publication, Work page related-link data. |
| Files or areas to preserve | Selected Work pages unless related links need updating, asset replacements not explicitly requested, route slugs. |
| Validation commands | `npm ci`; `npm run build`; route preservation; link check; SEO check; responsive checks for older Tailwind-derived pages; accessibility spot checks. |
| Acceptance criteria | Supporting Projects are visibly secondary to Selected Work; Technical Notes hub remains `/insights/`; each migrated page has an `h1`, metadata, canonical URL, last-reviewed date, and no small-screen overflow from images/code blocks. |
| Rollback point | Revert this PR or split into smaller PRs if review size grows. |
| Dependency on earlier phases | Phases 1-6. |
| Suggested commit boundaries | One commit per supporting project group; one commit for Technical Notes hub and notes; one commit for route/SEO data. |
| Live site changes after merge | Yes, several secondary routes change. |

## Phase 8: Assets, SEO and Launch Validation

| Item | Plan |
|---|---|
| Recommended branch name | `launch/assets-seo-validation` |
| Exact scope | Final image optimisation, CV replacement if supplied and agreed, sitemap, canonicals, structured data, Open Graph, accessibility, performance, link validation, and route preservation. |
| Files or areas allowed to change | Public asset derivatives selected for launch, CV asset if supplied and agreed, SEO data, sitemap template, robots file if needed, validation scripts/config, GitHub Actions deployment workflow if not already active. |
| Files or areas to preserve | Final source content, original assets unless deletion/replacement is separately requested, route slugs, and the rule that production content contains no confidential working notes or unresolved claims. |
| Validation commands | `npm ci`; `npm run build`; link check; HTML validation; accessibility scan and manual keyboard checks; responsive overflow checks; SEO metadata check; sitemap check; asset budget check; route preservation check; `git diff --check`; `git status --short`; `git diff --stat`. |
| Acceptance criteria | All confirmed routes exist; `/index.html` canonicalises to `/`; noindex compatibility pages excluded from sitemap; public sitemap complete; Open Graph/social metadata present; CV route is current if replaced; large images optimised; no draft placeholder wording is visible; assets are public-safe; no obvious accessibility or responsive blockers; deployment workflow uses least privilege. |
| Rollback point | Revert launch PR, or revert deployment workflow/settings to previous known-good state with explicit instruction. |
| Dependency on earlier phases | Phases 1-7. |
| Suggested commit boundaries | One commit for assets/CV; one commit for SEO/sitemap/structured data; one commit for validation scripts/workflow; one commit for final fixes from validation. |
| Live site changes after merge | Yes. This is the launch-hardening phase and may also change deployment if not completed earlier. |

## Recommended First Implementation Task

After Phase 0 approval, the next single implementation task should be Phase 1: add the Eleventy build-system foundation with no visual redesign and no content migration. That PR should prove local build, output directory, asset passthrough, and route-preservation strategy before any page redesign begins.
