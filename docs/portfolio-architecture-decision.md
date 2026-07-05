# Portfolio Architecture Decision

## 1. Decision Status

Status: Proposed

Date: 2026-07-05

Decision: Migrate the redesigned portfolio to Eleventy with Nunjucks layouts, Markdown content, central data files, shared CSS, small framework-free JavaScript modules, static output, and GitHub Pages deployment through GitHub Actions.

## 2. Context

The current repository is a static GitHub Pages portfolio served from hand-maintained HTML, CSS, JavaScript, and local assets. The repository inventory confirms 21 HTML pages across the root, `projects/`, and `insights/`, plus `assets/`, `robots.txt`, `sitemap.xml`, and a pull-request link-check workflow at `.github/workflows/pr-site-checks.yml`.

The current implementation mixes page-level inline CSS, shared CSS in `assets/css/site.css`, repeated mobile-menu JavaScript, and older supporting-project pages that load Tailwind and Font Awesome from CDNs. There is no `package.json`, lockfile, Eleventy config, Jekyll config, Astro config, `.nojekyll`, or deployment workflow.

The planning sources require a BI-led portfolio that centralises repeated profile facts, navigation, contact routes, CV links, project metadata, metrics, SEO metadata, and route metadata. They also require Selected Work, Supporting Projects, and Technical Notes to be maintained without giving every item equal prominence.

The redesign must support light and dark themes, an accessible theme toggle, OS preference detection, stored explicit preference, reduced-motion behaviour, strong keyboard/focus support, and minimal client-side JavaScript.

Route preservation is a first-class requirement. `/` remains canonical. `/projects.html` remains the Work hub. Existing case-study and supporting-project `.html` URLs should be preserved during the initial migration. `experience.html` and `approach.html` become lightweight noindex compatibility pages.

The site must remain static and GitHub Pages compatible. Local development must be practical on Windows and easy for Codex to maintain through focused pull requests.

## 3. Decision Drivers

Ranked drivers:

1. Preserve existing public URLs, especially `.html` project routes.
2. Reduce duplicated navigation, footer, contact, CV, project, metric, and SEO data.
3. Keep the runtime static, fast, accessible, and low-JavaScript.
4. Support Markdown case studies and Technical Notes with structured front matter.
5. Keep production content simple and limited to final public content.
6. Keep GitHub Pages deployment simple and reversible.
7. Keep Windows local development straightforward.
8. Avoid framework complexity that does not serve the portfolio requirements.
9. Enable phased migration through small pull requests.
10. Keep rollback risk low while the current static site remains a fallback.

Unresolved content-development questions should remain outside the website source model, such as in planning documents, GitHub issues, pull-request notes, or owner-question lists.

## 4. Weighted Comparison

Scoring scale:

- 5 = excellent fit with low risk.
- 4 = good fit with manageable risk.
- 3 = workable, but with meaningful caveats.
- 2 = possible, but costly or fragile.
- 1 = poor fit for the confirmed requirements.

Weights total 100. Higher weights were assigned to route preservation, GitHub Pages compatibility, migration complexity, reusable layouts, central data, case-study support, maintenance, accessibility, and build simplicity because those are the strongest confirmed requirements from the brief, audit, content model, and case-study schema.

