/**
 * Dressify — mobile menu + cart badge
 */

function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".nav-menu");
  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  setupMobileMenu();
});
