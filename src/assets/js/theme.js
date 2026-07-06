(() => {
  "use strict";

  const STORAGE_KEY = "portfolio-theme";
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const labelTarget = toggle?.querySelector("[data-theme-toggle-text]");

  function isTheme(value) {
    return value === "light" || value === "dark";
  }

  function getStoredTheme() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      return;
    }
  }

  function getSystemTheme() {
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  }

  function getCurrentTheme() {
    const current = root.getAttribute("data-theme");
    return isTheme(current) ? current : getSystemTheme();
  }

  function updateToggle(theme) {
    if (!toggle) {
      return;
    }

    const nextTheme = theme === "dark" ? "light" : "dark";
    const nextLabel = `Switch to ${nextTheme} theme`;

    toggle.setAttribute("aria-label", nextLabel);
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
    toggle.setAttribute("title", nextLabel);

    if (labelTarget) {
      labelTarget.textContent = theme === "dark" ? "Dark" : "Light";
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    updateToggle(theme);
  }

  const storedTheme = getStoredTheme();
  applyTheme(isTheme(storedTheme) ? storedTheme : getCurrentTheme());

  toggle?.addEventListener("click", () => {
    const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    setStoredTheme(nextTheme);
  });

  const systemThemeQuery = window.matchMedia?.("(prefers-color-scheme: dark)");

  systemThemeQuery?.addEventListener("change", () => {
    if (!isTheme(getStoredTheme())) {
      applyTheme(getSystemTheme());
    }
  });
})();
