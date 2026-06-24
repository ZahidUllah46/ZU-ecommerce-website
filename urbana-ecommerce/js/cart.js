/* ==========================================================================
   CART.JS
   Shared cart logic backed by localStorage. Every page (home, shop,
   product detail, cart, checkout) includes this file so the cart
   stays in sync no matter which page the user is on.

   Cart shape stored in localStorage under "urbana_cart":
   [ { id, name, price, image, qty }, ... ]
   ========================================================================== */

const CART_KEY = "urbana_cart";

/* ---- Core read/write helpers ------------------------------------------- */

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    // If localStorage somehow holds corrupted JSON, fail safe to an empty cart
    // instead of breaking every page that calls getCart().
    console.warn("Cart data was corrupted, resetting.", e);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

/* ---- Mutations ----------------------------------------------------------- */

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: qty
    });
  }

  saveCart(cart);
  showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
}

function updateQty(productId, newQty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  if (newQty < 1) {
    // Treat "decrease below 1" as a removal rather than silently clamping,
    // since that's what the user is signaling by pressing minus on qty 1.
    removeFromCart(productId);
    return;
  }
  item.qty = newQty;
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

/* ---- Derived values -------------------------------------------------- */

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

const SHIPPING_FLAT_RATE = 6.99;
const FREE_SHIPPING_THRESHOLD = 100;

function getShippingCost() {
  const subtotal = getCartSubtotal();
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
}

function getCartTotal() {
  return getCartSubtotal() + getShippingCost();
}

/* ---- Shared UI: navbar cart badge -------------------------------------- */

function updateCartBadge() {
  const badge = document.getElementById("cart-count-badge");
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.classList.toggle("d-none", count === 0);
}

/* ---- Shared UI: toast notification -------------------------------------- */

function showToast(message) {
  const toastEl = document.getElementById("urbana-toast");
  if (!toastEl) return; // page didn't include the toast markup
  toastEl.querySelector(".toast-body-text").textContent = message;
  const toast = new bootstrap.Toast(toastEl, { delay: 2200 });
  toast.show();
}

/* Run on every page load so the badge count is correct immediately,
   even before any page-specific script executes. */
document.addEventListener("DOMContentLoaded", updateCartBadge);
