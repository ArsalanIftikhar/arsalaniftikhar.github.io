# Case Study Content Schema and Editorial Standard

This schema is implementation-agnostic. It defines the content fields, claim-quality rules, contribution-boundary standards, and editorial checks for future Selected Work, Supporting Projects, and Technical Notes. It does not choose a templating tool or implement any website changes.

## 1. Case-Study Type Definitions

### Selected Work

Selected Work is substantial professional or consultancy evidence. It should demonstrate a real business problem, the portfolio owner's role, the technical or analytical approach, controls, deliverables, and results or decision value.

Minimum content threshold:

- Clear business problem or operational need.
- Clear personal role and contribution boundary.
- Technical approach, architecture, workflow, or analytical method.
- At least one public supporting asset, implementation excerpt, diagram, or sufficiently detailed narrative.
- Results, metrics, adoption signal, or decision outcome only where wording and scope are agreed for final content.
- Confidentiality constraints handled through redaction, anonymisation, omission, or direct public wording.

### Supporting Project

A Supporting Project is a narrower technical demonstration, portfolio exercise, analysis, dashboard, notebook-style project, or automation experiment. It supports technical credibility but should not compete visually with Selected Work.

Minimum content threshold:

- Clear analytical question, build objective, or learning purpose.
- Data/source scope or project context.
- Method or workflow.
- Output such as chart, dashboard, PDF, code excerpt, workflow diagram, or findings.
- Limitations and next step.
- No unsupported business-impact claims.

### Technical Note

A Technical Note is a short written explanation of a reusable pattern, judgement, control, or lesson connected to portfolio work.

Minimum content threshold:

- Clear subject and practical problem avoided.
- Connection to at least one capability, case study, or target role.
- Concise pattern, example, or decision rule.
- Caveat or limitation where useful.
- Last-reviewed date before launch.

## 2. Required Case-Study Fields

