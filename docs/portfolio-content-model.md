# Portfolio Content Model and Route Model

## 1. Content-Model Principles

This model uses `docs/portfolio-brief.md` and `docs/portfolio-audit.md` as the current source of truth. It is a planning document only; it does not implement routes, rename files, change navigation, update assets, or choose a templating tool.

### Selected Work

Selected Work is the primary evidence layer for senior BI, data analytics, BI engineering, analytics engineering, Microsoft Fabric, and automation roles. It should be made of substantial professional or consultancy case studies that show business context, personal contribution, technical approach, controls, deliverables, and results.

Role by audience:

- Hiring managers: fast evidence that the portfolio owner can turn operational ambiguity into trusted decision systems.
- Technical reviewers: enough implementation detail to understand data modelling, workflow, validation, automation, and platform judgement.
- Consulting prospects: credible examples of delivery leadership, requirements translation, and practical decision support.

Selected Work should not become a conventional employment-history section. Employment history remains in the downloadable CV.

### Supporting Projects

Supporting Projects are narrower technical demonstrations, portfolio exercises, analysis notebooks, Power BI examples, SQL/Python work, and automation experiments. They prove skill breadth, learning discipline, and hands-on fluency, but should not receive equal prominence with Selected Work.

Role by audience:

- Hiring managers: secondary proof of technical range.
- Technical reviewers: examples of analytical method, modelling, code, and visualisation.
- Consulting prospects: supporting confidence, especially where work is relevant to automation, BI, or practical analysis.

No supporting project should be deleted during this phase. Visibility should be managed through grouping and hierarchy.

### Technical Notes

Technical Notes are secondary written evidence derived from the current `insights` pages. They should show how the portfolio owner thinks about controls, delivery patterns, SQL reliability, Power Apps capture, documentation, and Fabric migration.

Role by audience:

- Hiring managers: proof of judgement and communication.
- Technical reviewers: evidence of design patterns, risk controls, and operational thinking.
- Consulting prospects: a signal that delivery includes handover, adoption, and maintainability.

Technical Notes should not be a primary navigation item. They should be discoverable from the Work page and from relevant case studies.

### About Content

About content should explain professional positioning, operating style, technical judgement, stakeholder focus, and location. It may borrow useful delivery-thinking content from `approach.html` and limited current professional context from `experience.html`, but it must not recreate a work timeline or duplicate the CV.

### Contact Content

Contact content should separate:

- Career and professional enquiries: personal email route and LinkedIn route from the portfolio brief.
- Consulting and NexAura enquiries: NexAura business email route from the portfolio brief.

The redesigned public website should not display phone or WhatsApp routes. The phone number may remain in the downloadable CV.

### Shared Profile and Site Data

Profile, title, proposition, location, CV path, contact routes, social links, navigation labels, case-study metadata, metrics, route metadata, and SEO metadata should later be centralised so they are not repeated across pages.

### Legacy Compatibility Routes

Existing public URLs should not be broken silently. Legacy pages that are removed from navigation should either remain as compatibility pages, redirect to the most relevant destination, or be explicitly excluded from the sitemap with a documented reason.

## 2. Proposed Future Site Map

| Proposed navigation label | Proposed canonical URL | Page purpose | Primary audience | Main content blocks | Main CTA | Primary nav | Sitemap | Structured metadata | Current source pages |
|---|---|---|---|---|---|---|---|---|---|
| Home | `/` | Concise positioning and route to strongest proof. | Hiring managers, recruiters, technical reviewers. | Hero, proposition, location, metrics strip, capability groups, curated Selected Work, supporting proof, About preview, Contact preview. | View Work; Download CV. | Yes | Yes | Person/ProfilePage, WebSite, selected ItemList. | `index.html`, `projects.html`, brief. |
| Work | `/projects.html` | Complete work hub labelled Work while preserving the existing technical URL unless a later route task approves a new URL. | Hiring managers, technical reviewers, consulting prospects. | Selected Work, Supporting Projects, Technical Notes, simple grouping. | Open a case study; contact. | Yes | Yes | CollectionPage, ItemList. | `projects.html`, all project pages, `insights/`. |
| About | `/about.html` | Positioning and working approach without duplicating CV history. | Hiring managers, recruiters, consulting prospects. | Professional positioning, approach to ambiguous data problems, delivery principles, technical judgement, current context, location, CV link. | Download CV; contact. | Yes | Yes | AboutPage/ProfilePage. | `approach.html`, limited `experience.html`, `index.html`. |
| Contact | `/contact.html` | Separate career/professional and consulting routes. | Recruiters, hiring managers, consulting prospects. | Career/professional route, LinkedIn route, consulting route, privacy/spam note. | Send the correct enquiry; view LinkedIn. | Yes | Yes | ContactPage, Person. | `index.html#connect`, brief. |
| Download CV | `/assets/cv/Arsalan-Iftikhar-CV.pdf` initially, pending CV replacement/review | Canonical downloadable employment-history document. | Recruiters, hiring managers. | PDF download only; link text should clarify the latest BI/Data Analytics CV once the final asset is supplied. | Download CV. | Yes as action | Yes when the final CV asset is public | MediaObject if supported later. | `assets/cv/Arsalan-Iftikhar-CV.pdf`, brief. |
| Selected Work case study | `/projects/[case-study-slug]-case-study.html` or preserved existing project URL | Detailed professional evidence page. | Hiring managers, technical reviewers. | Problem, role, contribution boundary, solution, architecture/workflow, controls, deliverables, results, evidence assets, limitations, related notes. | Contact; return to Work. | No | Yes when publishable | Article/CreativeWork/Project as appropriate. | Existing case-study pages and owner input. |
| Supporting Project | Existing `/projects/[current-file].html` URLs unless later changed | Technical demonstration page. | Technical reviewers, interested hiring managers. | Question, dataset/scope, method, skills, output, limitations, next step. | Back to Work; related Selected Work. | No | Yes if public quality is sufficient | Article/CreativeWork. | Existing supporting project pages. |
| Technical Notes hub | `/insights/` | Secondary technical writing index labelled Technical Notes. | Technical reviewers, consulting prospects. | Note cards grouped by topic and related case study. | Read note; return to Work. | No | Yes if retained as public hub | CollectionPage, ItemList. | `insights/index.html`. |
| Technical Note | Existing `/insights/[slug].html` URLs | Short technical evidence article. | Technical reviewers. | Topic, problem avoided, pattern, application, related case studies. | Related Work; contact. | No | Yes if public | Article. | Existing insight pages. |
| 404 | `/404.html` | Friendly recovery page for unknown URLs. | All visitors. | Clear page-not-found message, Home and Work links. | Go to Work; go Home. | No | No | None required. | `404.html`. |
| Legacy Experience compatibility | `/experience.html` | Avoid broken incoming links after retiring Experience content. | Visitors with old links. | Short compatibility message or redirect target. No timeline. | About; Download CV; Work. | No | No, unless retained as compatibility page with canonical to destination | Canonical/noindex decision later. | `experience.html`. |
| Legacy Approach compatibility | `/approach.html` | Avoid broken incoming links after consolidating Approach content. | Visitors with old links. | Short compatibility message or redirect target. | About; relevant Work. | No | No, unless retained as compatibility page with canonical to destination | Canonical/noindex decision later. | `approach.html`. |

## 3. Current-to-Future Route Matrix

