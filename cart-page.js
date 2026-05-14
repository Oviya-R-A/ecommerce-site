/**
 * Dressify — cart page UI
 */

function renderCartPage() {
  const listEl = document.getElementById("cartLines");
  const emptyEl = document.getElementById("cartEmpty");
  const totalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  const lines = getCart();

  if (!listEl || !emptyEl || !totalEl) return;

  if (lines.length === 0) {
    emptyEl.hidden = false;
    listEl.innerHTML = "";
    totalEl.textContent = formatPrice(0);
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  emptyEl.hidden = true;
  if (checkoutBtn) checkoutBtn.disabled = false;

  listEl.innerHTML = lines
    .map(
      (line) => `
      <li class="cart-line">
        <img class="cart-line-img" src="${line.image}" alt="" width="96" height="120" />
        <div class="cart-line-info">
          <p class="cart-line-name">${line.name}</p>
          <p class="cart-line-price">${formatPrice(line.price)}</p>
          <button type="button" class="btn btn-text" data-remove="${line.lineId}">Remove</button>
        </div>
      </li>
    `
    )
    .join("");

  totalEl.textContent = formatPrice(getCartTotal());

  listEl.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeLine(btn.getAttribute("data-remove"));
      renderCartPage();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (getCartCount() === 0) return;
      window.alert("Order placed successfully!");
      clearCart();
      renderCartPage();
    });
  }
});