| Field | Purpose | Required or optional | Expected format | Maintenance owner | Validation rule |
|---|---|---|---|---|---|
| Internal ID | Stable identifier independent of public title or route. | Required for all content items. | Lowercase kebab-case or equivalent stable ID. | Site maintainer. | Must be unique and never reused for a different item. |
| Public title | Main page/card title. | Required for all. | Plain text, audience-readable, no inflated claims. | Portfolio owner. | Must match classification and agreed public wording. |
| Short title | Compact card/navigation label. | Required for cards; optional for long-form pages. | 2-6 words. | Site maintainer. | Must not change meaning of public title. |
| Slug | Route-safe public identifier. | Required for pages. | Lowercase hyphenated slug. | Site maintainer. | Must be unique and mapped from any legacy URL. |
| Classification | Distinguishes Selected Work, Supporting Project, Technical Note. | Required for all. | Controlled value. | Site maintainer. | Must match this schema's type definitions. |
| Lifecycle | Basic editorial lifecycle. | Optional for editorial planning; public pages may use direct wording only when relevant. | Draft, Published, Retired, In progress. | Site maintainer and portfolio owner. | Do not use lifecycle as an evidence gate or conditional publishing system. |
| Featured placement | Controls Home/Work prominence. | Required for work/project items. | None, Work, Home, Retain secondary. | Portfolio owner. | Home placement should follow the editorial checklist. |
| Display order | Controls ordering within groups. | Required for public collections. | Integer or ordered rank. | Site maintainer. | Must be intentional; avoid relying on filename order. |
| Summary | Short value statement. | Required for public pages and cards. | 1-3 sentences. | Portfolio owner. | Must avoid unsupported metrics or vague superlatives. |
| Business problem or analytical question | Explains why the work existed. | Required for Selected Work and Supporting Projects; optional for Technical Notes. | Plain-language problem statement. | Portfolio owner. | Must be specific enough to justify the work. |
| Context | Provides operating environment without duplicating CV. | Required for Selected Work; optional for Supporting Projects and notes. | 1-3 short paragraphs or bullet facts. | Portfolio owner. | Must not expose confidential employer/client detail unless agreed for public use. |
| Audience or users | Shows who used or benefited from the work. | Required for Selected Work; optional for Supporting Projects. | Role/group labels, anonymised if needed. | Portfolio owner. | Must avoid naming private groups if not agreed for public use. |
| Personal role | States what the portfolio owner did. | Required for Selected Work and Supporting Projects. | Controlled boundary label plus short explanation. | Portfolio owner. | Must be consistent with contribution-boundary standard. |
| Contribution boundary | Prevents overclaiming. | Required for Selected Work; recommended for Supporting Projects. | Plain-language boundary statement. | Portfolio owner. | Must separate personally built, led, reviewed, coordinated, and team work. |
| Responsibilities | Details tasks owned. | Required for Selected Work; optional for Supporting Projects. | Bullet list of responsibilities. | Portfolio owner. | Each item should use accurate verbs from the contribution standard. |
| Constraints | Shows trade-offs and delivery realism. | Required for Selected Work; optional for Supporting Projects. | Bullet list or short paragraph. | Portfolio owner. | Must include confidentiality, time, cost, data quality, security, or adoption constraints where relevant. |
| Data sources | Identifies source type and scope. | Required when data is central to the item. | Generalised source names, dataset names, or anonymised categories. | Portfolio owner. | Must not reveal confidential source names unless agreed for public use. |
| Technical approach | Describes the analytical/build method. | Required for all work/project pages. | Sectioned prose plus bullets or implementation excerpts. | Portfolio owner/site maintainer. | Must be understandable to a technical reviewer. |
| Architecture or workflow | Shows system/process structure. | Required for Selected Work when applicable; optional for Supporting Projects. | Diagram, ordered steps, or plain text workflow. | Portfolio owner/site maintainer. | Must not include secrets, tenant IDs, internal URLs, or sensitive security detail. |
| Technologies | Supports role matching and search. | Required for work/project items. | Controlled tag list plus optional display labels. | Site maintainer. | Must reflect the final agreed content and current source material. |
| Validation and controls | Shows trust and governance. | Required for Selected Work; optional but encouraged for BI/analytics projects. | Bullet list of checks, controls, review steps. | Portfolio owner. | Must distinguish implemented controls from recommended controls. |
| Deliverables | Shows concrete outputs. | Required for Selected Work; optional for Supporting Projects. | Reports, dashboards, pipelines, apps, workflows, docs, diagrams. | Portfolio owner. | Must be accurate, supportable, and suitable for public wording. |
| Results | States outcome or decision value. | Required for Selected Work when known and agreed; omit rather than speculate. | Short prose. | Portfolio owner. | Must not include unsupported hard claims. |
| Metrics | Provides quantified evidence. | Optional unless used publicly; required schema when present. | Metric objects following the metric standard. | Portfolio owner. | Every metric must have value, unit, scope, source or basis, public wording, and review date. |
| Limitations | Builds credibility and avoids overclaiming. | Required for Supporting Projects and recommended for Selected Work. | Short bullet list. | Portfolio owner/site maintainer. | Must not undermine confidential obligations. |
| Next steps | Shows judgement and improvement path. | Optional for Selected Work; recommended for Supporting Projects. | Bullet list or short section. | Portfolio owner. | Must distinguish planned from completed work. |
| Supporting assets | Links visuals, PDFs, diagrams, screenshots. | Required if assets are shown; optional if text-only. | Asset references with captions, alt subjects, and any direct redaction/anonymisation note. | Site maintainer. | Must pass asset and confidentiality standards. |
| Repository/demo links | Gives external proof where available. | Optional. | URL plus label and link type. | Portfolio owner/site maintainer. | Must not link private repositories or demos requiring secrets. |
| Related Technical Notes | Connects thinking to work. | Optional but recommended. | List of note IDs/routes. | Site maintainer. | Links must be relevant and non-circular. |
| Tags | Enables grouping and filtering. | Required for public work/project collections. | Controlled list. | Site maintainer. | Use only capability, technology, content type, and target-role tags where useful. |
| Target roles supported | Aligns content to portfolio strategy. | Required for Selected Work; optional for Supporting Projects and notes. | Controlled list from target-role hierarchy. | Portfolio owner. | Selected Work should support at least one priority role. |
| SEO title | Search/social page title. | Required for public pages. | 50-65 characters where practical. | Site maintainer. | Must include name/role only where useful and avoid duplication. |
| Meta description | Search/social summary. | Required for public pages. | 120-160 characters where practical. | Site maintainer. | Must describe page content, not generic portfolio claims. |
| Social image | Preview image for sharing. | Optional; recommended for Selected Work. | Asset reference. | Site maintainer. | Must be safe for public display and have fallback if absent. |
| Public caveat text | Captures direct public wording such as anonymised, redacted, synthetic data, illustrative, MVP, or in progress when genuinely necessary. | Optional. | Plain text written directly for the page, not a controlled metadata framework. | Portfolio owner/site maintainer. | Do not use as a conditional publishing system. |
| Last reviewed date | Prevents stale evidence. | Required for public pages. | ISO date or clear month/year. | Site maintainer. | Must be updated when claims, metrics, or assets change. |