| Criterion | Weight | Manual static HTML/CSS/JS | Eleventy | Jekyll | Astro static |
|---|---:|---:|---:|---:|---:|
| Migration complexity | 7 | 5 | 4 | 3 | 2 |
| Ability to preserve current `.html` URLs | 7 | 5 | 5 | 5 | 4 |
| GitHub Pages compatibility | 7 | 5 | 5 | 5 | 5 |
| Windows local-development setup | 4 | 5 | 5 | 2 | 5 |
| Build and dependency complexity | 5 | 5 | 4 | 3 | 2 |
| Shared layouts and reusable components | 6 | 2 | 5 | 4 | 5 |
| Central profile, navigation, contact and CV data | 6 | 1 | 5 | 4 | 5 |
| Selected Work and Supporting Project collections | 5 | 1 | 5 | 4 | 5 |
| Technical Notes | 3 | 2 | 5 | 4 | 5 |
| Markdown authoring | 3 | 1 | 5 | 5 | 5 |
| Case-study schema support | 5 | 2 | 4 | 3 | 5 |
| SEO metadata | 4 | 2 | 5 | 4 | 5 |
| Sitemap generation | 3 | 2 | 4 | 4 | 4 |
| Canonical URL handling | 3 | 3 | 5 | 4 | 5 |
| Legacy compatibility pages | 3 | 4 | 5 | 5 | 4 |
| Light/dark theme support | 4 | 2 | 5 | 4 | 5 |
| Accessibility | 4 | 3 | 5 | 4 | 5 |
| Minimal client-side JavaScript | 3 | 5 | 5 | 5 | 4 |
| Asset passthrough and optimisation workflow | 3 | 3 | 4 | 3 | 5 |
| Local preview and validation | 4 | 4 | 5 | 3 | 5 |
| Long-term maintenance | 6 | 1 | 5 | 4 | 4 |
| Ease of use with Codex | 2 | 2 | 5 | 3 | 4 |
| Rollback risk | 3 | 5 | 4 | 4 | 3 |
| Total weighted score | 100 | 312 / 500 | 474 / 500 | 389 / 500 | 434 / 500 |

| Candidate | Weighted score | Evidence | Risks |
|---|---:|---|---|
| Manual static HTML/CSS/JS | 312 | Current site already works this way, requires no dependency installation, and preserves current files and URLs by default. | Does not solve duplication. Navigation, footer, CV links, mobile menu, project metadata, SEO, sitemap, and theme tokens remain manual. Light/dark migration across inline CSS and CDN pages is high-friction. |
| Eleventy with Nunjucks, Markdown and central data | 474 | Eleventy supports exact output paths through permalinks, Nunjucks templates and includes, Markdown content, global/template data, collections, passthrough file copy, local build, and local serve. GitHub Pages can deploy static-generator output with Actions artifacts. | Requires a new Node dependency and build workflow. Schema validation is not as strict as Astro unless a future validation script is added. Image optimisation is a deliberate workflow, not automatic unless a later dependency is approved. |
| Jekyll with Liquid, Markdown, data files and collections | 389 | GitHub Pages has built-in Jekyll support. Jekyll supports Liquid, Markdown, `_data`, collections, permalinks, and supported SEO/sitemap plugins. | GitHub documentation states Jekyll is not officially supported for Windows. GitHub Pages constrains plugins and currently uses Jekyll 3.10.0 through the Pages stack. Ruby/Bundler setup is less friendly for this Windows/Codex workflow. |
| Astro in static-output mode | 434 | Astro defaults to static output, supports content collections with schema validation, file-based routing, `build.format: 'file'` for `.html` output, official GitHub Pages deployment, and a stronger asset pipeline. | More framework and dependency surface than this personal portfolio needs. Migration would be closer to an app rebuild, with more generated assets and framework conventions to maintain. The extra power is not required by the confirmed low-JavaScript portfolio scope. |

Official documentation checked:

