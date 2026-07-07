---
layout: layouts/case-study.njk
permalink: /projects/fabric-timecard-pipeline-case-study.html
title: Microsoft Fabric Workforce-Data Pipeline
description: A Microsoft Fabric and PySpark workforce-data pipeline using authenticated APIs, shift reconstruction, incremental loading, Delta MERGE and reporting validation.
canonicalPath: /projects/fabric-timecard-pipeline-case-study.html
caseStudy:
  label: Selected Work
  summary: A Microsoft Fabric pipeline that ingests workforce data through authenticated APIs, reconstructs shifts and breaks, and produces controlled incremental outputs for operational reporting.
  primaryCapability: Data Engineering & Automation
  supportingCapabilities:
    - Business Intelligence
    - Data Quality
    - Microsoft Fabric
    - Operational Reporting
  technologies:
    - Microsoft Fabric
    - Python
    - PySpark
    - REST APIs
    - OAuth
    - Delta MERGE
    - Power BI
  roleStatement: I designed and developed the Python/PySpark pipeline, covering incremental loading, Delta MERGE logic, run logging and legacy-reporting reconciliation.
---

<section class="case-study-section" aria-labelledby="reporting-problem-heading">
  <div class="case-study-section__heading">
    <p class="eyebrow">Reporting problem</p>
    <h2 id="reporting-problem-heading">Workforce events needed a trusted reporting grain</h2>
  </div>
  <div class="case-study-section__body">
    <p>Workforce reporting depended on multiple event types from Kronos, including workforce, shift, clocking and break data. Those events were useful as operational records, but they were not immediately usable for recurring reporting without reconstruction.</p>
    <p>The reporting layer needed consistent shift and break records rather than isolated punch events. It also needed to support historical loading and ongoing incremental refresh without creating duplicate records after reruns.</p>
    <p>Trust in the new output depended on reconciliation with existing reporting, so the pipeline had to combine transformation logic with clear validation and repeatable run records.</p>
  </div>
</section>

<section class="case-study-section" aria-labelledby="solution-overview-heading">
  <div class="case-study-section__heading">
    <p class="eyebrow">Solution overview</p>
    <h2 id="solution-overview-heading">A controlled API-to-reporting workflow</h2>
  </div>
  <div class="case-study-section__body">
    <p>I built the workflow as a Microsoft Fabric notebook pattern: authenticate to the source APIs, retrieve workforce events, stage the data, reconstruct reporting records, validate the output and publish incremental changes through Delta MERGE logic.</p>
    <ol class="case-study-process" aria-label="Fabric workforce-data pipeline workflow">
      <li>
        <span class="case-study-process__number">01</span>
        <strong>OAuth authentication</strong>
        <p>Authenticate to the Kronos APIs without exposing credentials in the public case study.</p>
      </li>
      <li>
        <span class="case-study-process__number">02</span>
        <strong>API extraction</strong>
        <p>Retrieve workforce, shift, clocking and break data for the required load window.</p>
      </li>
      <li>
        <span class="case-study-process__number">03</span>
        <strong>Staged events</strong>
        <p>Normalise raw event payloads into a shape suitable for PySpark transformation.</p>
      </li>
      <li>
        <span class="case-study-process__number">04</span>
        <strong>Reconstruction</strong>
        <p>Build reporting-ready shift and break records from the event sequence.</p>
      </li>
      <li>
        <span class="case-study-process__number">05</span>
        <strong>Validation checks</strong>
        <p>Compare outputs with legacy reporting and check the reconstructed grain.</p>
      </li>
      <li>
        <span class="case-study-process__number">06</span>
        <strong>Delta MERGE</strong>
        <p>Update existing rows and insert new records for incremental publication.</p>
      </li>
      <li>
        <span class="case-study-process__number">07</span>
        <strong>Reporting output</strong>
        <p>Produce controlled workforce-data outputs for downstream operational reporting.</p>
      </li>
    </ol>
  </div>
</section>

<section class="case-study-section" aria-labelledby="technical-implementation-heading">
  <div class="case-study-section__heading">
    <p class="eyebrow">Technical implementation</p>
    <h2 id="technical-implementation-heading">Python and PySpark inside Microsoft Fabric</h2>
  </div>
  <div class="case-study-section__body">
    <p>I implemented the pipeline in Microsoft Fabric using Python and PySpark. The extraction layer used OAuth-authenticated Kronos REST APIs, then retrieved workforce, shift, clocking and break data for historical and incremental loads.</p>
    <p>The transformation logic reconstructed reporting-ready shift and break records from the staged events. PySpark handled the sequencing and shaping work so the output could be used at a consistent reporting grain.</p>
    <p>For publication, I used Delta MERGE logic so repeat loads could update matching records and insert new ones instead of blindly appending duplicate shifts. Pipeline run logging recorded load activity and supported repeatability when the workflow was rerun.</p>
    <div class="case-study-callout">
      <h3>Contribution boundary</h3>
      <p>I designed and developed the ingestion, transformation, incremental loading, Delta MERGE, run logging and reconciliation parts of this workforce-data pipeline within a wider reporting environment. This does not imply responsibility for the full Kronos product, the complete workforce platform or a wider Microsoft Fabric programme.</p>
    </div>
  </div>
