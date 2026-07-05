# Portfolio Brief

## Status

This brief records the confirmed portfolio strategy before redesign work begins. It separates confirmed decisions from provisional recommendations and open questions. It does not add new achievements, metrics, project details, or technologies beyond the supplied strategy and verified repository content.

## Confirmed Decisions

### Portfolio Purpose

The portfolio is primarily a job-search-led professional evidence platform for senior BI, data analytics, BI engineering, and analytics-engineering roles.

Its secondary purpose is to support relevant NexAura consulting enquiries.

The site should demonstrate professional evidence and selected work. It should not duplicate the work-experience section of the CV.

### Audiences

Primary audiences:

- Hiring managers and recruiters for senior BI, data analytics, BI engineering, and analytics-engineering roles.
- Technical stakeholders assessing the portfolio owner's practical BI, data-engineering, automation, and delivery evidence.

Secondary audience:

- Relevant NexAura consulting prospects who need evidence of delivery judgement, discovery, automation, and technical leadership.

### Target-Role Hierarchy

1. Senior Data Analyst / Senior BI Analyst
2. BI Developer / BI Engineer
3. Analytics Engineer
4. Microsoft Fabric Data Engineer
5. AI and Automation Engineer

### Positioning

Primary identity:

**Senior BI & Data Analyst**

The hero and principal metadata title should use:

**Senior BI & Data Analyst**

Core proposition:

**Turning complex operational data into trusted decision systems using business intelligence, data engineering and automation.**

The capability hierarchy should be:

1. Business intelligence and analytics
2. Data engineering and automation
3. Applied AI, cloud delivery and technical leadership

The redesigned site should not present every capability as an equal specialism.

### Information Architecture

Intended high-level navigation:

- Home
- Work
- About
- Contact
- Download CV

There should not be a dedicated Experience section or conventional employment timeline in the redesigned website. The CV remains the authoritative source for employment history.

The site may still mention current professional context where useful for positioning.

### Selected Work

The intended featured-work set is:

1. Microsoft Fabric workforce-data pipeline
2. Operational BI and performance reporting
3. Inventory-check process digitisation
4. NexAura Healthcare Management System
5. Multilingual quality-assurance product
6. Employee self-service reporting kiosk

All six Selected Work items should eventually have dedicated case-study pages.

The homepage does not need to show all six. It should present a smaller curated subset and link to the complete Work page.

The Healthcare Management System case study must describe the portfolio owner's contribution as technical and delivery leadership, including:

- Guiding strategic and architectural decisions
- Translating the MVP into delivery requirements
- Managing and coordinating a project lead and junior contributors
- Using Trello, GitHub, and Google Drive for delivery management
- Reviewing database-schema, tenant, RBAC, and security decisions
- Establishing Azure development, staging, and production environments
- Configuring or guiding GitHub Actions, OIDC, RBAC, Key Vault, and approval controls
- Balancing MVP cost, security, maintainability, and future scalability

It must not imply that the portfolio owner personally developed the entire application.

### Supporting Projects

Smaller technical projects should not be removed merely because they are not homepage features.

The future content model should distinguish:

- **Selected Work:** substantial professional or consultancy case studies.
- **Supporting Projects:** narrower technical demonstrations and portfolio exercises.

Supporting project space should remain available for Python exploratory analysis, house-price prediction, machine-learning model comparison, SQL analysis, data-cleaning notebooks, API experiments, smaller Power BI work, and automation examples.

Preserve supporting projects, but do not give every project equal prominence.

Initial supporting-project visibility:

- Surface warehouse assignment similarity analysis.
- Surface house-price prediction and machine-learning comparison.
- Surface football Python analysis.
- Surface n8n email-routing automation.
- Surface sales and Power BI analysis.
- Retain smart-device analysis, but do not prominently surface it unless its content is strengthened.

No project files should be deleted during this phase.

### Technical Notes

Retain the existing insights as secondary technical evidence.

The likely future presentation is **Technical Notes**. Technical Notes may be surfaced from the Work page or relevant case studies, but should not become a primary navigation item.

### Location

Use this exact location wording:

**West Yorkshire, UK · Open to relocation**

Do not add Gulf-specific, UK-only, or other market-specific positioning. The general relocation wording is sufficient.

### Contact Routing

Career and professional enquiries:

- Personal email: `arsalan.iftikhar1@hotmail.com`
- LinkedIn

Consulting and NexAura enquiries:

- `arsalan.iftikhar@nexauragroup.co.uk`

The redesigned site should distinguish these routes clearly.

The phone number and WhatsApp route should not be displayed on the public website. The phone number may remain in the downloadable CV.

### Downloadable CV

The latest BI and Data Analytics CV should be treated as the canonical downloadable CV for the redesigned portfolio.

The existing repository PDF should be treated as requiring verification and likely replacement before launch.

Do not replace or modify the CV during documentation or planning tasks.

### Visual Direction

The redesign should include:

- Light and dark themes.
- A visible and accessible theme toggle.
- Initial theme based on operating-system preference.
- Persistence of the visitor's explicit theme choice.
- No pure-white default background.
- No large, uninterrupted solid-colour page blocks.
- Layered backgrounds using subtle gradients, grids, nodes, lines, or related technical motifs.
- Restrained visual icons and technology icons.
- Limited, purposeful animation.
- Support for `prefers-reduced-motion`.
- Strong contrast and keyboard accessibility.
- A professional, technical, modern visual identity.
- Mobile, tablet, and desktop support.

Visual elements must not become saturated, distracting, or ornamental without meaning.

### Accessibility And Responsive Principles

The redesigned site should preserve clear semantic HTML, meaningful headings, keyboard-operable navigation, visible focus states, strong colour contrast, accessible theme-control semantics, and reduced-motion support.

Responsive behaviour should be checked at narrow mobile, standard mobile, larger mobile, tablet, laptop, and large desktop widths. Text, links, cards, code snippets, and images must not cause horizontal scrolling.

### Content-Maintenance Principles

The CV remains the canonical employment-history document.

The website should centralise repeated profile facts, role labels, contact routes, CV links, project metadata, project metrics, and navigation where practical.

The public website should use personal email and LinkedIn for career and professional enquiries, and the NexAura business email for consulting enquiries.

The phone number should be kept out of public website pages and, if still required, kept in the downloadable CV.

Case studies should distinguish:

- Problem or opportunity
- Role or contribution
- Technical or delivery approach
- Deliverable
- Verified result, where available
- Unknowns requiring confirmation

### Explicit Exclusions

The redesigned website should not include:

- A dedicated Experience section.
- A conventional employment timeline.
- A duplicated CV work-history page that must be maintained separately.
- Unsupported metrics, claims, testimonials, endorsements, or invented outcomes.
- A design copied from the reference portfolio.

## Provisional Recommendations

- Use a Home / Work / About / Contact structure, with Download CV as a persistent action.
- Use "Selected Work" for substantial professional and consultancy case studies, and "Supporting Projects" for narrower demonstrations.
- A lightweight build step is acceptable in principle.
- Lightweight static-site templating remains the provisional architecture direction.
- Select the exact templating tool only after the content and route model is complete.
- A full application framework is not currently justified.
- The Experience page content should be retired rather than recreated in the redesign.
- Useful evidence from Experience may be moved into case studies or brief About context.
- The old Experience URL should be considered for a lightweight redirect or compatibility page rather than silently becoming a broken URL.
- Useful Approach content should be folded into About and relevant case studies.
- The old Approach URL should also be considered for redirect or compatibility handling.
- The existing Projects route may remain the technical URL while its navigation label becomes "Work", subject to the route-model task.