| Current file path | Current public URL | Current purpose | Future classification | Future canonical destination | Action | Reason | Content to preserve | Content to omit | Dependencies or open questions | Link-risk implications |
|---|---|---|---|---|---|---|---|---|---|---|
| `index.html` | `/` and `/index.html` | Portfolio homepage with hero, metrics, capability cards, projects, NexAura cards, contact. | Home. | `/` | Rewrite | Current page has useful proof but outdated title and contact model. | Name, useful metrics to confirm before drafting, capability themes, featured proof, CV CTA. | Old title wording, public phone/WhatsApp, duplicated project copy, `Projects` label in nav. | Final metric wording and latest CV asset. | Canonicalise `/index.html` to `/` later; do not break direct `index.html` links. |
| `projects.html` | `/projects.html` | Project hub split into primary operational BI, supporting projects, AI/automation. | Work hub. | `/projects.html` with navigation label `Work`. | Rewrite | Existing URL has value and already groups work. | Grouping pattern, project index, evidence hierarchy. | Equal prominence for all items, old `Projects` nav label. | Route-model decision if a future `/work/` URL is desired. | Low risk if URL preserved; update labels and sitemap later. |
| `approach.html` | `/approach.html` | Delivery approach and BI/automation process page. | About/case-study source plus legacy compatibility. | `/about.html` and relevant case studies. | Consolidate; redirect or compatibility page | Future nav has no Approach item, but content is useful. | Discovery, KPI/data definition, modelling, validation, adoption, handover principles. | Standalone primary nav item. | Whether compatibility page or redirect is preferred. | Medium risk because current nav and sitemap expose it. |
| `experience.html` | `/experience.html` | Conventional employment timeline. | Retired content plus legacy compatibility. | `/about.html`, `/projects.html`, and CV PDF as employment source. | Redirect or compatibility page | Future strategy explicitly excludes a dedicated Experience section. | Brief current professional context and evidence that can support case studies. | Timeline, duplicated CV work history. | Compatibility behaviour and noindex/canonical choice. | Medium risk if old links exist; do not silently 404. |
| `404.html` | `/404.html` | Not-found page. | Utility page. | `/404.html` | Preserve with later content/design refresh | Required for GitHub Pages. | Recovery links. | None identified. | Needs future nav label updates if reused. | Low. |
| `projects/fabric-modernisation-case-study.html` | `/projects/fabric-modernisation-case-study.html` | GXO Fabric Modernisation case study. | Selected Work: Operational BI and performance reporting. | Preserve current URL unless a later redirect plan approves a new slug. | Rewrite | Strong operational BI evidence, but future title should align with business-value positioning and contribution boundaries. | Business problem, validation controls, semantic/reporting trust, result wording to confirm. | Employer-specific overemphasis if it distracts from evidence; unsupported claims. | Final public wording, metrics, screenshots/diagrams. | Keep current URL or redirect carefully because it is in sitemap. |
| `projects/fabric-timecard-pipeline-case-study.html` | `/projects/fabric-timecard-pipeline-case-study.html` | Fabric Timecard Ingestion and Shift Reconstruction Pipeline. | Selected Work: Microsoft Fabric workforce-data pipeline. | Preserve current URL initially; future slug may be `fabric-workforce-data-pipeline-case-study.html`. | Rewrite | Closely matches confirmed Selected Work item. | API ingestion, shift reconstruction, Delta upsert, role, reporting value. | Any confidential source/system details. | Final metric/result wording and public architecture detail. | Existing URL is in sitemap; preserve or redirect. |
| `projects/floor-walk-powerapp-case-study.html` | `/projects/floor-walk-powerapp-case-study.html` | Floor Walk Digitisation with Power Apps and Power BI. | Selected Work: Inventory-check process digitisation. | Preserve current URL initially. | Rewrite | Strong fit for data capture, process digitisation and BI-ready reporting. | Problem, Power Apps/Power BI flow, governance controls, `4-8 staff hours/day saved` wording to confirm. | Internal operational details not suitable for public use. | Metric source note and sanitised screenshots. | Existing URL is in sitemap; preserve or redirect. |
| `projects/self-service-kiosk-case-study.html` | `/projects/self-service-kiosk-case-study.html` | Self-Service Kiosk for frontline performance and downtime capture. | Selected Work: Employee self-service reporting kiosk. | Preserve current URL. | Rewrite | Strong evidence assets and adoption signal. | Kiosk workflow, downtime capture, report views wording to confirm, screenshots after redaction check. | Operational details not suitable for public use. | Confirm public suitability of kiosk screenshots and adoption metric wording. | Existing URL is in sitemap; preserve. |
| `projects/ai-qa-coaching-case-study.html` | `/projects/ai-qa-coaching-case-study.html` | AI QA and coaching call-centre case study. | Selected Work: Multilingual quality-assurance product. | Future destination may preserve current URL or move to `multilingual-quality-assurance-product-case-study.html` with redirect. | Investigate; rewrite | Confirmed Selected Work item differs in wording and likely scope. | Requirements translation, scoring/rubric logic, QA workflow, product-delivery evidence. | Any implication of completed product or sole authorship unless agreed in final wording. | Exact public wording for NexAura/confidential work, contribution boundary, screenshots. | Existing URL not in sitemap but may be linked internally; preserve or redirect. |
| `projects/warehouse-assignment-similarity-analysis.html` | `/projects/warehouse-assignment-similarity-analysis.html` | Python EDA case study using Jaccard similarity. | Supporting Project. | Preserve current URL. | Retain as supporting content | Confirmed as initially surfaced supporting project. | Business question, method, implementation excerpts, limitations. | Homepage-level prominence unless later chosen. | Optional asset/visual improvements. | Existing URL in sitemap; preserve. |
| `projects/sales_analysis_case_study.html` | `/projects/sales_analysis_case_study.html` | Sales Analytics Dashboard / BI fundamentals case study. | Supporting Project. | Preserve current URL unless a future slug cleanup is chosen with redirect. | Retain as supporting content | Confirmed as initially surfaced supporting project. | Star schema, DAX organisation, Power Query, dashboard preview, PDF if useful. | Unsupported business-impact claims. | Confirm whether downloadable dashboard PDF adds value. | Not in sitemap; adding later improves discoverability. |
| `projects/football_analysis_case_study.html` | `/projects/football_analysis_case_study.html` | Premier League 21/22 Python shooting-data analysis. | Supporting Project. | Preserve current URL unless a later slug cleanup is chosen. | Retain as supporting content | Confirmed as initially surfaced supporting project. | Cleaning, EDA, charts, xG analysis, limitations. | Homepage-level prominence. | Known mobile overflow and heading issues to fix in implementation phase. | Not in sitemap; preserve for existing links. |
| `projects/house_prices_case_study.html` | `/projects/house_prices_case_study.html` | House Price Prediction regression project. | Supporting Project. | Preserve current URL unless a later slug cleanup is chosen. | Retain as supporting content | Confirmed as initially surfaced supporting project. | Modelling comparison, cleaning, limitations. | Overstated business relevance. | Heading/accessibility refresh and asset quality review. | Not in sitemap; preserve for existing links. |
| `projects/n8n_email_routing_case_study.html` | `/projects/n8n_email_routing_case_study.html` | AI-powered email-routing workflow. | Supporting Project. | Preserve current URL unless a later slug cleanup is chosen. | Retain as supporting content | Confirmed as initially surfaced supporting project. | Workflow automation concept, n8n diagram, business challenge. | Any production/client implication unless agreed for final wording. | Clarify prototype versus deployed system and AI service details. | Not in sitemap; preserve. |
| `projects/smart_device_analysis_case_study.html` | `/projects/smart_device_analysis_case_study.html` | Smart-device usage analysis / Bellabeat case study. | Supporting Project, secondary. | Preserve current URL but remove from prominent surfaces initially. | Retain but secondary; investigate | Brief confirms it should not be prominently surfaced unless strengthened. | SQL/data-cleaning and recommendation examples if refreshed. | Prominent listing if weaker than other support projects. | Strengthen narrative or decide archival visibility. | Not in sitemap; keep available unless later redirected. |
| `insights/index.html` | `/insights/` | Insights index. | Technical Notes hub. | `/insights/` | Retain as Technical Note hub | Existing route can support future secondary discovery without becoming primary nav. | Grouped article links. | Primary navigation label `Insights`. | Decide whether to keep URL `/insights/` or add `/technical-notes/` alias later. | Preserve to avoid breaking note links. |
| `insights/fabric-migration-notes.html` | `/insights/fabric-migration-notes.html` | Fabric migration delivery notes. | Technical Note. | Preserve current URL. | Retain as Technical Note; refresh | Relevant to Fabric workforce-data and operational BI case studies. | Controls, migration sequence, trust-preservation themes. | Standalone primary nav treatment. | Update cross-links after case studies are modelled. | Not in sitemap currently; add later if retained. |
| `insights/power-apps-notes.html` | `/insights/power-apps-notes.html` | Power Apps capture notes for BI-ready reporting. | Technical Note. | Preserve current URL. | Retain as Technical Note; refresh | Relevant to inventory-check digitisation and kiosk work. | Capture controls, governance, reporting readiness. | Standalone primary nav treatment. | Link to relevant case studies later. | Not in sitemap currently; add later if retained. |
| `insights/documentation-visibility.html` | `/insights/documentation-visibility.html` | Documentation and visibility controls. | Technical Note. | Preserve current URL. | Retain as Technical Note; refresh | Supports delivery and maintainability positioning. | Minimum artefacts, visibility controls, handover logic. | Any generic filler that duplicates About. | Link from About and relevant case studies. | Not in sitemap currently; add later if retained. |
| `insights/advanced-sql-patterns.html` | `/insights/advanced-sql-patterns.html` | SQL reliability patterns. | Technical Note. | Preserve current URL. | Retain as Technical Note; refresh | Supports BI engineering and analytics-engineering roles. | Lifecycle chaining, validation rules, latest-event logic. | Uncontextualised code if not tied to real work. | Link to Fabric/workforce and operational BI work. | Not in sitemap currently; add later if retained. |

