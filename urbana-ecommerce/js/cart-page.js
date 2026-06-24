/* ==========================================================================
   CART-PAGE.JS
   Renders cart.html: line items with quantity steppers and remove
   buttons, plus a live order summary. Re-renders fully after every
   mutation so the UI can never drift from localStorage.
   ========================================================================== */

function renderCartPage() {
  const root = document.getElementById("cart-root");
  const cart = getCart();

  if (cart.length === 0) {
    root.innerHTML = `
      <div class="empty-cart-state">
        <i class="bi bi-bag-x d-block mb-3"></i>
        <h4>Your cart is empty</h4>
        <p class="text-muted mb-4">Looks like you haven't added anything yet.</p>
        <a href="shop.html" class="btn btn-signal btn-lg">Start Shopping</a>
      </div>`;
    return;
  }

  const lineItemsHTML = cart.map(item => `
    <div class="cart-line-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}">
      <div class="flex-grow-1">
        <div class="d-flex justify-content-between">
          <div class="cart-line-name">${item.name}</div>
          <div class="fw-bold">${formatPrice(item.price * item.qty)}</div>
        </div>
        <div class="text-muted small mb-2">${formatPrice(item.price)} each</div>
        <div class="d-flex align-items-center justify-content-between">
          <div class="qty-stepper">
            <button type="button" class="cart-qty-decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <input type="text" value="${item.qty}" readonly aria-label="Quantity">
            <button type="button" class="cart-qty-increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <button class="cart-line-remove" data-id="${item.id}">
            <i class="bi bi-trash"></i> Remove
          </button>
        </div>
      </div>
    </div>
  `).join("");

  const subtotal = getCartSubtotal();
  const shipping = getShippingCost();
  const total = getCartTotal();
  const amountToFreeShip = FREE_SHIPPING_THRESHOLD - subtotal;

  root.innerHTML = `
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">${getCartCount()} item${getCartCount() !== 1 ? "s" : ""} in your cart</h5>
          <button class="btn btn-sm btn-outline-ink" id="clear-cart-btn">
            <i class="bi bi-trash"></i> Clear Cart
          </button>
        </div>
        <div class="bg-white border rounded-3 p-3 p-md-4" style="border-color: var(--line) !important;">
          ${lineItemsHTML}
        </div>
        <a href="shop.html" class="btn btn-outline-ink mt-3">
          <i class="bi bi-arrow-left"></i> Continue Shopping
        </a>
      </div>

      <div class="col-lg-4">
        <div class="order-summary-card">
          <h5 class="text-white mb-3">Order Summary</h5>
          <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
          <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          ${amountToFreeShip > 0
            ? `<div class="small mb-2" style="color:#ffb199;">Add ${formatPrice(amountToFreeShip)} more for free shipping</div>`
            : `<div class="small mb-2" style="color:#8be0a8;">You qualify for free shipping 🎉</div>`}
          <hr>
          <div class="summary-row summary-total"><span>Total</span><span>${formatPrice(total)}</span></div>
          <a href="checkout.html" class="btn btn-signal btn-lg w-100 mt-3">
            Proceed to Checkout <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  wireCartEvents();
}

function wireCartEvents() {
  document.querySelectorAll(".cart-qty-increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id, 10);
      const item = getCart().find(i => i.id === id);
      if (item) updateQty(id, item.qty + 1);
      renderCartPage();
    });
  });

  document.querySelectorAll(".cart-qty-decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id, 10);
      const item = getCart().find(i => i.id === id);
      if (item) updateQty(id, item.qty - 1);
      renderCartPage();
    });
  });

  document.querySelectorAll(".cart-line-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id, 10);
      removeFromCart(id);
      renderCartPage();
    });
  });

  const clearBtn = document.getElementById("clear-cart-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Remove all items from your cart?")) {
        clearCart();
        renderCartPage();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", renderCartPage);
