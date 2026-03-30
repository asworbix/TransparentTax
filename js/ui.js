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

    let html = `<h4>${sector.icon || '📊'} ${sector.label}</h4><div class="op-bars">`;

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
                    <span class="rule-status">${canCarry ? '🔄 Kan videreføres' : '⛔ Bortfalder'}</span>
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
                ${cs.lostValue ? `<div class="case-lost"><strong>Tabt værdi:</strong> ${cs.lostValue}</div>` : ''}
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
                <strong><a href="https://orbixcore.ai" target="_blank" rel="noopener" class="orbix-inline-link">Orbix</a>:</strong> ${sol.orbixAngle}
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
                    <span>🤖</span> AI-kravanalyse (sparer 40% af fejlslagne projekter)
                </div>
                <div class="sb-amount sb-green">-${reqSaving.toFixed(1)} mia. kr.</div>
            </div>
            <div class="sb-row">
                <div class="sb-label">
                    <span>🔄</span> Trinvis levering + AI-test (sparer 30% yderligere)
                </div>
                <div class="sb-amount sb-green">-${devSaving.toFixed(1)} mia. kr.</div>
            </div>
            <div class="sb-row">
                <div class="sb-label">
                    <span>🏛️</span> AI erstatter konsulenter (50% reduktion)
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
            <span class="insight-icon">💡</span>
            <div>
                <strong>Norge vs. Danmark</strong>
                <p>Norge har 8% gennemsnitlig budgetoverskridelse på offentlige IT-projekter. Danmark har 108%. Forskellen? Norge bruger trinvis levering, intern ekspertise og tidlig brugertest - præcis det AI kan accelerere og skalere.</p>
            </div>
        </div>
    `;
}

function renderITDeepDive() {
    initDeepDiveTabs();
    renderCaseStudies();
    renderRootCauses();
    renderSolutions();
    renderSavingsCalculator();
}


/**
 * Kontanthjælp Section rendering
 */

function renderKontanthjaelp() {
    const section = document.getElementById('kontanthjaelp-section');
    if (!section) return;

    // Init tabs for this section
    const tabs = section.querySelectorAll('.spending-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            section.querySelectorAll('.spending-tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            section.querySelector('#tab-' + this.dataset.tab).classList.add('active');
        });
    });

    renderKHOverview();
    renderKHProblem();
    renderKHReform();
    renderKHResearch();
    renderKHWhatWorks();
}

function renderKHOverview() {
    const container = document.getElementById('kh-overview-content');
    if (!container) return;

    const d = KONTANTHJAELP_DATA.overview;
    const cats = KONTANTHJAELP_DATA.categories;

    container.innerHTML = `
        <div class="kh-stats-grid">
            <div class="kh-stat-card kh-stat-primary">
                <div class="kh-stat-value">${formatNumber(d.totalRecipients)}</div>
                <div class="kh-stat-label">Modtagere i alt (${d.totalRecipientsYear})</div>
                <div class="kh-stat-note">Halveret siden ${d.peakYear} (${formatNumber(d.peakRecipients)})</div>
            </div>
            <div class="kh-stat-card">
                <div class="kh-stat-value">${formatNumber(d.jobparateCount)}</div>
                <div class="kh-stat-label">Jobparate</div>
                <div class="kh-stat-note">Vurderet klar til at tage et job</div>
            </div>
            <div class="kh-stat-card">
                <div class="kh-stat-value">${formatNumber(d.aktivitetsparateCount)}</div>
                <div class="kh-stat-label">Aktivitetsparate</div>
                <div class="kh-stat-note">Ikke job-klar pga. udfordringer</div>
            </div>
            <div class="kh-stat-card kh-stat-cost">
                <div class="kh-stat-value">~${d.annualCostBn} mia. kr.</div>
                <div class="kh-stat-label">Årlig udgift</div>
                <div class="kh-stat-note">Halvdelen af forsvarsbudgettet</div>
            </div>
        </div>

        <h3 class="kh-sub-heading">De to kategorier</h3>
        <div class="kh-categories">
            ${cats.map(cat => `
                <div class="kh-category-card">
                    <div class="kh-cat-header">
                        <span class="kh-cat-icon">${cat.icon}</span>
                        <div>
                            <h4>${cat.name} <span class="kh-cat-en">(${cat.nameEn})</span></h4>
                            <span class="kh-cat-count">${formatNumber(cat.count)} personer</span>
                        </div>
                    </div>
                    <p class="kh-cat-desc">${cat.description}</p>
                    <p class="kh-cat-req"><strong>Krav:</strong> ${cat.requirement}</p>
                    <div class="kh-cat-stats">
                        <div class="kh-cat-stat">
                            <span class="kh-cat-stat-value">${cat.inJobAfter6Months}%</span>
                            <span class="kh-cat-stat-label">I job efter 6 mdr.</span>
                        </div>
                    </div>
                    <p class="kh-cat-trend">${cat.trend}</p>
                </div>
            `).join('')}
        </div>

        <h3 class="kh-sub-heading">Hvad koster kontanthjælpen?</h3>
        <div class="kh-cost-breakdown">
            ${KONTANTHJAELP_DATA.costBreakdown.items.map(item => `
                <div class="kh-cost-row">
                    <div class="kh-cost-info">
                        <span class="kh-cost-name">${item.name}</span>
                        <span class="kh-cost-desc">${item.description}</span>
                    </div>
                    <div class="kh-cost-bar-wrap">
                        <div class="kh-cost-bar">
                            <div class="kh-cost-bar-fill" style="width: ${item.pctOfTotal}%;"></div>
                        </div>
                        <span class="kh-cost-pct">${item.pctOfTotal}%</span>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="spending-insight-box">
            <span class="insight-icon">📊</span>
            <div>
                <strong>Demografisk fordeling</strong>
                <p>${d.nonWesternPct}% af ikke-vestlige indvandrere i den erhvervsaktive alder er på kontanthjælp, mod ${d.danishOriginPct}% af danskere med dansk oprindelse. ${d.mindstesatsNonWesternPct}% af modtagere på mindstesatsen har ikke-vestlig baggrund.</p>
            </div>
        </div>
    `;
}

function renderKHProblem() {
    const container = document.getElementById('kh-problem-content');
    if (!container) return;

    const p = KONTANTHJAELP_DATA.theProblem;

    container.innerHTML = `
        <p class="kh-intro-text">${p.intro}</p>

        <div class="kh-problem-stats">
            ${p.stats.map(stat => `
                <div class="kh-problem-stat">
                    <div class="kh-problem-stat-value">${stat.value}</div>
                    <div class="kh-problem-stat-label">${stat.label}</div>
                    <p class="kh-problem-stat-context">${stat.context}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function renderKHReform() {
    const container = document.getElementById('kh-reform-content');
    if (!container) return;

    const r = KONTANTHJAELP_DATA.reform2025;

    container.innerHTML = `
        <div class="kh-reform-header">
            <h3>${r.title}</h3>
            <span class="kh-reform-date">Trådte i kraft: ${r.effectiveDate}</span>
        </div>

        <div class="kh-reform-changes">
            ${r.keyChanges.map(change => `
                <div class="kh-reform-card">
                    <h4>${change.change}</h4>
                    <p>${change.detail}</p>
                </div>
            `).join('')}
        </div>

        <div class="kh-quote-box">
            <blockquote>"${r.governmentQuote}"</blockquote>
            <cite>- ${r.quoteSource}</cite>
        </div>
    `;
}

function renderKHResearch() {
    const container = document.getElementById('kh-research-content');
    if (!container) return;

    const research = KONTANTHJAELP_DATA.research;

    container.innerHTML = `
        <p class="tab-intro">${research.title}</p>
        <div class="kh-research-list">
            ${research.findings.map(f => `
                <div class="kh-research-card ${f.positive ? 'kh-research-positive' : 'kh-research-negative'}">
                    <div class="kh-research-indicator">${f.positive ? '✅' : '❌'}</div>
                    <div class="kh-research-content">
                        <h4>${f.finding}</h4>
                        <p>${f.detail}</p>
                        <span class="kh-research-source">Kilde: ${f.source}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderKHWhatWorks() {
    const container = document.getElementById('kh-whatworks-content');
    if (!container) return;

    const ww = KONTANTHJAELP_DATA.whatWorks;

    container.innerHTML = `
        <h3 class="kh-sub-heading" style="color: var(--green);">Det der virker</h3>
        <div class="kh-methods-grid">
            ${ww.effective.map(m => `
                <div class="kh-method-card kh-method-effective">
                    <span class="kh-method-icon">${m.icon}</span>
                    <h4>${m.method}</h4>
                    <p class="kh-method-effect">${m.effect}</p>
                    <p class="kh-method-detail">${m.detail}</p>
                </div>
            `).join('')}
        </div>

        <h3 class="kh-sub-heading" style="color: var(--accent-light);">Det der IKKE virker</h3>
        <div class="kh-methods-grid">
            ${ww.ineffective.map(m => `
                <div class="kh-method-card kh-method-ineffective">
                    <span class="kh-method-icon">${m.icon}</span>
                    <h4>${m.method}</h4>
                    <p class="kh-method-effect">${m.effect}</p>
                    <p class="kh-method-detail">${m.detail}</p>
                </div>
            `).join('')}
        </div>
    `;
}
