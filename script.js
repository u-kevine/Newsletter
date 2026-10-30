/**
 * Newsletter sign-up form
 * - Validates the email field in real time (empty + format checks)
 * - Shows accessible error messages next to the label
 * - Swaps to a success message containing the submitted email
 * - "Dismiss message" returns the user to a fresh form
 */
(function () {
  "use strict";

  // ---- DOM references ----
  const form = document.getElementById("signup-form");
  const emailInput = document.getElementById("email");
  const errorEl = document.getElementById("email-error");
  const signupCard = document.getElementById("signup");
  const successCard = document.getElementById("success");
  const successEmail = document.getElementById("success-email");
  const successTitle = document.getElementById("success-title");
  const dismissBtn = document.getElementById("dismiss-btn");

  // ---- Validation messages ----
  const MESSAGES = {
    empty: "Email address is required",
    invalid: "Valid email required",
  };

  /**
   * Practical email pattern: something@domain.tld
   * (no spaces, one "@", at least one dot in the domain, 2+ letter TLD)
   */
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

  // Real-time validation only kicks in after the first blur or submit,
  // so users aren't shown an error while they're still typing the first time.
  let hasInteracted = false;

  /**
   * Returns an error key ("empty" | "invalid") or null if the value is valid.
   * @param {string} value
   */
  function getError(value) {
    const trimmed = value.trim();
    if (trimmed === "") return "empty";
    if (!EMAIL_PATTERN.test(trimmed)) return "invalid";
    return null;
  }

  /** Displays an error message and marks the field invalid. */
  function showError(key) {
    errorEl.textContent = MESSAGES[key];
    emailInput.setAttribute("aria-invalid", "true");
  }

  /** Clears any error and marks the field valid. */
  function clearError() {
    errorEl.textContent = "";
    emailInput.setAttribute("aria-invalid", "false");
  }

  /**
   * Validates the field and updates the UI.
   * @returns {boolean} true when the email is valid
   */
  function validate() {
    const error = getError(emailInput.value);
    if (error) {
      showError(error);
      return false;
    }
    clearError();
    return true;
  }

  // ---- Event handlers ----

  // Real-time feedback while typing (after first interaction)
  emailInput.addEventListener("input", function () {
    if (hasInteracted) validate();
  });

  // Validate when the user leaves the field, if they typed something
  emailInput.addEventListener("blur", function () {
    if (emailInput.value.trim() !== "") {
      hasInteracted = true;
      emailInput.classList.add("is-touched");
      validate();
    }
  });

  // Submit: validate, then show success or focus the field
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hasInteracted = true;
    emailInput.classList.add("is-touched");

    if (!validate()) {
      emailInput.focus();
      return;
    }

    // Success: inject the email safely (textContent prevents HTML injection)
    successEmail.textContent = emailInput.value.trim();
    signupCard.hidden = true;
    successCard.hidden = false;

    // Move focus so screen-reader users hear the confirmation
    successTitle.focus();
  });

  // Dismiss: reset everything and return to the form
  dismissBtn.addEventListener("click", function () {
    form.reset();
    errorEl.textContent = "";
    emailInput.removeAttribute("aria-invalid");
    emailInput.classList.remove("is-touched");
    hasInteracted = false;

    successCard.hidden = true;
    signupCard.hidden = false;
    emailInput.focus();
  });
})();
