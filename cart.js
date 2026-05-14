/**
 * Dressify — cart saved in localStorage
 */

const CART_STORAGE_KEY = "dressifyCart";

function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

function addToCart(product) {
  const cart = getCart();
  cart.push({
    lineId: String(Date.now()) + "-" + Math.random().toString(36).slice(2, 8),
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
  });
  saveCart(cart);
  updateCartBadge();
}

function removeLine(lineId) {
  const next = getCart().filter((line) => line.lineId !== lineId);
  saveCart(next);
  updateCartBadge();
}

function clearCart() {
  saveCart([]);
  updateCartBadge();
}

function getCartTotal() {
  return getCart().reduce((sum, line) => sum + line.price, 0);
}

function getCartCount() {
  return getCart().length;
}

function updateCartBadge() {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = String(getCartCount());
}