## 4. Selected Work Register

### 4.1 Microsoft Fabric Workforce-Data Pipeline

- Working title: Microsoft Fabric Workforce-Data Pipeline.
- Recommended slug: `fabric-workforce-data-pipeline`.
- Current corresponding page or pages: `projects/fabric-timecard-pipeline-case-study.html`; related `insights/fabric-migration-notes.html` and `insights/advanced-sql-patterns.html`.
- Dedicated page already exists: Yes, under the current Fabric Timecard Pipeline title.
- Primary capability category: Data engineering and automation.
- Secondary capability categories: Business intelligence and analytics; Microsoft Fabric; data quality controls.
- Target roles supported: BI Developer / BI Engineer; Analytics Engineer; Microsoft Fabric Data Engineer; Senior BI Analyst.
- Business problem: Workforce/timecard data needed ingestion, shift reconstruction, and reporting-ready outputs.
- Intended evidence: API ingestion pattern, transformation logic, idempotent loading, Delta merge/upsert, validation controls, reporting value.
- Known technologies: Microsoft Fabric, PySpark, Delta-style merge/upsert, API ingestion, semantic/reporting outputs as described by the current page.
- Known contribution: Current page describes technical delivery and role; exact boundary should be revalidated before final copy.
- Required contribution boundary: State what was personally built versus designed, reviewed, coordinated, or delivered within a wider workstream.
- Known result or metric: Current page includes a results/impact section; exact wording and figures need confirmation before drafting.
- Metric or wording to confirm before drafting: Result figures, impact scope, and public phrasing.
- Available assets: `assets/Fabric Pipeline.PNG`; `assets/PySpark.PNG`.
- Missing assets: Sanitised architecture diagram, before/after workflow, evidence of validation controls if public.
- Confidentiality considerations: Internal source-system names, workforce data structure, and operational details may require redaction.
- Recommended homepage eligibility: High once metric wording and confidentiality-sensitive detail are settled.
- Exact owner questions still required: Which metric wording is final? Which source/system details must be anonymised? Was the owner sole builder, lead implementer, or contributor within a wider delivery? Which diagrams/screenshots can be public?

### 4.2 Operational BI and Performance Reporting

- Working title: Operational BI and Performance Reporting.
- Recommended slug: `operational-bi-performance-reporting`.
- Current corresponding page or pages: `projects/fabric-modernisation-case-study.html`, `index.html`, limited evidence from `experience.html`.
- Dedicated page already exists: Partially; the current page is framed as GXO Fabric Modernisation rather than the confirmed Selected Work item.
- Primary capability category: Business intelligence and analytics.
- Secondary capability categories: Data engineering; semantic modelling; reporting automation; stakeholder delivery.
- Target roles supported: Senior Data Analyst / Senior BI Analyst; BI Developer / BI Engineer; Analytics Engineer.
- Business problem: Operational reporting needed trusted, governed, repeatable decision support across recurring reports and modernised BI assets.
- Intended evidence: Report estate, semantic model/control logic, recurring report automation, adoption or usage signals, decision outcomes.
- Known technologies: Power BI/Fabric-oriented BI stack is evidenced in current pages; exact tooling by workstream needs owner confirmation.
- Known contribution: Current case-study content describes ownership of Fabric modernisation elements and validation controls.
- Required contribution boundary: Separate direct ownership, contribution to wider modernisation, and stakeholder/adoption responsibilities.
- Known result or metric: Homepage reports `10+ recurring reports automated`; current case study includes impact claims; exact scope needs confirmation before drafting.
- Metric or wording to confirm before drafting: Recurring-report count, scope, source note, and whether it represents personal or team delivery.
- Available assets: Fabric screenshots/assets listed above; profile/project content; no dedicated operational reporting dashboard asset confirmed.
- Missing assets: Sanitised dashboard/report screenshots, metric source notes, before/after reporting process diagram.
- Confidentiality considerations: Employer reporting, operational KPIs, and dashboard screenshots may require redaction or synthetic recreation.
- Recommended homepage eligibility: High, but only if the narrative can be sharpened without duplicating employment history.
- Exact owner questions still required: Which reports/processes can be described publicly? What is the final wording for `10+ recurring reports automated` and any adoption metrics? What screenshots or diagrams can be public? Should current employer/client names be named, anonymised, or omitted?

### 4.3 Inventory-Check Process Digitisation

- Working title: Inventory-Check Process Digitisation.
- Recommended slug: `inventory-check-process-digitisation`.
- Current corresponding page or pages: `projects/floor-walk-powerapp-case-study.html`; related `insights/power-apps-notes.html`.
- Dedicated page already exists: Yes, under the current Floor Walk Digitisation title.
- Primary capability category: Business intelligence and analytics.
- Secondary capability categories: Power Platform automation; data capture governance; process digitisation.
- Target roles supported: Senior BI Analyst; BI Developer / BI Engineer; AI and Automation Engineer.
- Business problem: Manual or inconsistent inventory/floor-walk capture created friction, duplicated handling, and unreliable reporting inputs.
- Intended evidence: Original friction, Power Apps capture, Power Automate/process flow if applicable, Power BI/reporting-ready structure, governance controls.
- Known technologies: Power Apps, Power BI, Power Query and controlled capture fields as described by the current page.
- Known contribution: Current page describes role/ownership and governance/reporting controls.
- Required contribution boundary: Identify what was built personally and what was configured, coordinated, or handed over.
- Known result or metric: Current/homepage evidence includes `4-8 staff hours/day saved`; the metric wording, source note, and scope need confirmation before drafting.
- Metric or wording to confirm before drafting: Staff-hours saving, baseline, calculation basis, and public phrasing.
- Available assets: `assets/PA Flow - Notification.jpeg` appears relevant but was not confirmed as referenced; no public floor-walk screenshots confirmed.
- Missing assets: Sanitised app screenshots, process diagram, before/after effort evidence, public metric source.
- Confidentiality considerations: Operational location/process details may require anonymisation.
- Recommended homepage eligibility: High once the metric wording and screenshot/redaction plan are settled.
- Exact owner questions still required: What is the final public wording for the `4-8 staff hours/day` saving? Which screenshots can be shown? What process names or operational terms must be anonymised?

