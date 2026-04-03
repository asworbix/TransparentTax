/**
 * UI rendering functions for TransparentSkat
 */

/**
 * Public Spending Section rendering
 */

function initSpendingTabs() {
    const tabs = document.querySelectorAll('.spending-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const parent = this.closest('.card') || this.parentElement.parentElement;
            const siblingTabs = this.parentElement.querySelectorAll('.spending-tab');
            siblingTabs.forEach(t => t.classList.remove('active'));
            parent.querySelectorAll('.spending-tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const tabContent = parent.querySelector('#tab-' + this.dataset.tab);
            if (tabContent) tabContent.classList.add('active');
        });
    });

    // Sector selector for operational breakdown
    const sectorSelect = document.getElementById('op-sector-select');
    if (sectorSelect) {
        sectorSelect.addEventListener('change', function () {
            renderOperationalBreakdown(this.value);
        });
    }
}

function renderBudgetVsActual() {
    const table = document.getElementById('budget-actual-table');
    if (!table) return;

    const totalBudget = BUDGET_VS_ACTUAL.reduce((s, r) => s + r.budgetBn, 0);
    const totalActual = BUDGET_VS_ACTUAL.reduce((s, r) => s + r.actualBn, 0);
    const totalUnused = totalBudget - totalActual;

    let html = `
        <div class="ba-header">
            <div class="ba-col-name">Sektor</div>
            <div class="ba-col">Budget</div>
            <div class="ba-col">Brugt</div>
            <div class="ba-col">Ubrugt</div>
            <div class="ba-col-bar">Forbrugsgrad</div>
        </div>`;

    BUDGET_VS_ACTUAL.forEach(row => {
        const unused = row.budgetBn - row.actualBn;
        const pctUsed = (row.actualBn / row.budgetBn) * 100;

        html += `
        <div class="ba-row">
            <div class="ba-col-name">
                <span>${row.icon}</span>
                <span>${row.sector}</span>
            </div>
            <div class="ba-col">${row.budgetBn.toFixed(1)} mia.</div>
            <div class="ba-col">${row.actualBn.toFixed(1)} mia.</div>
            <div class="ba-col ba-unused">${unused.toFixed(1)} mia.</div>
            <div class="ba-col-bar">
                <div class="ba-bar">
                    <div class="ba-bar-fill" style="width: ${pctUsed}%; background: ${row.color};"></div>
                </div>
                <span class="ba-pct">${pctUsed.toFixed(0)}%</span>
            </div>
        </div>
        <div class="ba-note">${row.note}</div>`;
    });

    // Total row
    const totalPct = (totalActual / totalBudget) * 100;
    html += `
        <div class="ba-row ba-row-total">
            <div class="ba-col-name"><strong>I alt (disse sektorer)</strong></div>
            <div class="ba-col"><strong>${totalBudget.toFixed(1)} mia.</strong></div>
            <div class="ba-col"><strong>${totalActual.toFixed(1)} mia.</strong></div>
            <div class="ba-col ba-unused"><strong>${totalUnused.toFixed(1)} mia.</strong></div>
            <div class="ba-col-bar">
                <div class="ba-bar">
                    <div class="ba-bar-fill" style="width: ${totalPct}%; background: var(--accent);"></div>
                </div>
                <span class="ba-pct">${totalPct.toFixed(0)}%</span>
            </div>
        </div>
        <div class="ba-your-share">
            I alt blev <strong>${totalUnused.toFixed(1)} mia. kr.</strong> ikke brugt som planlagt i disse sektorer.
        </div>`;

    table.innerHTML = html;
}

function renderOperationalBreakdown(sectorKey) {
    const container = document.getElementById('operational-breakdown');
    const sector = OPERATIONAL_BREAKDOWN[sectorKey];
    if (!sector) return;

    const metaKeys = ['label', 'icon', 'customLabels'];
    const entries = Object.entries(sector)
        .filter(([k]) => !metaKeys.includes(k))
        .sort((a, b) => b[1] - a[1]);

    const customLabels = sector.customLabels || {};

    let html = `<h4>${sector.icon ? sector.icon + ' ' : ''}${sector.label}</h4><div class="op-bars">`;

    entries.forEach(([key, pct]) => {
        const label = customLabels[key] || COST_LABELS[key] || key;
        const color = COST_COLORS[key] || '#94a3b8';
        html += `
            <div class="op-bar-row">
                <div class="op-bar-label">
                    <span class="op-dot" style="background: ${color};"></span>
                    <span>${label}</span>
                </div>
                <div class="op-bar-track">
                    <div class="op-bar-fill" style="width: ${pct}%; background: ${color};"></div>
                </div>
                <div class="op-bar-pct">${pct}%</div>
            </div>`;
    });

    html += '</div>';
    container.innerHTML = html;
}

