/**
 * TransparentTax - Main Application
 */

(function () {
    const incomeInput = document.getElementById('income-input');
    const calculateBtn = document.getElementById('calculate-btn');
    const churchTaxCheckbox = document.getElementById('church-tax');
    const quickBtns = document.querySelectorAll('.quick-btn');

    // Format input as user types (Danish number format)
    incomeInput.addEventListener('input', function () {
        let raw = this.value.replace(/[^\d]/g, '');
        if (raw) {
            this.value = parseInt(raw, 10).toLocaleString('da-DK');
        }
    });

    // Quick amount buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const amount = parseInt(this.dataset.amount, 10);
            incomeInput.value = amount.toLocaleString('da-DK');
            runCalculation();
        });
    });

    // Calculate button
    calculateBtn.addEventListener('click', runCalculation);

    // Enter key
    incomeInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            runCalculation();
        }
    });

    function runCalculation() {
        const raw = incomeInput.value.replace(/[^\d]/g, '');
        const income = parseInt(raw, 10);

        if (!income || income <= 0) {
            incomeInput.focus();
            incomeInput.style.borderColor = '#ef4444';
            setTimeout(() => {
                incomeInput.closest('.input-wrapper').style.borderColor = '';
            }, 1500);
            return;
        }

        const options = {
            churchTax: churchTaxCheckbox.checked,
        };

        const result = calculateDanishTax(income, options);

        renderTaxSummary(result);
        renderBreakdown(result.totalTax);
        renderImpact(result.totalTax);
        showResults();
    }
})();