## 3. Contribution-Boundary Standard

Use accurate verbs consistently.

| Boundary term | Use when | Public wording rule |
|---|---|---|
| Personally built | The owner directly implemented the component end to end. | May use built, implemented, created, developed. |
| Co-developed | The owner implemented with others. | Name the shared nature of the work; avoid sole-ownership wording. |
| Led | The owner owned direction, coordination, decisions, or delivery path. | Use led delivery/design/implementation with clear responsibilities. |
| Directed | The owner set direction or made strategic/architectural decisions but did not necessarily implement. | Pair with what was directed: architecture, delivery, security approach, MVP scope. |
| Contributed to | The owner completed a meaningful part of a broader effort. | State the contribution area and avoid claiming the entire product. |
| Reviewed | The owner assessed work by others and influenced quality or direction. | State what was reviewed and what decisions it informed. |
| Coordinated | The owner managed people, tasks, handoff, delivery cadence, or artefacts. | State who/what was coordinated without naming private individuals unless agreed for public use. |
| Planned | The owner shaped requirements, architecture, roadmap, or implementation approach. | Distinguish plans from shipped deliverables. |
| In progress | Work is ongoing or not fully released. | Avoid final outcome wording and mark metrics as planned or pending. |

General rules:

- Do not imply sole authorship unless the owner has explicitly agreed that wording.
- Put contribution boundary near the top of Selected Work pages.
- Use `I led`, `I designed`, `I reviewed`, `I coordinated`, or `I contributed to` only when each verb is accurate.
- For team outcomes, use `supported`, `contributed to`, or `helped enable` rather than claiming direct sole causation.

Specific Healthcare Management System guidance:

- Describe the portfolio owner's contribution as technical and delivery leadership.
- Include, where agreed for public wording: guiding strategic and architectural decisions; translating the MVP into delivery requirements; managing and coordinating a project lead and junior contributors; using Trello, GitHub, and Google Drive for delivery management; reviewing database-schema, tenant, RBAC, and security decisions; establishing Azure development, staging, and production environments; configuring or guiding GitHub Actions, OIDC, RBAC, Key Vault, and approval controls; balancing MVP cost, security, maintainability, and scalability.
- Do not say or imply that the portfolio owner personally developed the entire application unless later confirmed with evidence.

## 4. Metric Standard

Every metric must have:

- Metric value.
- Unit.
- Time period.
- Baseline.
- Scope.
- Attribution.
- Source or basis.
- Public wording.
- Review date.

Metric validation rules:

- A metric without a source is not publishable as a hard claim.
- A metric should not enter the final website until the portfolio owner has decided that its wording and scope are accurate and suitable for public use.
- Metrics still being discussed remain in planning notes, not production content data.
- A metric must state whether it describes personal impact, team outcome, system usage, process saving, or intended design value.
- If a number is confidential, use an agreed range, relative wording, or no number.

Phrase rules:

- `Approximately`, `around`, or `c.`: use for estimates with a known basis. Include scope and avoid unnecessary decimals.
- `Up to`: use only for a maximum observed or credible upper bound. State the period/scope if public.
- `Supported`: use when the work was one contributor to a broader outcome.
- `Contributed to`: use for team outcomes or indirect influence.
- `Designed to`: use for intended capability, not achieved impact.
- `Intended to`: use for planned or in-progress work, not completed results.