function renderQuarterlyFlow() {
    const chart = document.getElementById('quarterly-chart');
    const details = document.getElementById('quarterly-details');
    const expectedPerQ = 25;

    let chartHtml = '<div class="q-bars">';
    let detailsHtml = '';

    QUARTERLY_FLOW.pattern.forEach(q => {
        const isOver = q.percentSpent > expectedPerQ;
        const barClass = isOver ? 'q-bar-over' : 'q-bar-under';

        chartHtml += `
            <div class="q-bar-col">
                <div class="q-bar-value">${q.percentSpent}%</div>
                <div class="q-bar ${barClass}" style="height: ${q.percentSpent * 2.8}px;"></div>
                <div class="q-bar-label">${q.quarter}</div>
            </div>`;

        detailsHtml += `
            <div class="q-detail ${isOver ? 'q-detail-warn' : ''}">
                <div class="q-detail-header">
                    <strong>${q.quarter}</strong>
                    <span>${q.percentSpent}% af budget</span>
                </div>
                <p>${q.note}</p>
            </div>`;
    });

    chartHtml += '</div>';
    chartHtml += `<div class="q-baseline"><span>Jævn fordeling ville være 25% pr. kvartal</span></div>`;

    chart.innerHTML = chartHtml;
    details.innerHTML = detailsHtml;

    // Q4 insight
    const q4 = QUARTERLY_FLOW.pattern[3];
    document.getElementById('quarterly-insight').innerHTML =
        `I Q4 bruges ${q4.percentSpent}% af det samlede årsbudget - ${q4.percentSpent - 25} procentpoint mere end ved en jævn fordeling. ${QUARTERLY_FLOW.carryoverExplanation}`;

    // Carryover
    document.getElementById('carryover-text').textContent = QUARTERLY_FLOW.carryoverExplanation;
    document.getElementById('carryover-amount-value').textContent =
        QUARTERLY_FLOW.totalCarryoverBn + ' mia. kr.';

    renderAppropriationRules();
}

function renderAppropriationRules() {
    const container = document.getElementById('appropriation-rules');
    if (!container) return;

    const rules = APPROPRIATION_RULES;
    const ruleKeys = Object.keys(rules);

    container.innerHTML = ruleKeys.map(key => {
        const rule = rules[key];
        const canCarry = rule.carryForward;
        return `
            <div class="rule-card ${canCarry ? 'rule-carry' : 'rule-lapse'}">
                <div class="rule-header">
                    <span class="rule-status">${canCarry ? 'Kan videreføres' : 'Bortfalder'}</span>
                </div>
                <h5>${rule.name}</h5>
                <p class="rule-name-en">${rule.nameEn}</p>
                <p class="rule-limit"><strong>Begrænsning:</strong> ${rule.limit}</p>
                <p class="rule-lapse-text"><strong>Ubrugte midler:</strong> ${rule.lapse}</p>
                <p class="rule-source">${rule.source}</p>
            </div>`;
    }).join('');
}

function renderSpendingIssues() {
    const list = document.getElementById('issues-list');

    list.innerHTML = SPENDING_ISSUES.map(issue => `
        <div class="issue-card issue-${issue.severity}">
            <div class="issue-header">
                <span class="issue-icon">${issue.icon}</span>
                <div>
                    <h4>${issue.title}</h4>
                    <span class="issue-amount">${issue.amount}</span>
                </div>
            </div>
            <ul class="issue-examples">
                ${issue.examples.map(ex => `<li>${ex}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function renderPublicSpending() {
    initSpendingTabs();
    renderBudgetVsActual();
    renderOperationalBreakdown('overall');
    renderQuarterlyFlow();
    renderSpendingIssues();
}

/**
 * IT Deep-Dive Section rendering
 */

function initDeepDiveTabs() {
    const section = document.getElementById('it-deepdive-section');
    if (!section) return;
    const tabs = section.querySelectorAll('.spending-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            section.querySelectorAll('.spending-tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            section.querySelector('#tab-' + this.dataset.tab).classList.add('active');
        });
    });
}