### 4.4 NexAura Healthcare Management System

- Working title: NexAura Healthcare Management System.
- Recommended slug: `nexaura-healthcare-management-system`.
- Current corresponding page or pages: Homepage NexAura summary only; no dedicated page found.
- Dedicated page already exists: No.
- Primary capability category: Applied AI, cloud delivery and technical leadership.
- Secondary capability categories: Delivery leadership; Azure platform setup; security and governance; technical architecture.
- Target roles supported: AI and Automation Engineer; Analytics Engineer; Microsoft Fabric/Data Engineer adjacent platform roles; senior technical leadership evidence for BI roles.
- Business problem: NexAura needed MVP translation, delivery coordination, secure multi-environment Azure setup, and architectural decisions for a healthcare management product.
- Intended evidence: Strategy/architecture guidance, MVP translation, delivery management using Trello/GitHub/Google Drive, junior contributor coordination, database/tenant/RBAC/security reviews, Azure dev/staging/production setup, GitHub Actions/OIDC/RBAC/Key Vault/approval controls.
- Known technologies: Azure, GitHub Actions, OIDC, RBAC, Key Vault, Trello, GitHub, Google Drive, database schema and tenant/security design concepts from the confirmed strategy.
- Known contribution: Technical and delivery leadership; not sole application development.
- Required contribution boundary: Must state guidance, coordination, review, platform setup, and delivery leadership without implying the owner personally developed the entire application.
- Known result or metric: No agreed public result or metric is present in the current repository.
- Metric or wording to confirm before drafting: Whether any outcome, delivery milestone, or MVP lifecycle wording can be described publicly.
- Available assets: No dedicated public asset confirmed.
- Missing assets: Sanitised architecture diagram, environment diagram, delivery artefact examples, screenshots if permissible.
- Confidentiality considerations: Healthcare domain, tenant/security design, RBAC, Key Vault, and in-progress product details may require reduced-detail public version.
- Recommended homepage eligibility: Medium initially; strong leadership evidence, but it should wait until wording and confidentiality constraints are settled.
- Exact owner questions still required: What is the final public wording? Which architecture/security details are safe? Can the product name/client context be public? Which artefacts can be shown or recreated as sanitised diagrams?

### 4.5 Multilingual Quality-Assurance Product

- Working title: Multilingual Quality-Assurance Product.
- Recommended slug: `multilingual-quality-assurance-product`.
- Current corresponding page or pages: `projects/ai-qa-coaching-case-study.html`; homepage AI QA and call-centre coaching card.
- Dedicated page already exists: Partially, but title and scope need alignment with confirmed Selected Work.
- Primary capability category: Applied AI, cloud delivery and technical leadership.
- Secondary capability categories: BI/analytics, QA scoring, workflow design, product delivery.
- Target roles supported: AI and Automation Engineer; Senior Data Analyst / Senior BI Analyst; BI Developer / BI Engineer.
- Business problem: QA and coaching workflows needed structured evaluation, scoring, and multilingual productised support.
- Intended evidence: Requirements translation, rubric/KPI definitions, transcription or multilingual workflow, scoring logic, reporting/dashboard outputs, stakeholder review.
- Known technologies: Current page references transcription, KPI/scoring logic, dashboard outputs, and product-delivery framing; exact stack requires confirmation.
- Known contribution: Current page suggests requirements translation and KPI definitions; exact role needs owner confirmation.
- Required contribution boundary: State whether the owner led product definition, designed workflow/scoring logic, built components, coordinated contributors, or reviewed outputs.
- Known result or metric: No agreed public metric found in current source material.
- Metric or wording to confirm before drafting: Product maturity, languages in scope, QA/scoring outcomes, and any public result wording.
- Available assets: No dedicated visual asset confirmed.
- Missing assets: Sanitised workflow diagram, sample scorecard/rubric, multilingual flow evidence, screenshots.
- Confidentiality considerations: Client/product details, call transcripts, QA scoring criteria, and in-progress wording may require redaction or synthetic examples.
- Recommended homepage eligibility: Medium/low until the case-study wording and supporting assets are settled.
- Exact owner questions still required: What is the exact public product wording? What languages are in scope? Which parts were personally built or led? Can sample artefacts be synthetic?

### 4.6 Employee Self-Service Reporting Kiosk

- Working title: Employee Self-Service Reporting Kiosk.
- Recommended slug: `employee-self-service-reporting-kiosk`.
- Current corresponding page or pages: `projects/self-service-kiosk-case-study.html`; homepage featured project.
- Dedicated page already exists: Yes.
- Primary capability category: Business intelligence and analytics.
- Secondary capability categories: Process digitisation; adoption; reporting automation; data capture.
- Target roles supported: Senior BI Analyst; BI Developer / BI Engineer; AI and Automation Engineer.
- Business problem: Frontline employees needed self-service access to performance and downtime capture/reporting.
- Intended evidence: Kiosk workflow, downtime capture, adoption signal, reporting outputs, screenshots.
- Known technologies: Current page references kiosk delivery, frontend/reporting workflow, and evidence screenshots; exact stack requires confirmation if not already stated.
- Known contribution: Current page describes the owner's role; exact boundaries should be settled before drafting.
- Required contribution boundary: Clarify what was designed, built, deployed, supported, or adopted by users.
- Known result or metric: Homepage/current page references approximately `c.200 report views/day`; the metric wording, source note, and timeframe need confirmation before drafting.
- Metric or wording to confirm before drafting: Report views/day, timeframe, measurement source, and whether approximate wording should remain.
- Available assets: `assets/Kiosk - home.jpeg`; `assets/kiosk - edit downtime.jpeg`; `assets/kiosk - new downtime.jpeg`.
- Missing assets: Redaction confirmation, optimised screenshots, diagram of capture-to-reporting workflow, metric evidence.
- Confidentiality considerations: Screenshots may expose operational labels or internal data; needs redaction review.
- Recommended homepage eligibility: High once screenshot use and metric wording are settled.
- Exact owner questions still required: What is the final wording for the `c.200 report views/day` metric? Can kiosk screenshots remain public? Should unreferenced kiosk screenshots be used, replaced, or retained privately?

## 5. Supporting Projects Register