## 5. Confidentiality Standard

### Employer-Confidential Data

- Do not expose internal dashboards, source names, operational data, employee data, or commercially sensitive process details unless explicitly agreed for public use.
- Use anonymised descriptions and synthetic examples where needed.

### Client-Confidential Data

- Do not name clients, tenants, systems, contracts, or product details unless agreed for public use.
- If a client cannot be named, use role/context language such as healthcare MVP, logistics operation, or QA workflow.

### Sanitised Screenshots

- Redact names, IDs, emails, phone numbers, internal URLs, tenant IDs, keys, access groups, and sensitive metrics.
- Confirm that remaining labels are acceptable.

### Synthetic Examples

- Label visibly as synthetic or illustrative.
- Do not let synthetic examples imply real production results.

### Architecture Diagrams

- Show public-safe structure and design judgement.
- Remove secret names, exact network/security configuration, private resource names, and tenant/account identifiers.

### In-Progress Projects

- Label as in progress, MVP, pilot, or planned.
- Do not claim launch, adoption, or outcome metrics until final public wording is agreed.

### Client Names

- Use named clients only when agreed and legally/contractually safe.
- Employer logos and client logos require owner/legal confirmation before display.

### Internal Systems and Source Names

- Prefer generic source categories unless names are already public and agreed for use.

### Security-Sensitive Details

- For RBAC, OIDC, Key Vault, approval controls, and deployment environments, describe the pattern and responsibility without publishing configurations, identifiers, or access paths.

## 6. Asset Standard

### Screenshots

- Must be safe for public use, redacted where needed, and accompanied by meaningful alt text and caption.
- Should have width/height or equivalent layout constraints in the eventual implementation.
- Large screenshots should be optimised before launch.

### Diagrams

- Must clarify architecture, workflow, validation, or ownership.
- Should avoid decorative complexity.
- Must not reveal sensitive infrastructure details.

### Charts

- Must include the subject, measure, time period or dataset scope, and any relevant caveat.
- Colour choices must remain legible in light/dark themes and to colour-blind users.

### Code Excerpts

- Must avoid secrets, tokens, private URLs, internal account IDs, and sensitive comments.
- Should be short and explain why the excerpt matters.

### Videos or Animations

- Optional only if they add evidence beyond screenshots.
- Should include captions or text alternatives where practical.
- Must respect reduced-motion preferences in the eventual implementation.

### PDFs

- Must have a clear purpose and current version.
- Avoid adding PDFs that duplicate page content without value.
- Public CV PDF must be current and accurate before launch.

### Alt Text

- Must describe the evidence subject, not merely the file name.
- Decorative icons should be hidden from assistive tech in the eventual implementation.

### Captions

- Must state what the asset evidences.
- Must label synthetic or redacted assets.

### Redaction

- Redaction must remove sensitive information, not merely blur in a reversible or ambiguous way.
- Redacted files should be exported as separate public assets if used later.

### Image Dimensions and File Size

- Prefer appropriately sized images for web display.
- Very large evidence screenshots should be resized/compressed before launch.

### Modern Formats

- Prefer modern web formats where practical, but do not sacrifice evidence clarity.
- Keep originals privately if needed; public versions should be optimised.

### Evidence Provenance

- Record whether each asset is production, screenshot, synthetic, redacted, public dataset, or portfolio exercise output.

## 7. Editorial Structure

### Selected Work Case Study

Recommended order:

1. Title, classification, capability tags, and direct public lifecycle wording where relevant.
2. One-screen summary: problem, personal contribution, solution, result.
3. Business problem and context.
4. Personal role and contribution boundary.
5. Solution overview.
6. Architecture or workflow.
7. Technical approach and technologies.
8. Validation, controls, and governance.
9. Deliverables.
10. Results, metrics, and decision value.
11. Evidence assets with captions.
12. Limitations, trade-offs, and confidentiality notes.
13. Related Technical Notes and related work.
14. Contact or Work-page CTA.

### Supporting Project Page

Recommended order:

1. Title, category, skills, and short summary.
2. Analytical question or build objective.
3. Data/source context.
4. Method or workflow.
5. Key outputs and evidence.
6. Skills demonstrated.
7. Limitations.
8. Next steps.
9. Related Selected Work or Technical Notes.

### Technical Note

Recommended order:

1. Title and subject.
2. Where the pattern applies.
3. Problem it avoids.
4. Practical pattern or principle.
5. Example or checklist.
6. Caveats and limitations.
7. Related case studies.

## 8. Editorial Checklist

### Drafting Checklist

- [ ] Classification is agreed.
- [ ] Public title and slug are proposed.
- [ ] Problem/question is known.
- [ ] Personal role is known.
- [ ] Confidentiality considerations are known.
- [ ] Required owner questions are listed.

### Publication Checklist

- [ ] Personal contribution is accurate.
- [ ] Claims and metrics are suitable for publication.
- [ ] Public screenshots/diagrams are safe to publish or omitted.
- [ ] Confidential details are redacted/anonymised.
- [ ] SEO title and meta description are drafted.
- [ ] Accessibility basics are planned: heading hierarchy, alt text, link purpose.
- [ ] Last reviewed date is set.

### Work Page Checklist

- [ ] Page is complete enough to represent the work clearly.
- [ ] Card summary is concise and accurate.
- [ ] Tags and target roles are assigned.
- [ ] Supporting content is strong enough for the item's classification.
- [ ] Related notes/projects are linked where useful.

### Homepage Checklist

- [ ] Page is strong enough for first-impression scrutiny.
- [ ] The work supports the BI-led positioning.
- [ ] Any metric or outcome shown on Home is accurate and suitable for publication.
- [ ] The homepage subset remains balanced across BI, data engineering, automation, and leadership.
- [ ] No confidential or in-progress work is overstated.

## 9. Six-Item Case-Study Checklist

### 10.1 Microsoft Fabric Workforce-Data Pipeline

- Current source material: `projects/fabric-timecard-pipeline-case-study.html`; `assets/Fabric Pipeline.PNG`; `assets/PySpark.PNG`; related `insights/fabric-migration-notes.html` and `insights/advanced-sql-patterns.html`.
- Existing content: Fabric Timecard Ingestion and Shift Reconstruction Pipeline, business problem, architecture/workflow, transformation logic, Delta upsert, implementation excerpts, role, results/impact, future improvements.
- Missing narrative: Final wording that maps the current page to the confirmed Selected Work title.
- Metric or wording to confirm: Current impact/result claims need final source note, scope, and review date before drafting.
- Missing screenshots or diagrams: Sanitised architecture/workflow diagram and validation-control evidence if public.
- Contribution-boundary checks: Confirm whether implementation was personally built, led, or contributed to within a wider workstream.
- Confidentiality checks: Remove or anonymise internal source/system names, workforce details, and sensitive code/configuration.
- Owner decisions: Final title, slug, metrics, public assets, and source-system wording.
- Recommended next action: Prepare a case-study outline using the schema, then confirm metric wording and asset use.

### 10.2 Operational BI and Performance Reporting

- Current source material: `projects/fabric-modernisation-case-study.html`; homepage metrics and capability sections in `index.html`; limited current context in `experience.html`.
- Existing content: GXO Fabric Modernisation page with overview, problem, ownership, validation controls, evidence/screenshots section, results/impact, and next steps.
- Missing narrative: A coherent case-study frame around operational BI and performance reporting rather than a broad modernisation label.
- Metric or wording to confirm: `10+ recurring reports automated` and any Fabric modernisation impact claims need source note, scope, and final wording.
- Missing screenshots or diagrams: Sanitised report/dashboard examples, semantic model diagram, report estate before/after map.
- Contribution-boundary checks: Separate direct BI/reporting ownership from broader Fabric migration or team work.
- Confidentiality checks: Employer/client naming, dashboard screenshots, KPI labels, and internal report names.
- Owner decisions required: Whether to keep current route/title or retitle in place; which operational reporting examples can be public.
- Recommended next action: Define the case-study scope and final supporting material before drafting.

### 10.3 Inventory-Check Process Digitisation

