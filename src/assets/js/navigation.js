(() => {
  "use strict";

  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const navId = toggle?.getAttribute("aria-controls");
  const nav = navId ? document.getElementById(navId) : null;

  if (!header || !toggle || !nav) {
    return;
  }

  const openLabel = toggle.getAttribute("data-label-open") || "Open primary navigation";
  const closeLabel = toggle.getAttribute("data-label-close") || "Close primary navigation";
  const desktopQuery = window.matchMedia("(min-width: 769px)");

  function setOpen(isOpen) {
    header.classList.toggle("is-nav-open", isOpen);
    nav.setAttribute("data-state", isOpen ? "open" : "closed");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? closeLabel : openLabel);
  }

  setOpen(false);

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus({ preventScroll: true });
    }
  });

  function clearDesktopState(event) {
    if (event.matches) {
      setOpen(false);
    }
  }

  desktopQuery.addEventListener("change", clearDesktopState);
  clearDesktopState(desktopQuery);
})();