| Current title | Current route | Future title | Category | Skills demonstrated | Current source material | Future visibility | Migrate current page | Missing content or assets | Known responsive/accessibility issues | Asset dependencies |
|---|---|---|---|---|---|---|---|---|---|---|
| Warehouse Assignment Similarity Analysis | `/projects/warehouse-assignment-similarity-analysis.html` | Keep current title | Python exploratory analysis | EDA, set comparison, Jaccard similarity, operational question framing, limitations | Current page includes code excerpts, method, findings, and limitations. | Surface | Yes | Stronger visual summary and public dataset note if needed | No major issue identified in audit | No dedicated image asset confirmed |
| House Price Prediction | `/projects/house_prices_case_study.html` | House-Price Prediction and Machine-Learning Comparison | Machine-learning model comparison | Cleaning, feature handling, regression modelling, evaluation | Current page has useful modelling content but older page style. | Surface | Yes | Stronger model comparison table, dataset source, limitations | Lacks `h1` in audit; older Tailwind page | `projects/house_prices/housebanner.png` |
| Premier League 21/22 Shooting Data Analysis | `/projects/football_analysis_case_study.html` | Football Python Analysis | Python exploratory analysis | Data cleaning, visual EDA, xG interpretation, chart explanation | Current page includes useful charts but older page style. | Surface | Yes | Dataset source clarity, stronger summary, responsive chart handling | Lacks `h1`; horizontal overflow at small widths in audit | Football chart PNGs and `projects/football/epl.webp` |
| AI-Powered Email Routing Workflow | `/projects/n8n_email_routing_case_study.html` | n8n Email-Routing Automation | Workflow automation | n8n workflow design, triage logic, automation concept, business challenge framing | Current page and workflow image are useful but deployment/prototype wording needs clarification. | Surface | Yes | State whether prototype, demo, or deployed workflow; clarify AI/provider details | Lacks `h1` in audit; older Tailwind page | `projects/n8n/n8n_workflow.png` |
| Sales Analytics Dashboard | `/projects/sales_analysis_case_study.html` | Keep current title | Power BI and sales analysis | Star schema, Power Query, DAX organisation, dashboard design, PDF artefact | Current page has strong supporting BI content and dashboard/model assets. | Surface | Yes | Confirm PDF value and whether data is sample/synthetic | No major issue identified beyond older mixed styling | Dashboard/model/measure images and `sales_dashboard.pdf` |
| Smart Device Usage Analysis | `/projects/smart_device_analysis_case_study.html` | Smart-Device Usage Analysis | Data-cleaning and SQL analysis | SQL, exploratory analysis, recommendations, limitations | Current page exists but needs narrative strengthening before prominent surfacing. | Retain but secondary; investigate | Yes, if refreshed | Stronger analytical question, dataset/source clarity, tighter recommendations | Lacks `h1` in audit; older Tailwind page | Smart-device chart PNGs and `wristband.webp` |

Unlinked or orphaned supporting content found in the audit/inventory:

- Placeholder files exist in `projects/`, `projects/football/`, `projects/house_prices/`, `projects/n8n/`, `projects/sales_analysis/`, and `projects/smart_device/`. These are not public routes, should not be deleted in this task, and can be reviewed during a later repository hygiene task.
- Some supporting project assets are not currently referenced by pages, including `projects/sales_analysis/sales_analysis_project_image.webp`, `projects/football/epl.webp`, and `projects/football/figure_shots_goals.png`; future use should be decided during content migration.

## 6. Technical Notes Register

| Current title | Current route | Subject | Relevant Selected Work connection | Relevant target-role connection | Recommendation | Future discovery route | Link from case study, Work page, or both |
|---|---|---|---|---|---|---|---|
| Insights | `/insights/` | Current insight index | All Selected Work as secondary evidence | All target roles as technical writing proof | Preserve as Technical Notes hub; relabel | Work page secondary section and direct `/insights/` URL | Work page |
| Fabric Migration Notes | `/insights/fabric-migration-notes.html` | Controls that protect reporting trust during Fabric migration | Fabric workforce-data pipeline; operational BI and performance reporting | BI Engineer, Analytics Engineer, Fabric Data Engineer | Refresh | Technical Notes section under Work | Both |
| Power Apps Delivery Notes | `/insights/power-apps-notes.html` | Governed operational capture for BI-ready reporting | Inventory-check digitisation; self-service kiosk | Senior BI Analyst, BI Developer, AI/Automation Engineer | Refresh | Technical Notes section under Work | Both |
| Documentation & Visibility Notes | `/insights/documentation-visibility.html` | Delivery artefacts, handover, supportability | All Selected Work; especially HMS delivery leadership | Senior BI Analyst, BI Engineer, Analytics Engineer | Refresh | Technical Notes section under Work | Both |
| Advanced SQL Patterns | `/insights/advanced-sql-patterns.html` | SQL reliability patterns for operational analytics | Fabric workforce-data pipeline; operational BI | BI Engineer, Analytics Engineer, Fabric Data Engineer | Refresh | Technical Notes section under Work | Both |

## 7. Homepage Content Model

The homepage should be a focused evidence gateway, not a full CV or full project archive.

Hero fields:

- Name.
- Principal title: `Senior BI & Data Analyst`.
- Core proposition: `Turning complex operational data into trusted decision systems using business intelligence, data engineering and automation.`
- Location: `West Yorkshire, UK · Open to relocation`.
- Short role-alignment line.
- Primary CTA: View Work.
- Secondary CTA: Download CV.

Credibility or metrics strip:

- 3-4 agreed metrics only.
- Each metric must have a clear value, unit, scope, time period where relevant, attribution, and source note where useful.
- Candidate metrics from current content include recurring reports automated, staff-hours saved, report views/day, and junior contributor coordination, but any metric still being discussed should remain in planning notes until final wording is agreed.

Capability-group model:

- Group 1: Business intelligence and analytics.
- Group 2: Data engineering and automation.
- Group 3: Applied AI, cloud delivery and technical leadership.

Selected Work subset:

Recommended provisional homepage subset of four:

1. Microsoft Fabric workforce-data pipeline.
2. Operational BI and performance reporting.
3. Inventory-check process digitisation.
4. Employee self-service reporting kiosk.

Reasoning: these four most directly support the BI-led positioning, align to the highest-priority target roles, have the strongest current repository source material, and show breadth across data pipelines, trusted reporting, process digitisation, and frontline adoption. NexAura Healthcare Management System and Multilingual Quality-Assurance Product should remain on the Work page initially and become homepage candidates after confidentiality considerations, contribution boundaries, and supporting assets are settled.

Supporting proof:

- Small secondary section or Work-page teaser for surfaced Supporting Projects.
- Avoid equal visual weight with Selected Work.

About preview:

- Short summary of operating style and judgement.
- Link to About rather than reproducing a career timeline.

Contact preview:

- Separate career/professional and consulting contact intents.
- No public phone or WhatsApp.

Footer information:

- Name, title, location, CV link, LinkedIn, primary Work/About/Contact links.
- Copyright year.
- Optional Technical Notes link as secondary footer link.

## 8. Work Page Content Model

### Selected Work Section

Purpose: primary evidence for hiring and consulting evaluation.

Card fields:

- Title.
- Classification: Selected Work.
- Capability category.
- Short outcome/problem summary.
- Role/contribution label.
- Key technologies.
- Agreed metric where appropriate.
- Public lifecycle wording such as `In progress` only where genuinely relevant.
- Link to case study.

### Supporting Projects Section

Purpose: secondary technical breadth.

Card fields:

- Title.
- Category.
- Skills demonstrated.
- One-line analytical question or build objective.
- Content type or output format: notebook-style analysis, dashboard, automation workflow, PDF, screenshots.
- Link to project.

### Technical Notes Section

Purpose: secondary written proof.

Card fields:

- Note title.
- Subject.
- Related case study or capability.
- Short reason to read.
- Link to note.

### Filtering or Grouping Requirements

The item count does not currently justify complex faceted filtering. A simple grouping model is enough:

- Selected Work.
- Supporting Projects.
- Technical Notes.

Optional lightweight filters may later be useful by capability group, such as BI, Fabric, Power Platform, Python, SQL, AI/Automation. These should not obscure the primary hierarchy.

### Tagging Requirements

Use consistent tags for:

