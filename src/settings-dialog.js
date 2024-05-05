const dialog = document.querySelector("dialog");
const showButton = document.querySelector("button#settings-button");
const closeButton = document.querySelector("button#close-dialog");
const settingsForm = document.querySelector("form#settings-form");

/**
 *
 * @param {Element | null} v
 * @returns {v is HTMLFormElement}
 */
function isHTMLFormElement(v) {
  return v instanceof HTMLFormElement;
}

showButton?.addEventListener("click", () => {
  dialog?.showModal();
});

closeButton?.addEventListener("click", () => {
  dialog?.close();
});

settingsForm?.addEventListener("change", () => {
  if (!isHTMLFormElement(settingsForm))
    throw new Error("settings form not found");
  const formData = new FormData(settingsForm);
  const colorMode = formData.get("color-mode");
  switch (colorMode) {
    case "dark":
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
      break;
    case "light":
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      break;
    case "system":
      document.body.classList.remove("light-mode");
      document.body.classList.remove("dark-mode");
      break;
  }
});