function renderCaseStudies() {
    const container = document.getElementById('case-studies-list');
    if (!container) return;

    container.innerHTML = IT_CASE_STUDIES.map(cs => {
        const severityClass = cs.severity === 'catastrophic' ? 'case-catastrophic' : 'case-critical';
        return `
        <div class="case-card ${severityClass}">
            <div class="case-header" onclick="this.parentElement.classList.toggle('case-open')">
                <div class="case-title-row">
                    <span class="case-icon">${cs.icon}</span>
                    <div>
                        <h4>${cs.name}</h4>
                        <span class="case-org">${cs.org} - ${cs.years}</span>
                    </div>
                </div>
                <div class="case-stats">
                    <div class="case-stat">
                        <span class="case-stat-label">Budget</span>
                        <span class="case-stat-value">${cs.budgetOriginal}</span>
                    </div>
                    <div class="case-stat">
                        <span class="case-stat-label">Reelt</span>
                        <span class="case-stat-value case-stat-over">${cs.budgetFinal}</span>
                    </div>
                    <div class="case-stat">
                        <span class="case-stat-label">Resultat</span>
                        <span class="case-stat-value case-stat-outcome">${cs.outcome}</span>
                    </div>
                </div>
                <span class="case-expand-icon">+</span>
            </div>
            <div class="case-body">
                ${cs.vendors ? `<div class="case-vendors"><strong>Leverandører:</strong> ${cs.vendors}</div>` : ''}
                ${cs.lostValue ? `<div class="case-lost"><strong>Tabt værdi:</strong> ${cs.lostValue}</div>` : ''}
                ${cs.lawsuit ? `<div class="case-lawsuit"><strong>Retssag:</strong> ${cs.lawsuit}</div>` : ''}
                ${cs.aftermathNote ? `<div class="case-aftermath"><strong>Bemærkelsesværdigt:</strong> ${cs.aftermathNote}</div>` : ''}
                ${cs.bidNote ? `<div class="case-lawsuit"><strong>Udbuddet:</strong> ${cs.bidNote}</div>` : ''}
                ${cs.conflictOfInterest ? `<div class="case-aftermath"><strong>Interessekonflikt:</strong> ${cs.conflictOfInterest}</div>` : ''}
                ${cs.settlementNote ? `<div class="case-lawsuit"><strong>Forlig:</strong> ${cs.settlementNote}</div>` : ''}
                ${cs.usabilityNote ? `<div class="case-lost"><strong>Brugervenlighed:</strong> ${cs.usabilityNote}</div>` : ''}
                <h5>Tidslinje</h5>
                <div class="case-timeline">
                    ${cs.timeline.map(t => `
                        <div class="tl-item">
                            <span class="tl-year">${t.year}</span>
                            <span class="tl-event">${t.event}</span>
                        </div>
                    `).join('')}
                </div>
                <h5>Hvad gik galt?</h5>
                <div class="case-causes">
                    ${cs.rootCauses.map(rc => `
                        <div class="rc-item">
                            <strong>${rc.cause}</strong>
                            <p>${rc.detail}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>`;
    }).join('');
}

function renderRootCauses() {
    const container = document.getElementById('root-causes-grid');
    if (!container) return;

    container.innerHTML = SYSTEMIC_ROOT_CAUSES.map(rc => `
        <div class="rc-card" style="border-left-color: ${rc.color};">
            <div class="rc-card-header">
                <span class="rc-card-icon">${rc.icon}</span>
                <h4>${rc.title}</h4>
            </div>
            <p>${rc.description}</p>
            <span class="rc-frequency">${rc.frequency}</span>
        </div>
    `).join('');
}

function renderSolutions() {
    const container = document.getElementById('solutions-list');
    if (!container) return;

    container.innerHTML = MODERN_SOLUTIONS.map(sol => `
        <div class="solution-card">
            <div class="solution-header">
                <span class="solution-icon">${sol.icon}</span>
                <div>
                    <h4>${sol.title}</h4>
                    <span class="solution-saving">${sol.savings}</span>
                </div>
            </div>
            <p class="solution-desc">${sol.description}</p>
            <div class="solution-addresses">
                <span class="solution-addresses-label">Adresserer:</span>
                ${sol.rootCauses.map(rcId => {
                    const rc = SYSTEMIC_ROOT_CAUSES.find(r => r.id === rcId);
                    return rc ? `<span class="solution-tag" style="border-color: ${rc.color}; color: ${rc.color};">${rc.title}</span>` : '';
                }).join('')}
            </div>
            <h5>Hvordan virker det?</h5>
            <ul class="solution-steps">
                ${sol.howItWorks.map(step => `<li>${step}</li>`).join('')}
            </ul>
            <div class="solution-orbix">
                <strong><a href="https://orbixcore.ai" target="_blank" rel="noopener" class="orbix-inline-link">Orbix Core</a>:</strong> ${sol.orbixAngle}
            </div>
        </div>
    `).join('');
}

function renderSavingsCalculator() {
    const container = document.getElementById('savings-calculator');
    if (!container) return;

    const s = IT_WASTE_SUMMARY;
    const annualITWaste = s.totalWastedBn / 15;

    const reqSaving = annualITWaste * s.potentialSavingsAI.requirementsPhase;
    const devSaving = annualITWaste * s.potentialSavingsAI.developmentPhase;
    const consultSaving = s.annualConsultantBn * s.potentialSavingsAI.consultantReduction;
    const totalSaving = reqSaving + devSaving + consultSaving;

    container.innerHTML = `
        <div class="savings-grid">
            <div class="savings-card savings-waste">
                <div class="savings-label">Årligt spildt på fejlslagne IT-projekter</div>
                <div class="savings-amount">${annualITWaste.toFixed(1)} mia. kr.</div>
                <div class="savings-note">Baseret på ~${s.totalWastedBn} mia. kr. spildt over 15 år</div>
            </div>
            <div class="savings-card savings-consultant">
                <div class="savings-label">Årlige konsulentudgifter</div>
                <div class="savings-amount">${s.annualConsultantBn} mia. kr.</div>
                <div class="savings-note">Eksterne konsulenter til offentlige IT-projekter</div>
            </div>
        </div>

        <h4>Hvis vi brugte AI og moderne metoder:</h4>
        <div class="savings-breakdown">
            <div class="sb-row">
                <div class="sb-label">
                    AI-kravanalyse (sparer 40% af fejlslagne projekter)
                </div>
                <div class="sb-amount sb-green">-${reqSaving.toFixed(1)} mia. kr.</div>
            </div>
            <div class="sb-row">
                <div class="sb-label">
                    Trinvis levering + AI-test (sparer 30% yderligere)
                </div>
                <div class="sb-amount sb-green">-${devSaving.toFixed(1)} mia. kr.</div>
            </div>
            <div class="sb-row">
                <div class="sb-label">
                    AI erstatter konsulenter (50% reduktion)
                </div>
                <div class="sb-amount sb-green">-${consultSaving.toFixed(1)} mia. kr.</div>
            </div>
            <div class="sb-row sb-total">
                <div class="sb-label"><strong>Potentiel årlig besparelse</strong></div>
                <div class="sb-amount sb-green"><strong>${totalSaving.toFixed(1)} mia. kr.</strong></div>
            </div>
        </div>

        <div class="savings-context">
            <div class="savings-stat">
                <div class="savings-stat-value">${s.avgOverrunPct}%</div>
                <div class="savings-stat-label">Gennemsnitlig budgetoverskridelse (DK)</div>
            </div>
            <div class="savings-stat">
                <div class="savings-stat-value">${s.norwayOverrunPct}%</div>
                <div class="savings-stat-label">Gennemsnitlig budgetoverskridelse (Norge)</div>
            </div>
            <div class="savings-stat">
                <div class="savings-stat-value">${s.projectsFlagged}/${s.projectsMonitored}</div>
                <div class="savings-stat-label">Projekter med advarselslamper (IT-rådet)</div>
            </div>
            <div class="savings-stat">
                <div class="savings-stat-value">${s.projectsRedLight}</div>
                <div class="savings-stat-label">Projekter med rød status (kritisk)</div>
            </div>
        </div>

        <div class="spending-insight-box">
            <span class="insight-icon"></span>
            <div>
                <strong>Norge vs. Danmark</strong>
                <p>Norge har 8% gennemsnitlig budgetoverskridelse på offentlige IT-projekter. Danmark har 108%. Forskellen? Norge bruger trinvis levering, intern ekspertise og tidlig brugertest - præcis det AI kan accelerere og skalere.</p>
            </div>
        </div>
    `;
}

function renderNorwayComparison() {
    const container = document.getElementById('norway-comparison');
    if (!container || typeof NORWAY_COMPARISON === 'undefined') return;

    const d = NORWAY_COMPARISON;

    let html = `
        <div class="norway-hero">
            <div class="norway-hero-stat norway-dk">
                <div class="norway-flag">${d.headline.dk.label}</div>
                <div class="norway-pct" style="color: ${d.headline.dk.color}">${d.headline.dk.overrunPct}%</div>
                <div class="norway-pct-label">budgetoverskridelse</div>
            </div>
            <div class="norway-hero-vs">
                <div class="norway-vs-text">vs.</div>
                <div class="norway-multiplier">${d.headline.multiplier} forskel</div>
            </div>
            <div class="norway-hero-stat norway-no">
                <div class="norway-flag">${d.headline.no.label}</div>
                <div class="norway-pct" style="color: ${d.headline.no.color}">${d.headline.no.overrunPct}%</div>
                <div class="norway-pct-label">budgetoverskridelse</div>
            </div>
        </div>
        <div class="norway-meta">
            <p class="norway-source">Kilde: ${d.headline.source}</p>
            <p class="norway-source">Stikprøve: ${d.headline.sampleSize}. Maksimal overskridelse: Danmark ${d.headline.dk.maxOverrun} vs. Norge ${d.headline.no.maxOverrun}.</p>
            <p class="norway-source">${d.headline.broaderData}</p>
        </div>

        <h3 class="norway-section-title">8 forskelle der forklarer alt</h3>
        <div class="norway-diff-grid">
            ${d.keyDifferences.map(diff => `
                <div class="norway-diff-card">
                    <div class="norway-diff-header">
                        <span class="norway-diff-icon">${diff.icon}</span>
                        <h4>${diff.area}</h4>
                    </div>
                    <div class="norway-diff-body">
                        <div class="norway-diff-col norway-diff-no">
                            <div class="norway-diff-label" style="color: #00843d">Norge</div>
                            <p>${diff.norway}</p>
                        </div>
                        <div class="norway-diff-col norway-diff-dk">
                            <div class="norway-diff-label" style="color: #c8102e">Danmark</div>
                            <p>${diff.denmark}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <h3 class="norway-section-title">Norske succeser - det KAN lade sig gøre</h3>
        <div class="norway-successes">
            ${d.norwegianSuccesses.map(s => `
                <div class="norway-success-card">
                    <h4>${s.name}</h4>
                    <p>${s.description}</p>
                    <div class="norway-success-result">${s.result}</div>
                </div>
            `).join('')}
        </div>

        <h3 class="norway-section-title">Strukturel sammenligning - institutionerne</h3>
        <div class="norway-struct-table">
            <div class="norway-struct-header">
                <div class="norway-struct-col-feature">Område</div>
                <div class="norway-struct-col norway-struct-no">Norge</div>
                <div class="norway-struct-col norway-struct-dk">Danmark</div>
            </div>
            ${d.structuralComparison.map(row => `
                <div class="norway-struct-row">
                    <div class="norway-struct-col-feature">${row.feature}</div>
                    <div class="norway-struct-col norway-struct-no">${row.norway}</div>
                    <div class="norway-struct-col norway-struct-dk">${row.denmark}</div>
                </div>
            `).join('')}
        </div>

        <h3 class="norway-section-title">Rigsrevisionens advarsler - ignoreret år efter år</h3>
        <div class="norway-rr-timeline">
            ${d.rigsrevisionenFindings.map(f => `
                <div class="norway-rr-item">
                    <div class="norway-rr-year">${f.year}</div>
                    <div class="norway-rr-finding">${f.finding}</div>
                </div>
            `).join('')}
        </div>

        <h3 class="norway-section-title">Bent Flyvbjerg - dansk professor der afslørede mønsteret</h3>
        <div class="norway-quotes">
            ${d.flyvbjergQuotes.map(q => `
                <blockquote class="norway-quote">
                    <p>"${q.quote}"</p>
                    <footer>
                        <cite>${q.source}</cite>
                        <span class="norway-quote-ctx">${q.context}</span>
                    </footer>
                </blockquote>
            `).join('')}
        </div>

        <div class="norway-bottom-line">
            <h3>${d.bottomLine.title}</h3>
            <p>${d.bottomLine.text}</p>
            <div class="norway-savings-amount">${d.bottomLine.savingsEstimate}</div>
            <div class="norway-equivalents">
                ${d.bottomLine.equivalents.map(eq => `
                    <div class="norway-equiv">
                        <span class="norway-equiv-icon">${eq.icon}</span>
                        <span>${eq.label}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function renderConsultantBreakdown() {
    const container = document.getElementById('consultant-breakdown');
    if (!container || typeof CONSULTANT_DATA === 'undefined') return;

    const d = CONSULTANT_DATA;

    let html = `
        <div class="kh-stats-grid">
            <div class="kh-stat-card kh-stat-primary">
                <div class="kh-stat-value">${d.totalAnnualSpendBn} mia. kr.</div>
                <div class="kh-stat-label">Statens IT-konsulentforbrug (${d.totalAnnualSpendYear})</div>
                <div class="kh-stat-note">Steg ${d.growthPct}% på ét år</div>
            </div>
            <div class="kh-stat-card kh-stat-cost">
                <div class="kh-stat-value">${d.managementConsultants.consultantMultiplier}</div>
                <div class="kh-stat-label">Konsulent vs. fastansat</div>
                <div class="kh-stat-note">En konsulent koster ${d.managementConsultants.civilServantHourlyRate} vs. 3.000-15.000 kr./time</div>
            </div>
        </div>

        <h3 class="kh-sub-heading">Hvem får pengene? Top IT-konsulentleverandører til staten</h3>
        <div class="consultant-list">
            ${d.topSuppliers.map(s => `
                <div class="consultant-card ${s.controversy ? 'consultant-flagged' : ''}">
                    <div class="consultant-header">
                        <div class="consultant-rank">#${s.rank}</div>
                        <div class="consultant-info">
                            <h4>${s.name}</h4>
                            <span class="consultant-amount">${s.annualStateLabel}/år (${s.pctOfTotal}% af markedet)</span>
                        </div>
                    </div>
                    <p class="consultant-note">${s.note}</p>
                    ${s.controversy ? `<p class="consultant-controversy">${s.controversy}</p>` : ''}
                </div>
            `).join('')}
        </div>

        <h3 class="kh-sub-heading">Hvem tjente på skandalerne?</h3>
        <div class="scandal-consultant-list">
            ${d.scandalInvolvement.map(s => `
                <div class="scandal-consultant-card">
                    <div class="scandal-consultant-header">
                        <h4>${s.scandal}</h4>
                        <span class="scandal-cost">${s.totalCost} tabt</span>
                    </div>
                    <div class="scandal-details">
                        <p><strong>Konsulenter:</strong> ${s.consultants}</p>
                        <p><strong>Ansvarlig:</strong> ${s.whoDecided}</p>
                        <p class="scandal-what-happened">${s.whatHappened}</p>
                    </div>
                </div>
            `).join('')}
        </div>

        <h3 class="kh-sub-heading">Management-konsulenterne: Strategirådgivning til millioner</h3>
        <div class="mgmt-consultant-list">
            ${d.managementConsultants.topFirms.map(f => `
                <div class="mgmt-consultant-row">
                    <div class="mgmt-consultant-info">
                        <strong>${f.name}</strong>
                        <span>${f.role}</span>
                    </div>
                    <div class="mgmt-consultant-rate">${f.hourlyRate}</div>
                    ${f.controversy ? `<p class="mgmt-consultant-controversy">${f.controversy}</p>` : ''}
                </div>
            `).join('')}
        </div>

        ${d.vendorLockIn ? `
        <h3 class="kh-sub-heading">Vendor Lock-in: Staten er fanget</h3>
        <div class="kh-stats-grid">
            <div class="kh-stat-card kh-stat-primary">
                <div class="kh-stat-value">${d.vendorLockIn.criticalSystems}</div>
                <div class="kh-stat-label">Samfundskritiske IT-systemer</div>
            </div>
            <div class="kh-stat-card kh-stat-cost">
                <div class="kh-stat-value">${d.vendorLockIn.cannotBeTendered}</div>
                <div class="kh-stat-label">Systemer der IKKE kan sendes i udbud</div>
                <div class="kh-stat-note">Total vendor lock-in</div>
            </div>
        </div>
        <p class="tab-intro">${d.vendorLockIn.legacyNote}</p>
        ` : ''}

        ${d.serialOffenders ? `
        <h3 class="kh-sub-heading">Serieforbryderne: Leverandører der fejler igen og igen</h3>
        <div class="scandal-consultant-list">
            <div class="scandal-consultant-card">
                <div class="scandal-consultant-header">
                    <h4>${d.serialOffenders.cscDxc.name}</h4>
                    <span class="scandal-cost">Privatiseret offentlig IT</span>
                </div>
                <div class="scandal-details">
                    <p class="consultant-note">${d.serialOffenders.cscDxc.origin}</p>
                    <ul class="serial-offender-list">
                        ${d.serialOffenders.cscDxc.scandals.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                    <p class="consultant-controversy">Drifter stadig: ${d.serialOffenders.cscDxc.stillOperates}</p>
                </div>
            </div>
            <div class="scandal-consultant-card">
                <div class="scandal-consultant-header">
                    <h4>${d.serialOffenders.kmd.name}</h4>
                    <span class="scandal-cost">${d.serialOffenders.kmd.totalPublicRevenue}</span>
                </div>
                <div class="scandal-details">
                    <p class="consultant-note">${d.serialOffenders.kmd.origin}</p>
                    <p><strong>Monopol brudt:</strong> ${d.serialOffenders.kmd.monopolBreak}</p>
                    <p class="consultant-controversy">${d.serialOffenders.kmd.penalties}</p>
                </div>
            </div>
            <div class="scandal-consultant-card">
                <div class="scandal-consultant-header">
                    <h4>${d.serialOffenders.netcompany.name}</h4>
                    <span class="scandal-cost">18% af statens IT-marked</span>
                </div>
                <div class="scandal-details">
                    <p class="consultant-controversy">${d.serialOffenders.netcompany.gdprFine}</p>
                    <p class="consultant-controversy">${d.serialOffenders.netcompany.monopolWarning}</p>
                </div>
            </div>
        </div>
        ` : ''}

        <div class="spending-insight-box insight-warn">
            <span class="insight-icon"></span>
            <div>
                <strong>Regeringens brudte løfte</strong>
                <p>${d.concentrationNote}</p>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function renderNetcompanyDeepDive() {
    const container = document.getElementById('netcompany-deepdive');
    if (!container || typeof NETCOMPANY_DEEP_DIVE === 'undefined') return;

    const n = NETCOMPANY_DEEP_DIVE;

    let html = `
        <div class="kh-stats-grid">
            <div class="kh-stat-card kh-stat-primary">
                <div class="kh-stat-value">${n.overview.revenue2025}</div>
                <div class="kh-stat-label">Omsætning 2025</div>
                <div class="kh-stat-note">+${n.overview.revenueGrowth} vækst. ${n.overview.earningsDown}</div>
            </div>
            <div class="kh-stat-card kh-stat-cost">
                <div class="kh-stat-value">~33%</div>
                <div class="kh-stat-label">Af statens IT-projekter</div>
                <div class="kh-stat-note">34 af 104 projekter, 111 af 723 systemer</div>
            </div>
            <div class="kh-stat-card">
                <div class="kh-stat-value">#60 af 60</div>
                <div class="kh-stat-label">Image blandt IT-folk</div>
                <div class="kh-stat-note">Absolut bundplacering (Ingeniøren 2025)</div>
            </div>
            <div class="kh-stat-card kh-stat-cost">
                <div class="kh-stat-value">${n.overview.employees}</div>
                <div class="kh-stat-label">Medarbejdere</div>
                <div class="kh-stat-note">Inkl. SDC-opkøb (1 mia. kr.). 21,7% omsætning. 100+ NDA-fratrædelser</div>
            </div>
        </div>

        <h3 class="kh-sub-heading">Tidslinje 2025-2026</h3>
        <div class="scandal-consultant-list">
            ${n.timeline2025_2026.map(t => `
                <div class="scandal-consultant-card">
                    <div class="scandal-consultant-header">
                        <h4>${t.date}</h4>
                    </div>
                    <div class="scandal-details">
                        <p>${t.event}</p>
                    </div>
                </div>
            `).join('')}
        </div>

        <h3 class="kh-sub-heading">Hvorfor vinder Netcompany altid?</h3>
        <div class="scandal-consultant-list">
            ${n.whyTheyKeepWinning.map(w => `
                <div class="scandal-consultant-card">
                    <div class="scandal-consultant-header">
                        <h4>${w.reason}</h4>
                    </div>
                    <div class="scandal-details">
                        <p>${w.detail}</p>
                    </div>
                </div>
            `).join('')}
        </div>

        <h3 class="kh-sub-heading">Dokumenterede fejl og problemer</h3>
        <div class="consultant-list">
            ${n.documentedFailures.map(f => `
                <div class="consultant-card consultant-flagged">
                    <div class="consultant-header">
                        <div class="consultant-info">
                            <h4>${f.project}</h4>
                        </div>
                    </div>
                    <p class="consultant-controversy">${f.issue}</p>
                </div>
            `).join('')}
        </div>

        <h3 class="kh-sub-heading">Sikkerhedssvigt</h3>
        <div class="scandal-consultant-list">
            <div class="scandal-consultant-card">
                <div class="scandal-consultant-header">
                    <h4>${n.securityIncidents.datatyveri2024.title}</h4>
                </div>
                <div class="scandal-details">
                    <p>${n.securityIncidents.datatyveri2024.detail}</p>
                    <p class="consultant-controversy">${n.securityIncidents.datatyveri2024.expertQuote}</p>
                </div>
            </div>
            <div class="scandal-consultant-card">
                <div class="scandal-consultant-header">
                    <h4>${n.securityIncidents.gdprBot.title}</h4>
                </div>
                <div class="scandal-details">
                    <p>${n.securityIncidents.gdprBot.detail}</p>
                </div>
            </div>
        </div>

        <h3 class="kh-sub-heading">Selskabsstruktur og skattely</h3>
        <div class="spending-insight-box insight-warn">
            <span class="insight-icon"></span>
            <div>
                <p>${n.corporateStructure.jersey}</p>
                <p class="consultant-controversy">${n.corporateStructure.rogaczewskiQuote}</p>
            </div>
        </div>

        <h3 class="kh-sub-heading">Arbejdskultur</h3>
        <div class="kh-stats-grid">
            <div class="kh-stat-card kh-stat-cost">
                <div class="kh-stat-value">${n.workCulture.imageRank.split(' ')[0]}</div>
                <div class="kh-stat-label">Sidsteplads i imageundersøgelse</div>
                <div class="kh-stat-note">Faldet fra #35 (2023) til #60 (2025)</div>
            </div>
        </div>
        <div class="scandal-consultant-list">
            <div class="scandal-consultant-card">
                <div class="scandal-details">
                    <p><strong>IDA:</strong> ${n.workCulture.idaSager}</p>
                    <p class="consultant-controversy"><strong>PROSA:</strong> ${n.workCulture.prosaWarning}</p>
                    <p><strong>SDC-opkøbet:</strong> ${n.workCulture.sdcOverenskomst}</p>
                    <p><strong>Netcompany:</strong> ${n.workCulture.netcompanyResponse}</p>
                </div>
            </div>
        </div>

        <div class="spending-insight-box insight-warn">
            <span class="insight-icon"></span>
            <div>
                <strong>Den systemiske risiko</strong>
                <p>${n.systemicRisk}</p>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function renderOrbixCore() {
    const container = document.getElementById('orbixcore-section');
    if (!container || typeof ORBIX_CORE_DATA === 'undefined') return;

    const o = ORBIX_CORE_DATA;

    let html = `
        <div class="orbix-intro">
            <p class="orbix-tagline">${o.tagline}</p>
            <p>${o.intro}</p>
        </div>

        <h3 class="kh-sub-heading">Problem → Løsning: Punkt for punkt</h3>
        <div class="orbix-problems-grid">
            ${o.problemSolutionMap.map(p => `
                <div class="orbix-problem-card">
                    <div class="orbix-problem-header">
                        <h4>${p.problem}</h4>
                    </div>
                    <div class="orbix-problem-body">
                        <div class="orbix-problem-side">
                            <span class="orbix-label orbix-label-bad">Hvordan det sker i dag</span>
                            <p>${p.howItHappens}</p>
                            <span class="orbix-case-ref">${p.exampleCase}</span>
                        </div>
                        <div class="orbix-solution-side">
                            <span class="orbix-label orbix-label-good">Orbix Core-tilgangen</span>
                            <p>${p.orbixSolution}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <h3 class="kh-sub-heading">Hvad gør Orbix Core anderledes?</h3>
        <div class="orbix-differentiators">
            ${o.keyDifferentiators.map(d => `
                <div class="orbix-diff-card">
                    <h4>${d.title}</h4>
                    <p>${d.desc}</p>
                </div>
            `).join('')}
        </div>

        <h3 class="kh-sub-heading">Den gamle model vs. den nye</h3>
        <div class="orbix-comparison-table-wrap">
            <table class="orbix-comparison-table">
                <thead>
                    <tr>
                        ${o.comparisonTable.headers.map(h => `<th>${h}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${o.comparisonTable.rows.map(row => `
                        <tr>
                            <td class="orbix-row-label">${row[0]}</td>
                            <td class="orbix-col-old">${row[1]}</td>
                            <td class="orbix-col-new">${row[2]}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="orbix-cta-section">
            <h3>${o.callToAction.headline}</h3>
            <p>${o.callToAction.body}</p>
            <a href="${o.callToAction.linkUrl}" target="_blank" rel="noopener" class="orbix-cta-button">${o.callToAction.linkText}</a>
        </div>
    `;

    container.innerHTML = html;
}

function renderITDeepDive() {
    initDeepDiveTabs();
    renderCaseStudies();
    renderNorwayComparison();
    renderConsultantBreakdown();
    renderNetcompanyDeepDive();
    renderRootCauses();
    renderSolutions();
    renderSavingsCalculator();
    renderOrbixCore();
}