- Capability: BI, Data Engineering, Automation, AI, Power Platform, Microsoft Fabric, SQL, Python, Power BI.
- Content type: Selected Work, Supporting Project, Technical Note.
- Target role: Senior BI Analyst, BI Engineer, Analytics Engineer, Fabric Data Engineer, AI/Automation Engineer.

### Empty or Unavailable Evidence Behaviour

- Do not show empty placeholder cards.
- If a case study lacks public assets, use a clear text-based summary or keep the asset gap in planning notes.
- Do not invent metrics or diagrams.

### Confidential Work Behaviour

- Use anonymised or reduced-detail wording when public details should not be exposed.
- Prefer architecture patterns and contribution boundaries over sensitive source names.
- Use synthetic examples only when explicitly labelled as synthetic.

### In-Progress Work Behaviour

- Label as `In progress` or `MVP delivery` only when accurate.
- Avoid final-result language until outcomes are confirmed.

## 9. About Page Content Model

The About page should explain judgement and working style without becoming an Experience page.

Recommended content blocks:

- Professional positioning: Senior BI & Data Analyst focused on trusted decision systems.
- How ambiguous data problems are approached: discovery, KPI definition, data grain, validation, stakeholder use.
- Balance of analysis, engineering and delivery: BI first, then data engineering/automation, then applied AI/cloud leadership.
- Working principles: trust, maintainability, adoption, documentation, handover, pragmatic automation.
- Current professional context: brief and non-timeline-based.
- Technical judgement: source-to-semantic validation, governance, controls, operational fit.
- Stakeholder and adoption focus: users, decision cadence, handover, support.
- Location and relocation: `West Yorkshire, UK · Open to relocation`.
- Link to CV as canonical employment history.

Current content that may be consolidated here:

- From `approach.html`: discovery and framing; KPI/workflow/data definition; data modelling and capture design; validation and controls; adoption/usability/performance review; release/handover/iteration.
- From `experience.html`: brief current context and role positioning only. Do not reproduce the timeline, job list, dates, or CV-style responsibilities.

## 10. Contact Page Content Model

The Contact page should route enquiries by intent.

| Contact route | Label | Email route | LinkedIn route | Supporting explanation | CTA | Spam and privacy considerations |
|---|---|---|---|---|---|---|
| Career and professional enquiries | Career and professional enquiries | Personal career email recorded in the portfolio brief | LinkedIn profile recorded in current site/brief | Use for roles, interviews, technical conversations, and professional networking. | Email me; connect on LinkedIn. | Consider mailto obfuscation or a contact form only if it does not add maintenance burden. |
| Consulting and NexAura enquiries | Consulting and NexAura enquiries | NexAura business email recorded in the portfolio brief | LinkedIn optional if owner approves | Use for relevant BI, automation, data-product, and NexAura-related consulting enquiries. | Contact NexAura. | Avoid exposing unnecessary personal details. |

Excluded public routes:

- Phone.
- WhatsApp.
- Any contact channel that has not been agreed for public use.

## 11. Shared Data Model

This is tool-agnostic. It defines what should be centralised later, not how it should be stored.

### Site Metadata

Fields: site name, base URL, default title, title template, default description, language, locale, default social image, author name, copyright year.

### Profile

Fields: full name, principal title, short title, location, relocation wording, one-line proposition, longer positioning summary, profile image path, alt-text subject.

### Positioning

Fields: purpose, primary audience, secondary audience, target-role hierarchy, capability hierarchy, core proposition, excluded positioning.

### Navigation

Fields: label, URL, primary/secondary/footer placement, CTA flag, external/download flag, active-route matching rule.

### Contact Methods

Fields: intent, label, contact type, address or URL reference, public display rule, priority, privacy/spam note.

### CV

Fields: canonical CV label, file path, version/date, download filename, display in nav flag, public link text.

### Social Links

Fields: platform, URL, label, icon, external-link behaviour, public/private visibility.

### Metrics

Fields: metric ID, value, unit, display wording, scope, time period, attribution, source note where useful, review date, related case study.

### Capabilities

Fields: ID, label, hierarchy level, summary, related technologies, related target roles, evidence items.

### Selected Work

Fields: ID, title, slug, summary, featured placement, capability categories, target roles, problem, role, contribution boundary, technologies, metrics, assets, related notes, public caveat text where genuinely needed, SEO fields, last reviewed date.

### Supporting Projects

Fields: ID, title, slug/current URL, category, visibility, skills, summary, technologies, assets, limitations, migration note, related Selected Work, SEO fields, last reviewed date.

### Technical Notes

Fields: ID, title, slug/current URL, subject, summary, related capability, related case study, recommendation, discovery route, SEO fields, last reviewed date.

### Route Metadata

Fields: current file, current URL, future URL, canonical URL, classification, sitemap inclusion, redirect/compatibility action, noindex flag, structured metadata type, source page links.

### SEO Metadata

Fields: SEO title, meta description, canonical URL, Open Graph title/description/image, Twitter metadata, structured data type, sitemap priority/change frequency if used.

### Legacy Routes

Fields: old URL, destination URL, action type, reason, preserve content summary, omit content summary, noindex/canonical rule, link-risk level.

## 12. Asset Register

