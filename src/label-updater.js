import { formatNumber } from "./format-number.js";

/**
 *
 * @param {HTMLElement | null} v
 * @returns {v is HTMLInputElement}
 */
function isHTMLInputElement(v) {
  return v instanceof HTMLInputElement;
}

export function labelUpdater() {
  /** @type {NodeListOf<HTMLLabelElement>} */
  const labels = document.querySelectorAll("#ic-form label");
  /** @type {Map<string, string>} */
  const initialValues = new Map();
  for (const label of labels) {
    initialValues.set(label.htmlFor, label.innerText);
    const input = label.control;
    if (!isHTMLInputElement(input)) {
      throw new Error(`input id ${label.htmlFor} not found`);
    }

    const formattedValue = formatNumber(input.valueAsNumber);
    label.innerHTML = `${initialValues.get(label.htmlFor)}: ${formattedValue}`;

    input.addEventListener("input", () => {
      const formattedValue = formatNumber(input.valueAsNumber);
      label.innerHTML = `${initialValues.get(
        label.htmlFor
      )}: ${formattedValue}`;
    });
  }
}