- Current source material: `projects/floor-walk-powerapp-case-study.html`; related `insights/power-apps-notes.html`; potential asset `assets/PA Flow - Notification.jpeg`.
- Existing content: Floor Walk Digitisation with Power Apps and Power BI, original friction, what changed, role/ownership, measured impact, governance/reporting controls.
- Missing narrative: Retitle and frame as inventory-check process digitisation if owner confirms that wording.
- Metric or wording to confirm: `4-8 staff hours/day saved` needs source note, baseline, scope, and final public wording.
- Missing screenshots or diagrams: Sanitised app screens, workflow diagram, capture-to-reporting diagram.
- Contribution-boundary checks: Confirm what was designed, built, configured, automated, or handed over.
- Confidentiality checks: Operational location names, issue categories, screenshots, and internal process details.
- Owner decisions: Public metric wording, asset use, route/title preference.
- Recommended next action: Convert current page into schema fields and confirm final metrics/assets.

### 10.4 NexAura Healthcare Management System

- Current source material: Homepage NexAura section references Healthcare Management System; strategic details are in the brief, not a current dedicated page.
- Existing content: No dedicated case-study page found.
- Missing narrative: Full case-study narrative covering problem, MVP translation, technical/delivery leadership, architecture/security review, Azure environments, delivery coordination, and trade-offs.
- Metric or wording to confirm: No public metric is currently agreed.
- Missing screenshots or diagrams: Sanitised architecture/environment diagram, delivery workflow, screenshots or illustrative diagrams.
- Contribution-boundary checks: Must state technical and delivery leadership; must not imply sole development of the entire application.
- Confidentiality considerations: Healthcare context, tenant/security design, RBAC, Key Vault, GitHub Actions/OIDC, contributor/team details, and product lifecycle wording.
- Owner decisions: Public wording, confidentiality level, whether to use reduced-detail version, public artefacts, exact in-progress/completion wording.
- Recommended next action: Owner interview/content capture before any page draft.

### 10.5 Multilingual Quality-Assurance Product

- Current source material: `projects/ai-qa-coaching-case-study.html`; homepage AI QA and call-centre coaching card.
- Existing content: AI QA and coaching case study with context/problem, pipeline overview, requirements translation, KPI definitions, outcomes.
- Missing narrative: Align current call-centre QA wording to the confirmed multilingual quality-assurance product without overstating scope.
- Metric or wording to confirm: No public metric is currently agreed.
- Missing screenshots or diagrams: Sanitised workflow, rubric/scorecard example, multilingual evaluation flow, dashboard/product screenshots.
- Contribution-boundary checks: Confirm whether owner led product definition, built scoring/rubric logic, coordinated delivery, reviewed outputs, or implemented components.
- Confidentiality considerations: Client/product names, call recordings/transcripts, language scope, QA criteria, in-progress wording.
- Owner decisions: Exact public product name/description, contribution boundary, supporting material, confidentiality level.
- Recommended next action: Re-scope current page against the confirmed product and collect final owner wording.

### 10.6 Employee Self-Service Reporting Kiosk

- Current source material: `projects/self-service-kiosk-case-study.html`; homepage featured project; `assets/Kiosk - home.jpeg`; unreferenced kiosk screenshots `assets/kiosk - edit downtime.jpeg` and `assets/kiosk - new downtime.jpeg`.
- Existing content: Self-Service Kiosk for frontline performance and downtime capture, problem, solution, architecture/workflow, role, screenshots, results/impact.
- Missing narrative: Tighten around the confirmed Selected Work title and make contribution boundary explicit near the top.
- Metric or wording to confirm: `c.200 report views/day` needs source note, scope, timeframe, and final public wording.
- Missing screenshots or diagrams: Redacted/optimised screenshots and a capture-to-reporting workflow diagram.
- Contribution-boundary checks: Confirm what was designed, built, deployed, supported, or adopted.
- Confidentiality checks: Screenshot labels/data, operational process details, internal system names.
- Owner decisions: Screenshot public suitability, metric wording, whether unreferenced screenshots should be used or retained privately.
- Recommended next action: Redaction/asset review followed by case-study rewrite using the schema.