| File path | File type | Approximate size or dimensions | Current page usage | Future related content | Content value | Practical publication note | Future action | Required alt-text subject | Known performance concern |
|---|---|---|---|---|---|---|---|---|---|
| `assets/profile.jpeg` | JPEG | 404 KB; 1536x1024 | Homepage profile image | Home/About | Personal credibility | Use if the current photo is chosen for the redesigned site. | Optimise | Professional portrait of Arsalan Iftikhar | Could be resized/compressed |
| `assets/analytics-abstract.webp` | WebP | 9.8 KB | No confirmed usage in audit | Possible background/visual motif | Decorative only | Decide whether it supports the future visual direction. | Investigate | Abstract analytics visual | None known |
| `assets/Fabric Pipeline.PNG` | PNG | 20 KB; 930x286 | Fabric/timecard evidence | Fabric workforce-data pipeline | Strong case-study support | Needs redaction and code/detail review before use. | Preserve/optimise | Fabric pipeline workflow screenshot | Needs redaction check |
| `assets/PySpark.PNG` | PNG | 47 KB; 783x751 | Fabric/timecard evidence | Fabric workforce-data pipeline | Strong case-study support | Needs code/detail review before use. | Preserve/optimise | PySpark transformation code or notebook screenshot | Needs code/detail review |
| `assets/Kiosk - home.jpeg` | JPEG | 3.56 MB; 4284x2641 | Self-service kiosk page | Employee self-service reporting kiosk | Strong case-study support | Needs redaction/anonymisation review before use. | Optimise or replace with redacted version | Kiosk home screen | Very large file |
| `assets/kiosk - edit downtime.jpeg` | JPEG | 3.36 MB; 4284x2492 | Not confirmed referenced | Employee self-service reporting kiosk | Potential case-study support | Needs redaction/anonymisation review before use. | Investigate/optimise if used | Kiosk edit downtime screen | Very large file |
| `assets/kiosk - new downtime.jpeg` | JPEG | 3.28 MB; 4284x2501 | Not confirmed referenced | Employee self-service reporting kiosk | Potential case-study support | Needs redaction/anonymisation review before use. | Investigate/optimise if used | Kiosk new downtime screen | Very large file |
| `assets/PA Flow - Notification.jpeg` | JPEG | 74 KB; 525x647 | Not confirmed referenced | Inventory-check process digitisation | Possible workflow support | Needs detail/redaction review before use. | Investigate | Power Automate notification flow | Detail/redaction check |
| `assets/Vue Pilot Apps.jpeg` | JPEG | 292 KB; 1788x1709 | Current page usage not fully confirmed | Possible operational app/process evidence | Possible process support | Needs internal-label review before use. | Investigate | Vue Pilot apps screen | May expose internal labels |
| `assets/Vue Pilot Machines.jpeg` | JPEG | 129 KB; 1788x894 | Current page usage not fully confirmed | Possible operational app/process evidence | Possible process support | Needs internal-label review before use. | Investigate | Vue Pilot machines screen | May expose internal labels |
| `assets/Vue Pilot Rotations.jpeg` | JPEG | 88 KB; 1788x894 | Current page usage not fully confirmed | Possible operational app/process evidence | Possible process support | Needs internal-label review before use. | Investigate | Vue Pilot rotations screen | May expose internal labels |
| `assets/Raspberry Pi Connect.jpeg` | JPEG | 110 KB; 1083x557 | Current page usage not fully confirmed | Kiosk or technical setup evidence | Possible setup support | Needs system-detail review before use. | Investigate | Raspberry Pi Connect interface | May expose system details |
| `assets/cv/Arsalan-Iftikhar-CV.pdf` | PDF | 373 KB | Nav/download links | Canonical CV after replacement/review | Required downloadable asset | Existing PDF needs content review and likely replacement before launch. | Replace or review | Downloadable BI and Data Analytics CV | Version/content may be outdated |
| `assets/cv/Arsalan-Iftikhar-CV.txt` | TXT | 264 bytes | Not confirmed public | CV/support file | Low public value | Keep private unless final content needs it. | Investigate | Not applicable | May drift from PDF |
| `assets/certifications/google-data-analytics.png` | PNG | 153 KB; 680x680 | Not confirmed referenced | Possible certification evidence | Possible credibility support | Decide whether certification display adds value. | Investigate | Google Data Analytics certification badge | None known |
| `assets/logos/gxo.webp` | WebP | 7.6 KB | No confirmed usage | Employer/client context if named | Employer/client context only | Needs owner/legal decision before use. | Investigate | GXO logo | Logo rights/usage |
| `assets/logos/ocado.jpg` | JPEG | 13 KB; 465x145 | No confirmed usage | Employer/client context if named | Employer/client context only | Needs owner/legal decision before use. | Investigate | Ocado logo | Logo rights/usage |
| `assets/logos/mands.jpg` | JPEG | 7.7 KB; 467x177 | No confirmed usage | Employer/client context if named | Employer/client context only | Needs owner/legal decision before use. | Investigate | M&S logo | Logo rights/usage |
| `assets/logos/NexAura white.jpg` | JPEG | 9.9 KB; 500x150 | No confirmed usage | NexAura consulting context | NexAura brand support | Decide whether this exact logo asset works for light/dark themes. | Preserve/optimise | NexAura logo | White logo may need dark/light variants |
| `assets/logos/linkedin.jpg` | JPEG | 13 KB; 472x273 | No confirmed usage | Contact/social | Social-link support | Use only if licensing and accessibility treatment are acceptable. | Replace with icon if needed | LinkedIn logo | Prefer accessible icon/system asset |
| `assets/logos/linkedin.webp` | WebP | 1.9 KB | No confirmed usage | Contact/social | Social-link support | Use only if licensing and accessibility treatment are acceptable. | Replace with icon if needed | LinkedIn logo | Prefer accessible icon/system asset |
| `assets/tools/excel.webp` | WebP | 1.7 KB | No confirmed usage | Capability/tool icons | Tool-icon support | Needs icon licensing decision before use. | Preserve or replace consistently | Excel icon | None known |
| `assets/tools/n8n.webp` | WebP | 1.8 KB | No confirmed usage | Supporting automation project | Tool-icon support | Needs icon licensing decision before use. | Preserve or replace consistently | n8n icon | None known |
| `assets/tools/powerapps.webp` | WebP | 2.3 KB | No confirmed usage | Power Apps case studies | Tool-icon support | Needs icon licensing decision before use. | Preserve or replace consistently | Power Apps icon | None known |
| `assets/tools/powerautomate.webp` | WebP | 3.4 KB | No confirmed usage | Automation/process work | Tool-icon support | Needs icon licensing decision before use. | Preserve or replace consistently | Power Automate icon | None known |
| `assets/tools/powerbi.webp` | WebP | 1.8 KB | No confirmed usage | BI case studies | Tool-icon support | Needs icon licensing decision before use. | Preserve or replace consistently | Power BI icon | None known |
| `assets/tools/python.webp` | WebP | 2.0 KB | No confirmed usage | Python supporting projects | Tool-icon support | Needs icon licensing decision before use. | Preserve or replace consistently | Python icon | None known |
| `assets/tools/sql.webp` | WebP | 8.0 KB | No confirmed usage | SQL/analytics evidence | Tool-icon support | Needs icon licensing decision before use. | Preserve or replace consistently | SQL icon | None known |
| `assets/tools/tableau.webp` | WebP | 2.9 KB | No confirmed usage | Capability/tool icon | Possible tool-icon support | Decide whether Tableau is relevant before use. | Investigate | Tableau icon | Avoid irrelevant tool emphasis |
| `projects/house_prices/housebanner.png` | PNG | 149 KB; 1000x177 | House-price project | House-price supporting project | Project visual support | Use if dataset/source wording is clear. | Preserve/optimise | House-price prediction banner | Wide banner sizing |
| `projects/football/age.png` | PNG | 11 KB; 349x247 | Football project | Football Python analysis | Project chart support | Use if dataset/source wording is clear. | Preserve | Player age distribution chart | None known |
| `projects/football/position.png` | PNG | 11 KB; 349x247 | Football project | Football Python analysis | Project chart support | Use if dataset/source wording is clear. | Preserve | Player position distribution chart | None known |
| `projects/football/figure_shot_distance.png` | PNG | 16 KB; 401x278 | Football project | Football Python analysis | Project chart support | Use if dataset/source wording is clear. | Preserve | Shot distance analysis chart | Small-screen overflow in page |
| `projects/football/figure_xg_goals.png` | PNG | 8 KB; 382x278 | Football project | Football Python analysis | Project chart support | Use if dataset/source wording is clear. | Preserve | Expected goals versus goals chart | Small-screen overflow in page |
| `projects/football/figure_shots_goals.png` | PNG | 9 KB; 382x278 | Not confirmed referenced | Football Python analysis | Project chart support | Decide whether it adds value before use. | Investigate | Shots versus goals chart | None known |
| `projects/football/epl.webp` | WebP | 5.4 KB | Not confirmed referenced | Football Python analysis | Decorative or contextual support | Needs source/licensing decision before use. | Investigate | Premier League visual asset | Logo/rights concern if branded |
| `projects/n8n/n8n_workflow.png` | PNG | 56 KB; 1153x298 | n8n project | n8n email-routing automation | Strong workflow support | Check for private details before use. | Preserve/optimise | n8n email-routing workflow diagram | Wide image may need responsive handling |
| `projects/sales_analysis/dashboard_preview.png` | PNG | 145 KB; 1197x670 | Sales analysis project | Sales and Power BI analysis | Strong dashboard support | Use if sample/synthetic data is clearly described. | Preserve/optimise | Sales analytics dashboard preview | Wide image responsiveness |
| `projects/sales_analysis/model_view.png` | PNG | 45 KB; 720x469 | Sales analysis project | Sales and Power BI analysis | Strong model support | Use if sample/synthetic data is clearly described. | Preserve | Power BI model view | None known |
| `projects/sales_analysis/measures_folders.png` | PNG | 18 KB; 253x322 | Sales analysis project | Sales and Power BI analysis | Technical support | Use if sample/synthetic data is clearly described. | Preserve | DAX measures folder organisation | None known |
| `projects/sales_analysis/powerquery_queries.png` | PNG | 17 KB; 258x474 | Sales analysis project | Sales and Power BI analysis | Technical support | Use if sample/synthetic data is clearly described. | Preserve | Power Query queries pane | None known |
| `projects/sales_analysis/sales_dashboard.pdf` | PDF | 899 KB | Sales analysis project | Sales and Power BI analysis | Downloadable project support | Decide whether the PDF adds value beyond the page. | Investigate | Downloadable sales dashboard PDF | Download value and file size |
| `projects/sales_analysis/sales_analysis_project_image.webp` | WebP | 13 KB | Not confirmed referenced | Sales and Power BI analysis | Possible project visual support | Decide whether it adds value before use. | Investigate | Sales analysis project visual | None known |
| `projects/smart_device/figure1.png` | PNG | 95 KB; 1435x865 | Smart-device project | Smart-device analysis | Project chart support | Use if dataset/source wording is clear. | Preserve/optimise | Smart-device analysis figure 1 | Wide image responsiveness |
| `projects/smart_device/figure2.png` | PNG | 39 KB; 1432x862 | Smart-device project | Smart-device analysis | Project chart support | Use if dataset/source wording is clear. | Preserve/optimise | Smart-device analysis figure 2 | Wide image responsiveness |
| `projects/smart_device/figure3.png` | PNG | 103 KB; 1447x874 | Smart-device project | Smart-device analysis | Project chart support | Use if dataset/source wording is clear. | Preserve/optimise | Smart-device analysis figure 3 | Wide image responsiveness |
| `projects/smart_device/figure4.png` | PNG | 78 KB; 1447x868 | Smart-device project | Smart-device analysis | Project chart support | Use if dataset/source wording is clear. | Preserve/optimise | Smart-device analysis figure 4 | Wide image responsiveness |
| `projects/smart_device/wristband.webp` | WebP | 6.4 KB | Not confirmed referenced | Smart-device analysis | Decorative or contextual support | Needs source/licensing decision before use. | Investigate | Smart wristband visual | Source/licensing concern |

