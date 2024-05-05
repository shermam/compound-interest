const currencyFormatter = new Intl.NumberFormat(navigator.languages, {
  style: "currency",
  currency: "USD", // Hardcoded for now
});

const numberFormatter = new Intl.NumberFormat(navigator.languages, {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

/**
 *
 * @param {number} n
 * @returns {string}
 */
export function formatMoney(n) {
  return currencyFormatter.format(n);
}

/**
 *
 * @param {number} n
 * @returns {string}
 */
export function formatNumber(n) {
  return numberFormatter.format(n);
}
