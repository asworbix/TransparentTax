/**
 * UI rendering functions for TransparentTax
 */

function renderTaxSummary(result) {
    document.getElementById('gross-income').textContent = formatDKK(result.grossIncome);
    document.getElementById('am-bidrag').textContent = '−' + formatDKK(result.amBidrag);
    document.getElementById('income-after-am').textContent = formatDKK(result.incomeAfterAM);
    document.getElementById('personfradrag').textContent = '−' + formatDKK(result.personfradrag);
    document.getElementById('bundskat').textContent = formatDKK(result.bundskat);
    document.getElementById('topskat').textContent = formatDKK(result.topskat);
    document.getElementById('kommuneskat').textContent = formatDKK(result.kommuneskat);
    document.getElementById('kirkeskat').textContent = formatDKK(result.kirkeskat);
    document.getElementById('total-tax').textContent = formatDKK(result.totalTax);
    document.getElementById('net-income').textContent = formatDKK(result.netIncome);
    document.getElementById('effective-rate').textContent = result.effectiveRate.toFixed(1) + '%';

    // Show/hide kirkeskat row
    document.getElementById('kirkeskat-row').style.display =
        result.kirkeskat > 0 ? 'flex' : 'none';

    // Update the tax bar
    renderTaxBar(result);
}

function renderTaxBar(result) {
    const gross = result.grossIncome;
    if (gross === 0) return;

    const segments = [
        { id: 'bar-net', value: result.netIncome },
        { id: 'bar-am', value: result.amBidrag },
        { id: 'bar-bund', value: result.bundskat },
        { id: 'bar-top', value: result.topskat },
        { id: 'bar-kommune', value: result.kommuneskat },
        { id: 'bar-kirke', value: result.kirkeskat },
    ];

    segments.forEach(seg => {
        const el = document.getElementById(seg.id);
        const pct = (seg.value / gross) * 100;
        el.style.width = pct + '%';
        el.style.display = pct < 0.5 ? 'none' : 'flex';
    });
}

function renderBreakdown(totalTax) {
    const allocations = calculateBudgetAllocation(totalTax);
    const grid = document.getElementById('breakdown-grid');
    document.getElementById('breakdown-total-tax').textContent = formatDKK(totalTax);

    // Find max percentage for bar scaling
    const maxPercent = Math.max(...allocations.map(a => a.percent));

    grid.innerHTML = allocations.map(cat => `
        <div class="breakdown-card">
            <div class="card-header">
                <span class="card-icon">${cat.icon}</span>
                <span class="card-title">${cat.name}</span>
            </div>
            <div class="card-amount">${formatDKK(cat.amount)}</div>
            <div class="card-percent">${cat.percent}% af din skat</div>
            <div class="card-bar">
                <div class="card-bar-fill" style="width: ${(cat.percent / maxPercent) * 100}%; background: ${cat.color};"></div>
            </div>
            <div class="card-desc">${cat.description}</div>
        </div>
    `).join('');
}

function renderImpact(totalTax) {
    const list = document.getElementById('impact-list');

    const relevantExamples = IMPACT_EXAMPLES.filter(ex => totalTax >= ex.threshold);

    list.innerHTML = relevantExamples.map(ex => `
        <div class="impact-item">
            <span class="impact-icon">${ex.icon}</span>
            <div class="impact-text">
                <h4>${ex.titleFn(totalTax)}</h4>
                <p>${ex.descFn(totalTax)}</p>
            </div>
        </div>
    `).join('');
}

function getHouseholdProfile() {
    return {
        adults: parseInt(document.getElementById('hh-adults').value),
        nursery: parseInt(document.getElementById('hh-nursery').value),
        kindergarten: parseInt(document.getElementById('hh-kindergarten').value),
        school: parseInt(document.getElementById('hh-school').value),
        highschool: parseInt(document.getElementById('hh-highschool').value),
        university: parseInt(document.getElementById('hh-university').value),
        transport: parseInt(document.getElementById('hh-transport').value),
        doctorVisits: parseInt(document.getElementById('hh-doctor').value),
        hospitalVisits: parseInt(document.getElementById('hh-hospital').value),
        library: parseInt(document.getElementById('hh-library').value) === 1,
    };
}

