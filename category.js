/**
 * Dressify — category listing from ?category=slug
 */

const DEFAULT_CATEGORY = "men";

function getSelectedCategory() {
  const params = new URLSearchParams(window.location.search);
  const slug = (params.get("category") || DEFAULT_CATEGORY).toLowerCase();
  const valid = CATEGORIES.some((c) => c.slug === slug);
  return valid ? slug : DEFAULT_CATEGORY;
}

function flashButton(button) {
  button.classList.add("added");
  const prev = button.textContent;
  button.textContent = "Added";
  window.setTimeout(() => {
    button.classList.remove("added");
    button.textContent = prev;
  }, 1000);
}

function renderCategoryNav(activeSlug) {
  const nav = document.getElementById("categoryNav");
  if (!nav) return;
  nav.innerHTML = CATEGORIES.map(
    (c) => `
    <a
      href="category.html?category=${c.slug}"
      class="category-pill ${c.slug === activeSlug ? "is-active" : ""}"
    >${c.label}</a>
  `
  ).join("");
}

function renderProducts(slug) {
  const grid = document.getElementById("productGrid");
  const crumb = document.getElementById("categoryCrumb");
  const title = document.getElementById("categoryTitleDisplay");
  if (!grid) return;

  const label = getCategoryLabel(slug);
  if (crumb) crumb.textContent = label;
  if (title) title.textContent = label;

  const items = getProductsByCategory(slug);
  grid.innerHTML = items
    .map(
      (p) => `
      <article class="product-card">
        <div class="product-image-wrap">
          <img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy" width="600" height="750" />
        </div>
        <div class="product-body">
          <h3 class="product-title">${p.name}</h3>
          <p class="product-price">${formatPrice(p.price)}</p>
          <button type="button" class="btn btn-cart" data-add="${p.id}">Add to cart</button>
        </div>
      </article>
    `
    )
    .join("");

  grid.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-add"));
      const product = PRODUCTS.find((p) => p.id === id);
      if (product) {
        addToCart(product);
        flashButton(btn);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const slug = getSelectedCategory();
  renderCategoryNav(slug);
  renderProducts(slug);
  document.title = `${getCategoryLabel(slug)} — Dressify`;
});
