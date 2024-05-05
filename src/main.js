import "./settings-dialog.js";

import { calcInterest } from "./calc-interest.js";
import { labelUpdater } from "./label-updater.js";
import { formatMoney } from "./format-number.js";

const html = String.raw;

labelUpdater();

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
    <h2>Total: ${formatMoney(total)}</h2>
    <h2>Total Invested: ${formatMoney(totalInvested)}</h2>
    <h2>Total Interest: ${formatMoney(totalInterest)}</h2>
  `;
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