function renderValueComparison(totalTax) {
    const household = getHouseholdProfile();
    const { items, totalPrivate } = calculatePrivateCost(household, totalTax);

    // Verdict
    const diff = totalPrivate - totalTax;
    const verdictBox = document.getElementById('verdict-box');
    const verdictIcon = document.getElementById('verdict-icon');
    const verdictLabel = document.getElementById('verdict-label');
    const verdictDiff = document.getElementById('verdict-diff');

    document.getElementById('verdict-tax').textContent = formatDKK(totalTax);
    document.getElementById('verdict-private').textContent = formatDKK(totalPrivate);

    if (diff > 0) {
        verdictBox.className = 'verdict-box verdict-positive';
        verdictIcon.textContent = '✅';
        verdictLabel.textContent = 'Du sparer penge på det offentlige system';
        verdictDiff.innerHTML = `Du ville betale <strong>${formatDKK(diff)}</strong> mere om året for de samme services privat. Det svarer til <strong>${formatDKK(Math.round(diff / 12))}/md.</strong> ekstra.`;
    } else {
        verdictBox.className = 'verdict-box verdict-negative';
        verdictIcon.textContent = '⚠️';
        verdictLabel.textContent = 'Du betaler mere end den direkte private pris';
        verdictDiff.innerHTML = `Forskellen er <strong>${formatDKK(Math.abs(diff))}</strong> om året. Men husk: du finansierer også et sikkerhedsnet du kan falde tilbage på, og services for hele samfundet — inkl. ældre, børn og fremtidige generationer.`;
    }

    // Comparison table
    const table = document.getElementById('comparison-table');

    // Split into direct services and shared services
    const directItems = items.filter(i => !i.isShared && i.privateCost > 0);
    const sharedItems = items.filter(i => i.isShared);
    const sharedTotal = sharedItems.reduce((sum, i) => sum + i.privateCost, 0);

    let html = '';

    // Direct services header
    html += '<div class="comp-section-header">Services du bruger direkte</div>';
    directItems.forEach(item => {
        const saving = item.privateCost;
        html += `
            <div class="comp-row">
                <div class="comp-service">
                    <span class="comp-icon">${item.icon}</span>
                    <div>
                        <div class="comp-name">${item.name}</div>
                        <div class="comp-note">${item.note}</div>
                    </div>
                </div>
                <div class="comp-price">${formatDKK(saving)}</div>
            </div>`;
    });

    // Shared services header
    html += '<div class="comp-section-header">Fælles services (din andel som borger)</div>';
    sharedItems.forEach(item => {
        html += `
            <div class="comp-row comp-row-shared">
                <div class="comp-service">
                    <span class="comp-icon">${item.icon}</span>
                    <div>
                        <div class="comp-name">${item.name}</div>
                        <div class="comp-note">${item.note}</div>
                    </div>
                </div>
                <div class="comp-price">${formatDKK(item.privateCost)}</div>
            </div>`;
    });

    // Total row
    html += `
        <div class="comp-row comp-total">
            <div class="comp-service">
                <span class="comp-icon">📊</span>
                <div><div class="comp-name">Samlet privat pris</div></div>
            </div>
            <div class="comp-price comp-price-total">${formatDKK(totalPrivate)}</div>
        </div>
        <div class="comp-row comp-your-tax">
            <div class="comp-service">
                <span class="comp-icon">🧾</span>
                <div><div class="comp-name">Din faktiske skat</div></div>
            </div>
            <div class="comp-price">${formatDKK(totalTax)}</div>
        </div>
        <div class="comp-row comp-diff ${diff > 0 ? 'comp-diff-positive' : 'comp-diff-negative'}">
            <div class="comp-service">
                <span class="comp-icon">${diff > 0 ? '💰' : '📌'}</span>
                <div><div class="comp-name">${diff > 0 ? 'Du sparer' : 'Du betaler mere'}</div></div>
            </div>
            <div class="comp-price">${formatDKK(Math.abs(diff))}</div>
        </div>`;

    table.innerHTML = html;
}