</section>

<section class="case-study-section case-study-section--prominent" aria-labelledby="validation-controls-heading">
  <div class="case-study-section__heading">
    <p class="eyebrow">Validation and controls</p>
    <h2 id="validation-controls-heading">Controls were part of the delivery, not an afterthought</h2>
  </div>
  <div class="case-study-section__body">
    <p>The main control objective was simple: the Fabric output had to be trustworthy enough for operational reporting. I validated the reconstructed output against legacy reporting and used repeatable load controls so scheduled refreshes did not depend on manual judgement.</p>
    <div class="case-study-control-grid" aria-label="Validation and control coverage">
      <article class="case-study-control">
        <h3>Reconciliation</h3>
        <p>Compared source-to-output results with legacy reporting so the reconstructed workforce records aligned with the reporting baseline.</p>
      </article>
      <article class="case-study-control">
        <h3>Record-count checks</h3>
        <p>Used count comparisons across extraction, staged and reporting outputs to spot load or transformation mismatches.</p>
      </article>
      <article class="case-study-control">
        <h3>Duplicate control</h3>
        <p>Used business-key logic and Delta MERGE publication to reduce duplicate shift records during incremental loads and reruns.</p>
      </article>
      <article class="case-study-control">
        <h3>Required fields</h3>
        <p>Checked the fields needed for reporting use, with required-field and null-check coverage identified as an area to expand further.</p>
      </article>
      <article class="case-study-control">
        <h3>Event sequence</h3>
        <p>Validated the shift and break reconstruction logic, with further automation planned for missing punches, odd punch counts and extreme durations.</p>
      </article>
      <article class="case-study-control">
        <h3>Run logging</h3>
        <p>Recorded pipeline runs so historical and incremental processing could be repeated and reviewed more reliably.</p>
      </article>
    </div>
  </div>
</section>

<section class="case-study-section" aria-labelledby="supporting-assets-heading">
  <div class="case-study-section__heading">
    <p class="eyebrow">Supporting assets</p>
    <h2 id="supporting-assets-heading">Screenshots used to show the actual pipeline pattern</h2>
  </div>
  <div class="case-study-section__body">
    <div class="case-study-figure-grid">
      <figure class="case-study-figure">
        <a href="/assets/Fabric Pipeline.PNG">
          <img src="/assets/Fabric Pipeline.PNG" alt="Fabric pipeline workflow screenshot showing extraction, transformation and load steps" width="930" height="286">
        </a>
        <figcaption>The Fabric pipeline screenshot demonstrates the workflow structure used to move workforce data from API extraction into controlled reporting outputs.</figcaption>
      </figure>
      <figure class="case-study-figure">
        <a href="/assets/PySpark.PNG">
          <img src="/assets/PySpark.PNG" alt="PySpark notebook screenshot showing shift reconstruction and Delta merge transformation logic" width="783" height="751">
        </a>
        <figcaption>The PySpark screenshot shows the notebook-based implementation pattern behind the shift reconstruction and Delta table publication logic.</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="case-study-section" aria-labelledby="result-heading">
  <div class="case-study-section__heading">
    <p class="eyebrow">Result</p>
    <h2 id="result-heading">A maintainable basis for downstream BI</h2>
  </div>
  <div class="case-study-section__body">
    <div class="case-study-result">
      <p>The pipeline created a repeatable workforce-data ingestion pattern, reconstructed shift and break records for reporting use, supported controlled incremental refresh and improved traceability through run logging.</p>
      <p>Reconciliation with legacy reporting helped build confidence in the new output, while the Delta MERGE pattern gave downstream BI a cleaner and more maintainable data foundation.</p>
    </div>
  </div>
</section>

<section class="case-study-section" aria-labelledby="tradeoffs-next-heading">
  <div class="case-study-section__heading">
    <p class="eyebrow">Trade-offs and next steps</p>
    <h2 id="tradeoffs-next-heading">What I would strengthen next</h2>
  </div>
  <div class="case-study-section__body">
    <p>The implementation prioritised a practical Fabric notebook workflow that could support both historical loading and scheduled incremental refresh inside the existing reporting environment.</p>
    <ul class="case-study-list">
      <li>Expand automated validation coverage for required fields, event order and unusual shift durations.</li>
      <li>Add stronger API failure handling and alerting around scheduled loads.</li>
      <li>Generalise extraction patterns so additional workforce-data use cases can reuse the same approach.</li>
      <li>Continue improving monitoring so downstream BI consumers can see whether the latest load completed as expected.</li>
    </ul>
  </div>
</section>

<nav class="case-study-cta" aria-label="Case study actions">
  <a class="button" href="/projects.html">Back to Work</a>
  <a class="button--secondary" href="/contact.html">Contact</a>
  <a class="button--secondary" href="/assets/cv/Arsalan-Iftikhar-CV.pdf" download>Download CV</a>
</nav>
