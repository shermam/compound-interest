const html = String.raw;

/** @type {HTMLFormElement | null} */
const icForm = document.querySelector("form#ic-form");
if (!icForm) throw new Error("form not found");

/**
 *
 * @param {FormData} formData
 * @param {string} field
 *
 * @returns {number}
 */
function get(formData, field) {
  const value = formData.get(field);
  if (!value) throw new Error(`field ${field} not found`);
  return Number(value);
}

/**
 *
 * @param {{
 *   total: number;
 *   totalInvested: number;
 *   totalInterest: number;
 * }} param0
 */
function renderResult({ total, totalInvested, totalInterest }) {
  /** @type {HTMLDivElement | null} */
  const divResult = document.querySelector("div#calc-result");
  if (!divResult) throw new Error("form not found");

  divResult.innerHTML = html`
    <h2>Total: ${total.toFixed(2)}</h2>
    <h2>Total Invested: ${totalInvested.toFixed(2)}</h2>
    <h2>Total Interest: ${totalInterest.toFixed(2)}</h2>
  `;
}

icForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(icForm);
  const initialValue = get(formData, "ic-initial-value");
  const icPeriodicValue = get(formData, "ic-periodic-value");
  const icMonthlyInterestRate = get(formData, "ic-monthly-interest-rate");
  const icPeriod = get(formData, "ic-period");
  const icPeriodUnit = get(formData, "ic-period-unit");

  const periodMonths = icPeriod * icPeriodUnit;
  const monthlyInterestRate = icMonthlyInterestRate / 100;

  let total = initialValue;
  let totalInvested = initialValue;
  let totalInterest = 0;

  for (let i = 0; i < periodMonths; i++) {
    const interest = total * monthlyInterestRate;
    totalInvested += icPeriodicValue;
    totalInterest += interest;
    total += icPeriodicValue + interest;
  }

  renderResult({
    total,
    totalInterest,
    totalInvested,
  });
});
