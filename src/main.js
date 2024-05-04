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

// ic-initial-value
// ic-periodic-value
// ic-interest-rate
// ic-interest-period
// ic-period

icForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(icForm);
  const initialValue = get(formData, "ic-initial-value");
  const icPeriodicValue = get(formData, "ic-periodic-value");
  const icInterestRate = get(formData, "ic-interest-rate");
  const icInterestPeriod = get(formData, "ic-interest-period");
  const icPeriod = get(formData, "ic-period");
  const icPeriodUnit = get(formData, "ic-period-unit");

  console.log({
    initialValue,
    icPeriodicValue,
    icInterestRate,
    icInterestPeriod,
    icPeriod,
    icPeriodUnit,
  });
});