Placeholder text files are repository markers rather than portfolio evidence assets. They should be ignored in the public content model unless a later repository hygiene task decides to remove or replace them.

## 13. Legacy URL Strategy

Canonical URLs to retain:

- `/` as the canonical homepage.
- `/projects.html` as the Work hub unless a later route task approves `/work/`.
- Existing valuable case-study URLs, especially those already in the sitemap.
- Existing Technical Note URLs under `/insights/`.
- `/404.html` as the GitHub Pages 404 route.

URLs that should redirect or become compatibility pages:

- `experience.html`: retire the timeline and route visitors to About, Work, and CV. Use a redirect if the implementation stack supports it cleanly; otherwise use a lightweight compatibility page with no timeline and a canonical/noindex decision.
- `approach.html`: fold content into About and case studies. Use redirect or compatibility page to avoid breaking existing sitemap/nav links.
- `projects/ai-qa-coaching-case-study.html`: keep or redirect if the future canonical slug becomes `multilingual-quality-assurance-product-case-study.html`.
- If any future cleaner slugs replace underscored supporting-project URLs, old URLs should redirect rather than 404.

URLs that may remain available but be removed from primary navigation:

- `/insights/` and individual Technical Notes.
- Supporting project pages that are retained but secondary, including smart-device analysis.

Sitemap and canonical handling later:

- Remove `/index.html` from sitemap or canonicalise it to `/`.
- Add all public Selected Work pages once ready.
- Add Supporting Projects and Technical Notes that remain public and useful.
- Exclude retired compatibility pages from sitemap unless there is a deliberate reason to keep them indexed.
- Give each page a canonical URL matching the chosen route.

## 14. Content Dependencies and Owner-Input Register

### Selected Work

1. Confirm public titles and slugs for all six Selected Work items.
2. Confirm whether current Fabric Modernisation should become the Operational BI and Performance Reporting case study or remain a separate compatibility title.
3. Confirm contribution boundaries for each professional case study.
4. Confirm exact public scope for NexAura Healthcare Management System and Multilingual Quality-Assurance Product.

### Metrics

1. Confirm final wording for the `4-8 staff hours/day saved` metric.
2. Confirm final wording for the `10+ recurring reports automated` metric.
3. Confirm final wording for the `c.200 report views/day` metric.
4. Confirm whether junior contributor coordination should be used as a public metric or narrative point.
5. Provide source note, scope, baseline where useful, and review date for each metric that enters final copy.

### Screenshots and Diagrams

1. Identify which current screenshots can be public.
2. Identify which current screenshots require redaction.
3. Provide final architecture diagrams for Fabric pipeline, operational BI, kiosk, inventory-check digitisation, HMS, and QA product.
4. Confirm whether synthetic/sample screenshots are acceptable for confidential work.

### Confidentiality

1. Decide employer/client naming rules.
2. Decide which internal system names must be anonymised.
3. Decide whether reduced-detail versions are required for NexAura work.
4. Confirm whether any current public screenshots expose internal or sensitive data.

### CV and Downloadable Material

1. Provide latest BI and Data Analytics CV PDF for replacement/review.
2. Decide whether `projects/sales_analysis/sales_dashboard.pdf` should remain downloadable.
3. Decide whether any future case-study PDF downloads add value.

### Technical Notes

1. Decide whether `/insights/` remains the canonical URL while label becomes Technical Notes.
2. Confirm which notes need factual refresh before launch.
3. Confirm whether notes should include dates or last-reviewed labels.

### Contact and Social Links

1. Confirm LinkedIn URL.
2. Confirm exact public display format for personal and NexAura contact routes.
3. Confirm whether mailto links are acceptable or if spam-resistant display is preferred.

### Legacy Route Decisions

1. Choose redirect versus compatibility page for `experience.html`.
2. Choose redirect versus compatibility page for `approach.html`.
3. Decide whether cleaner supporting-project slugs are worth redirect work.
4. Decide if `/work/` is desirable later or if `/projects.html` remains canonical.

## 15. Architecture Requirements Generated by the Content Model

The later architecture-selection task should evaluate tools against these requirements:

- Shared layouts for Home, Work, About, Contact, case studies, supporting projects, Technical Notes, 404, and compatibility pages.
- Central profile, positioning, contact, location, CV, social, and navigation data.
- Project collections with Selected Work versus Supporting Project classification.
- Technical Notes collection or equivalent secondary article model.
- Reusable case-study layout that supports problem, contribution, solution, result, assets, metrics, related notes, and direct public caveat wording where genuinely necessary.
- Shared SEO fields: title, description, canonical, Open Graph, social image, structured-data type.
- Sitemap generation or a reliable sitemap update process.
- Legacy route handling for `experience.html`, `approach.html`, `/index.html`, existing case-study URLs, and existing insight URLs.
- Static GitHub Pages output with no server requirement.
- Light/dark theme support with persisted visitor choice and OS preference fallback.
- Accessible primary navigation, mobile navigation, skip link, focus states, and semantic landmarks.
- Reusable card components for Selected Work, Supporting Projects, and Technical Notes.
- Production content should contain only final, agreed content; unresolved claims, drafting questions, and asset concerns remain outside the production content model.
- Public lifecycle wording such as `In progress`, `MVP`, `Illustrative`, `Synthetic data`, `Anonymised`, or `Redacted` may be written directly into page content when genuinely necessary.
- Straightforward content maintenance by editing central data/content files rather than repeating HTML across pages.
- Ability to keep downloadable assets and public images under controlled paths without forcing asset deletion or binary generation.
