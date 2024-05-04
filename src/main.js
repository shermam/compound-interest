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
function getNumber(formData, field) {
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

/**
 *
 * @param {{
 *  initialValue: number;
 *  icPeriod: number;
 *  icPeriodUnit: number;
 *  icInterestRate: number;
 *  icInterestPeriod: number;
 *  icPeriodicValue: number;
 * }} param0
 * @returns {{
 *   total: number;
 *   totalInvested: number;
 *   totalInterest: number;
 * }}
 */
export function calcInterest({
  initialValue,
  icPeriod,
  icPeriodUnit,
  icInterestRate,
  icInterestPeriod,
  icPeriodicValue,
}) {
  const periodMonths = icPeriod * icPeriodUnit;
  const monthlyInterestRate =
    Math.pow(icInterestRate / 100 + 1, 1 / icInterestPeriod) - 1;

  let total = initialValue;
  let totalInvested = initialValue;
  let totalInterest = 0;

  for (let i = 0; i < periodMonths; i++) {
    const interest = total * monthlyInterestRate;
    totalInvested += icPeriodicValue;
    totalInterest += interest;
    total += icPeriodicValue + interest;
  }

  return {
    total,
    totalInterest,
    totalInvested,
  };
}

icForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(icForm);
  const initialValue = getNumber(formData, "ic-initial-value");
  const icPeriodicValue = getNumber(formData, "ic-periodic-value");
  const icInterestRate = getNumber(formData, "ic-interest-rate");
  const icInterestPeriod = getNumber(formData, "ic-interest-period");
  const icPeriod = getNumber(formData, "ic-period");
  const icPeriodUnit = getNumber(formData, "ic-period-unit");

  renderResult(
    calcInterest({
      initialValue,
      icPeriod,
      icPeriodUnit,
      icInterestRate,
      icInterestPeriod,
      icPeriodicValue,
    })
  );
});
