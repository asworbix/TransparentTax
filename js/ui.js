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

function showResults() {
    const results = document.getElementById('results');
    results.classList.remove('hidden');
    // Smooth scroll to results
    setTimeout(() => {
        document.getElementById('tax-summary').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}
