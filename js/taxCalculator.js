/**
 * Danish Tax Calculator
 * Calculates income tax based on 2025 Danish tax rules.
 */

function calculateDanishTax(grossIncome, options = {}) {
    const { churchTax = true } = options;

    // Step 1: AM-bidrag (labor market contribution) — 8% of gross
    const amBidrag = Math.round(grossIncome * TAX_RATES.amBidrag);

    // Step 2: Taxable income after AM-bidrag
    const incomeAfterAM = grossIncome - amBidrag;

    // Step 3: Personfradrag (personal allowance)
    const personfradrag = TAX_RATES.personfradrag;

    // Step 4: Taxable income for state and municipal tax
    const taxableIncome = Math.max(0, incomeAfterAM - personfradrag);

    // Step 5: Bundskat (bottom bracket state tax)
    const bundskat = Math.round(taxableIncome * TAX_RATES.bundskat);

    // Step 6: Topskat (top bracket tax) - on income above threshold AFTER AM-bidrag
    const topskatBase = Math.max(0, incomeAfterAM - TAX_RATES.topskatThreshold);
    const topskat = Math.round(topskatBase * TAX_RATES.topskatRate);

    // Step 7: Kommuneskat (municipal tax)
    const kommuneskat = Math.round(taxableIncome * TAX_RATES.kommuneskat);

    // Step 8: Kirkeskat (church tax) — optional
    const kirkeskat = churchTax ? Math.round(taxableIncome * TAX_RATES.kirkeskat) : 0;

    // Total income tax (bundskat + topskat + kommuneskat + kirkeskat)
    const incomeTax = bundskat + topskat + kommuneskat + kirkeskat;

    // Total tax including AM-bidrag
    const totalTax = amBidrag + incomeTax;

    // Net income
    const netIncome = grossIncome - totalTax;

    // Effective tax rate
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

    return {
        grossIncome,
        amBidrag,
        incomeAfterAM,
        personfradrag,
        taxableIncome,
        bundskat,
        topskat,
        kommuneskat,
        kirkeskat,
        incomeTax,
        totalTax,
        netIncome,
        effectiveRate,
    };
}

/**
 * Calculate budget allocation for each category
 */
function calculateBudgetAllocation(totalTax) {
    return BUDGET_BREAKDOWN.map(category => ({
        ...category,
        amount: Math.round(totalTax * (category.percent / 100)),
    }));
}

/**
 * Format number as Danish kroner
 */
function formatDKK(amount) {
    return Math.round(amount).toLocaleString('da-DK') + ' kr.';
}

/**
 * Format number with Danish thousands separator
 */
function formatNumber(num) {
    return Math.round(num).toLocaleString('da-DK');
}