/**
 * Public Spending Section rendering
 */

function initSpendingTabs() {
    const tabs = document.querySelectorAll('.spending-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.spending-tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('tab-' + this.dataset.tab).classList.add('active');
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

function renderBudgetVsActual(totalTax) {
    const table = document.getElementById('budget-actual-table');
    const totalBudget = BUDGET_VS_ACTUAL.reduce((s, r) => s + r.budgetBn, 0);
    const totalActual = BUDGET_VS_ACTUAL.reduce((s, r) => s + r.actualBn, 0);
    const totalUnused = totalBudget - totalActual;

    // User's share scaling factor (their tax as fraction of total public expenditure ~1,357 mia)
    const userShare = totalTax / 1357000000000;

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
        const yourUnused = Math.round((unused / totalBudget) * totalTax);

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
        <div class="ba-note">${row.note} <em>— af dine skattekroner blev ${formatDKK(yourUnused)} ikke brugt her.</em></div>`;
    });

    // Total row
    const totalPct = (totalActual / totalBudget) * 100;
    const yourTotalUnused = Math.round((totalUnused / totalBudget) * totalTax);
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
            Af dine <strong>${formatDKK(totalTax)}</strong> i skat blev ca. <strong>${formatDKK(yourTotalUnused)}</strong> ikke brugt som planlagt i disse sektorer.
        </div>`;

    table.innerHTML = html;
}

function renderOperationalBreakdown(sectorKey) {
    const container = document.getElementById('operational-breakdown');
    const sector = OPERATIONAL_BREAKDOWN[sectorKey];
    if (!sector) return;

    // Get all cost keys (exclude label, icon, customLabels)
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

function renderQuarterlyFlow(totalTax) {
    const chart = document.getElementById('quarterly-chart');
    const details = document.getElementById('quarterly-details');
    const expectedPerQ = 25; // 25% per quarter if even

    let chartHtml = '<div class="q-bars">';
    let detailsHtml = '';

    QUARTERLY_FLOW.pattern.forEach(q => {
        const isOver = q.percentSpent > expectedPerQ;
        const barClass = isOver ? 'q-bar-over' : 'q-bar-under';
        const yourShare = Math.round(totalTax * (q.percentSpent / 100));

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
                    <span>${q.percentSpent}% af budget (${formatDKK(yourShare)} af din skat)</span>
                </div>
                <p>${q.note}</p>
            </div>`;
    });

    chartHtml += '</div>';
    chartHtml += `<div class="q-baseline"><span>Jævn fordeling ville være 25% pr. kvartal</span></div>`;

    chart.innerHTML = chartHtml;
    details.innerHTML = detailsHtml;

    // Q4 insight
    const q4Share = Math.round(totalTax * 0.31);
    const q4Excess = Math.round(totalTax * 0.06); // 31% - 25% = 6% excess
    document.getElementById('quarterly-insight').innerHTML =
        `I Q4 bruges ${QUARTERLY_FLOW.pattern[3].percentSpent}% af det samlede årsbudget — ${QUARTERLY_FLOW.pattern[3].percentSpent - 25} procentpoint mere end ved en jævn fordeling. Af dine skattekroner svarer det til at <strong>${formatDKK(q4Excess)}</strong> bruges i et haste-kvartal med lavere kvalitetskontrol. ${QUARTERLY_FLOW.carryoverExplanation}`;

    // Carryover
    document.getElementById('carryover-text').textContent = QUARTERLY_FLOW.carryoverExplanation;
    document.getElementById('carryover-amount-value').textContent =
        QUARTERLY_FLOW.totalCarryoverBn + ' mia. kr.';

    // Appropriation rules
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

function renderPublicSpending(totalTax) {
    initSpendingTabs();
    renderBudgetVsActual(totalTax);
    renderOperationalBreakdown('overall');
    renderQuarterlyFlow(totalTax);
    renderSpendingIssues();
}

function showResults() {
    const results = document.getElementById('results');
    results.classList.remove('hidden');
    // Smooth scroll to results
    setTimeout(() => {
        document.getElementById('tax-summary').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}