- [Eleventy permalinks](https://www.11ty.dev/docs/permalinks/) confirm custom output paths and `.html` output are supported.
- [Eleventy data](https://www.11ty.dev/docs/data/) confirms templates can use front matter, directory data, global data, and computed data.
- [Eleventy collections](https://www.11ty.dev/docs/collections/) confirms tagged content can be grouped into collections.
- [Eleventy passthrough copy](https://www.11ty.dev/docs/copy/) confirms static assets can be copied to output.
- [Eleventy command line usage](https://www.11ty.dev/docs/usage/) confirms build output defaults and `--serve` local preview.
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) confirm static-generator output can be uploaded with `actions/upload-pages-artifact` and deployed with `actions/deploy-pages`.
- [GitHub Pages and Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll) confirms Jekyll support, Windows caveat, and plugin limits.
- [GitHub Pages dependency versions](https://pages.github.com/versions/) confirms the current GitHub Pages Jekyll dependency set.
- [Astro GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/) confirms static Astro deployment through GitHub Actions.
- [Astro configuration reference](https://docs.astro.build/en/reference/configuration-reference/) confirms `output: 'static'`, `site`, and `build.format`.

## 5. Selected Architecture

Recommended architecture: Eleventy.

Proposed stack at an architectural level:

- Eleventy as the static-site generator.
- Nunjucks for layouts, includes, and reusable templates.
- Markdown with front matter for case studies, supporting projects, and Technical Notes.
- Central data files for profile, navigation, contacts, CV information, capabilities, project summaries, final metrics, route information, SEO defaults, display ordering, Homepage or Work-page inclusion, and last-reviewed dates.
- Shared CSS design system with design tokens, layout primitives, cards, buttons, forms, and theme states.
- Small framework-free JavaScript modules for theme preference and responsive navigation.
- Static GitHub Pages output generated into `_site`.
- GitHub Actions build and deployment through Pages artifacts.

Central data files should contain final site content and ordinary display or configuration data only. They should not contain separate workflow-control fields.

No implementation files are created by this decision.

## 6. Rejected Alternatives

Manual static HTML, CSS and JavaScript was rejected because it preserves today's simplicity but also preserves the main defects: repeated navigation, repeated footer and CV links, duplicated project summaries, manual SEO, incomplete sitemap coverage, repeated mobile-menu scripts, and theme migration across scattered inline CSS.

Jekyll was rejected because it is less suitable for the confirmed Windows/Codex workflow. It is GitHub Pages friendly and technically capable, but GitHub's own documentation states Jekyll is not officially supported on Windows. Its plugin and version constraints also make it a less flexible migration target than Eleventy for this repo.

Astro was rejected because it is stronger than needed. It scores well technically, especially for content schemas and assets, but the portfolio does not need framework-level component islands, routing conventions, or a larger Vite-based toolchain. Selecting Astro would increase migration complexity without a confirmed requirement that justifies it.

## 7. Proposed Source Structure

Proposed future structure:

```text
.
|-- .github/
|   `-- workflows/
|       |-- pr-site-checks.yml
|       `-- deploy-pages.yml
|-- src/
|   |-- index.njk
|   |-- projects.njk
|   |-- about.njk
|   |-- contact.njk
|   |-- 404.njk
|   |-- experience.njk
|   |-- approach.njk
|   |-- _data/
|   |   |-- site.json
|   |   |-- profile.json
|   |   |-- navigation.json
|   |   |-- contacts.json
|   |   |-- cv.json
|   |   |-- metrics.json
|   |   |-- projects.json
|   |   |-- routes.json
|   |   `-- seo.json
|   |-- _includes/
|   |   |-- layouts/
|   |   |   |-- base.njk
|   |   |   |-- page.njk
|   |   |   |-- case-study.njk
|   |   |   |-- supporting-project.njk
|   |   |   `-- technical-note.njk
|   |   `-- components/
|   |       |-- head.njk
|   |       |-- header.njk
|   |       |-- footer.njk
|   |       |-- theme-toggle.njk
|   |       |-- work-card.njk
|   |       |-- note-card.njk
|   |       |-- metric-list.njk
|   |       `-- asset-figure.njk
|   |-- work/
|   |   |-- selected/
|   |   |   |-- fabric-timecard-pipeline-case-study.md
|   |   |   |-- fabric-modernisation-case-study.md
|   |   |   |-- floor-walk-powerapp-case-study.md
|   |   |   |-- self-service-kiosk-case-study.md
|   |   |   |-- ai-qa-coaching-case-study.md
|   |   |   `-- nexaura-healthcare-management-system.md
|   |   `-- supporting/
|   |       |-- warehouse-assignment-similarity-analysis.md
|   |       |-- sales_analysis_case_study.md
|   |       |-- football_analysis_case_study.md
|   |       |-- house_prices_case_study.md
|   |       |-- n8n_email_routing_case_study.md
|   |       `-- smart_device_analysis_case_study.md
|   |-- insights/
|   |   |-- index.njk
|   |   |-- fabric-migration-notes.md
|   |   |-- power-apps-notes.md
|   |   |-- documentation-visibility.md
|   |   `-- advanced-sql-patterns.md
|   |-- assets/
|   |   |-- css/
|   |   |   `-- site.css
|   |   |-- js/
|   |   |   |-- theme.js
|   |   |   `-- navigation.js
|   |   `-- img/
|   `-- sitemap.njk
|-- public/
|   `-- passthrough assets copied from the current assets and project asset folders
|-- tests/
|   |-- route-preservation.mjs
|   |-- seo-check.mjs
|   `-- asset-budget.mjs
|-- docs/
|   |-- portfolio-brief.md
|   |-- portfolio-audit.md
|   |-- portfolio-content-model.md
|   |-- case-study-content-schema.md
|   |-- portfolio-architecture-decision.md
|   `-- portfolio-migration-plan.md
|-- _site/
|   `-- generated static output, not committed
|-- eleventy.config.js
|-- package.json
`-- package-lock.json
```

The structure is intentionally proportionate to a personal portfolio. It separates source, includes, data, content, public assets, generated output, documentation, and future validation scripts. Data files such as `metrics.json`, `projects.json`, `routes.json`, and `seo.json` contain final site content and ordinary rendering configuration only; separate workflow-tracking data files are not part of the architecture.

## 8. Content Representation

Use Markdown/front matter for:

- Selected Work case studies.
- Supporting Project pages.
- Technical Notes.
- Compatibility-page body copy where simple prose is enough.

Use central structured data for:

- Site metadata.
- Profile facts.
- Navigation labels and URLs.
- Contact routes.
- CV path and label.
- Capability groups.
- Project ordering, classification, featured placement, and card summaries.
- Final metric objects.
- Route metadata.
- SEO defaults and per-route overrides.
- Last-reviewed dates as ordinary maintenance fields.

Use Nunjucks templates for:

- Shared page shell.
- Navigation and footer.
- SEO/canonical metadata.
- Work cards.
- Case-study sections.
- Technical Note cards.
- Metric rendering.
- Compatibility pages.
- Sitemap XML.

Use static asset passthrough for:

- CV files.
- Profile image.
- Case-study screenshots and diagrams.
- Supporting-project charts.
- PDFs.
- Logos and tool icons after rights/publication review.
- `robots.txt`.

Case-study schema mapping:

- Stable item ID maps to front matter `id`.
- Public title, short title, classification, summary, role, contribution boundary, technologies, SEO title, meta description, and last-reviewed date map to front matter.
- Detailed narrative sections map to Markdown body headings.
- Metrics map to central metric objects referenced by ID, not hard-coded repeatedly.
- Assets map to front matter references or structured data entries with path, alt text, caption, width, height, and related project.

Markdown front matter and central data contain only fields needed to render and maintain the final public website. Unresolved wording, metrics, screenshots, contribution boundaries, and confidentiality questions remain in planning documents or delivery tasks, not in production content data. Templates do not need publication logic. A project that is genuinely ongoing may include direct public wording such as `In progress` or `MVP delivery`, but this is ordinary page content rather than part of a separate workflow model. `Illustrative`, `Synthetic data`, `Anonymised`, or `Redacted` may appear directly in captions or page copy where visitors need that context.

Metric representation:

- Final metrics may remain centralised to prevent duplicated wording.
- A final metric record may include ID, value, unit, display wording, scope, time period, attribution, source or basis note, related case study, and last-reviewed date.
- A metric still being debated does not enter production site data.

Asset representation:

- Production asset references may include path, alt text, caption, width, height, and related project.
- Redaction and confidentiality checks happen before a public asset is added to the production asset set.
- A caption may directly state that an image is illustrative, synthetic, anonymised, or redacted when visitors need that context.

## 9. Route and Permalink Design

Eleventy should generate exact initial routes with explicit permalinks:

| Route | Proposed source | Output/permalink | Canonical policy |
|---|---|---|---|
| `/` | `src/index.njk` | `_site/index.html` | Canonical URL is `/`. |
| `/index.html` | same generated file as homepage | `_site/index.html` | Technically available; canonical tag points to `/`. Exclude `/index.html` from sitemap. |
| `/projects.html` | `src/projects.njk` | `_site/projects.html` | Canonical Work hub. Navigation label is `Work`. |
| `/about.html` | `src/about.njk` | `_site/about.html` | Canonical About route. |
| `/contact.html` | `src/contact.njk` | `_site/contact.html` | Canonical Contact route. |
| `/insights/` | `src/insights/index.njk` | `_site/insights/index.html` | Technical Notes hub. Canonical URL is `/insights/`. |
| Existing Selected Work URLs | Markdown in `src/work/selected/` | Exact current `/projects/*.html` permalink | Preserve during initial migration. Cosmetic slug changes are out of scope. |
| Existing Supporting Project URLs | Markdown in `src/work/supporting/` | Exact current `/projects/*.html` permalink | Preserve during initial migration. Cosmetic slug changes are out of scope. |
| `experience.html` | `src/experience.njk` | `_site/experience.html` | Lightweight compatibility page, no employment timeline, `noindex,follow`, canonical to `/about.html` or the most relevant destination chosen during implementation. |
| `approach.html` | `src/approach.njk` | `_site/approach.html` | Lightweight compatibility page directing to About and relevant case studies, `noindex,follow`, canonical to `/about.html` or the chosen destination. |
| `/404.html` | `src/404.njk` | `_site/404.html` | Utility page, noindex, links to Home, Work, About, and Contact. |

Eleventy permalinks should be set per file or through route data. Avoid relying on filename-derived defaults for preserved `.html` URLs.

## 10. Theme Architecture

Use CSS custom properties as design tokens:

- Colour tokens for canvas, surface, text, muted text, links, borders, focus, accents, warnings, and public labels.
- Spacing, radius, shadow, border, typography, and motion tokens.
- Semantic tokens over raw colour names, for example `--color-bg`, `--color-surface`, `--color-text`, and `--color-focus`.

Theme selection:

- Default to OS preference with `prefers-color-scheme`.
- Allow an explicit visitor preference stored in `localStorage`.
- Apply the resolved theme on the document element with `data-theme="light"` or `data-theme="dark"`.
- Include a small early inline script in the `<head>` to apply the stored or OS-derived theme before CSS paints, reducing theme flash.
- Wrap storage access in `try/catch` so privacy settings do not break rendering.

Toggle semantics:

- Use a real `button`.
- Provide an accessible name that includes the next action, such as `Switch to dark theme`.
- Use `aria-pressed` or `role="switch"` with `aria-checked`; do not mix both patterns.
- Preserve visible focus and keyboard operation.

Motion:

- Use `prefers-reduced-motion: reduce` to remove non-essential transitions and animations.
- Keep theme changes understandable without animation.

No-JavaScript fallback:

- CSS should still follow OS preference through `@media (prefers-color-scheme: dark)`.
- The site remains fully readable and navigable without persisted preference or menu enhancement.

## 11. Deployment Architecture

Future commands:

- Local build: `npm run build`, implemented as `eleventy`.
- Local preview: `npm run dev`, implemented as `eleventy --serve`.
- Production build: `npm ci` followed by `npm run build`.

Output directory: `_site`.

GitHub Actions responsibilities:

- Check out the repository.
- Set up Node.
- Restore dependencies with `npm ci`.
- Build the Eleventy site into `_site`.
- Run validation against generated output.
- Upload `_site` with `actions/upload-pages-artifact`.
- Deploy with `actions/deploy-pages`.

GitHub Pages artifact deployment:

- Use a custom GitHub Actions Pages workflow.
- Grant only required permissions: `contents: read`, `pages: write`, and `id-token: write` for deployment.
- Use the `github-pages` environment.

Existing PR link-check integration:

- Preserve the existing lychee PR check concept.
- After migration, run the link check against generated `_site/**/*.html` rather than only source HTML.
- Keep external exclusions for localhost and LinkedIn unless later evidence supports changing them.

Generated output:

- `_site` should not be committed.
- The live site should deploy from the GitHub Pages artifact, not from committed generated output.

Rollback:

- Revert the merge commit that introduced the failing source or workflow change.
- Re-run the previous successful Pages workflow if available.
- If deployment settings were switched to Actions and need emergency reversal, switch back to the previous branch/root source only with explicit owner instruction.

## 12. Validation Architecture

Expected future checks:

- Build: Eleventy build must complete without errors.
- Broken links: lychee against generated `_site/**/*.html`.
- HTML validity: validate generated HTML.
- Accessibility: automated checks plus keyboard, focus, heading, landmark, alt text, contrast, mobile menu, and theme-toggle review.
- Responsive overflow: automated or browser-based checks at narrow mobile, standard mobile, larger mobile, tablet, laptop, and large desktop widths.
- SEO metadata: title, meta description, canonical, Open Graph, Twitter card where used, and structured data checks.
- Sitemap: generated `sitemap.xml` includes public canonical routes and excludes noindex compatibility pages.
- Asset size: budget checks for large screenshots, PDFs, and generated assets.
- JavaScript linting where relevant: theme and navigation modules only.
- CSS validation or quality checks: token coverage, no duplicated page-only colour systems, contrast review.
- Route preservation: a script should assert that all confirmed legacy URLs exist in `_site`.

Do not claim accessibility compliance from automated checks alone. Report exactly what was checked.

## 13. Security and Privacy

- Do not put secrets, tokens, tenant IDs, private URLs, private repository links, private connection strings, or access keys in source content, generated HTML, JavaScript, CSS, or public assets.
- Public email handling should be deliberate. `mailto:` links are acceptable if intentionally chosen; obfuscation may be considered only if it does not add fragile JavaScript or maintenance burden.
- The website repository should not contain confidential project details or unpublished claims in production content files.
- Sensitive working notes should remain outside production content, such as in planning documents or local/private source material.
- Templates render normal public content fields without needing an internal evidence-governance layer.
- Redacted assets should be exported as separate public-safe files. Do not publish reversible blur, sensitive IDs, internal URLs, names, emails, phone numbers, access groups, or tenant/account identifiers.
- Synthetic examples must be visibly labelled as synthetic or illustrative when shown publicly.
- Dependency review is required when adding Eleventy or any future validation/image tooling.
- GitHub Actions deployment should use least privilege: read-only repository content for build, Pages write and OIDC only for deploy, and no repository write permissions.

## 14. Consequences

Positive consequences:

- Repeated navigation, footer, CV, contact, SEO, and project-card data can be centralised.
- Existing `.html` URLs can be preserved while source authoring becomes cleaner.
- Markdown makes case studies and Technical Notes easier to maintain.
- Static output keeps runtime simple, fast, cacheable, and GitHub Pages friendly.
- Theme and accessibility patterns can be implemented once in shared templates and CSS.
- Migration can proceed through focused pull requests.

Negative consequences:

- The repository gains a Node build step, `package.json`, and lockfile in a future implementation phase.
- Deployment must move from direct static root files to generated artifact deployment or equivalent.
- Eleventy does not provide Astro-style built-in schema validation; additional validation scripts may be needed.
- Image optimisation remains a separate workflow unless a future dependency is approved.

Neutral consequences:

- Current HTML pages can remain as a rollback reference during early migration.
- The public site stays static; the change is in source organisation and build workflow.
- No server-side runtime, database, CMS, or client application framework is introduced.

## 15. Open Decisions

Open decisions that need implementation evidence:

- Whether the source directory should be `src/` or a temporary underscore-prefixed source during the deployment transition to avoid exposing source files before GitHub Actions Pages deployment is active.
- Exact validation tooling package choices for HTML validity, accessibility scanning, route preservation, SEO checks, and asset budgets.
- Whether sitemap generation should be a hand-written Eleventy XML template or a small approved dependency.
- Whether image optimisation should remain manual or use a future approved Eleventy/image pipeline.
- Exact noindex/canonical targets for `experience.html` and `approach.html` after the About and Work pages exist.
