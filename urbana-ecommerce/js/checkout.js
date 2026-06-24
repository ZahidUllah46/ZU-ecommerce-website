/* ==========================================================================
   CHECKOUT.JS
   Renders the checkout form + order summary, validates every field on
   submit (and re-validates on blur for instant feedback), and shows a
   UI-only order confirmation. No real payment is processed — this is
   a capstone project demonstrating front-end validation and flow.
   ========================================================================== */

function renderCheckoutPage() {
  const root = document.getElementById("checkout-root");
  const cart = getCart();

  if (cart.length === 0) {
    root.innerHTML = `
      <div class="empty-cart-state">
        <i class="bi bi-bag-x d-block mb-3"></i>
        <h4>Your cart is empty</h4>
        <p class="text-muted mb-4">Add a few things before checking out.</p>
        <a href="shop.html" class="btn btn-signal btn-lg">Go to Shop</a>
      </div>`;
    return;
  }

  const subtotal = getCartSubtotal();
  const shipping = getShippingCost();
  const total = getCartTotal();

  root.innerHTML = `
    <div class="row g-4">
      <div class="col-lg-7">
        <div class="checkout-form-card">
          <h5 class="mb-4"><span class="checkout-step-badge">1</span>Shipping Details</h5>

          <form id="checkout-form" novalidate>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="fullName" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="fullName" placeholder="Zahid Ullah">
                <div class="invalid-feedback" id="err-fullName"></div>
              </div>
              <div class="col-md-6">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" placeholder="you@email.com">
                <div class="invalid-feedback" id="err-email"></div>
              </div>
              <div class="col-md-6">
                <label for="phone" class="form-label">Phone Number</label>
                <input type="tel" class="form-control" id="phone" placeholder="03XX-XXXXXXX">
                <div class="invalid-feedback" id="err-phone"></div>
              </div>
              <div class="col-md-6">
                <label for="city" class="form-label">City</label>
                <input type="text" class="form-control" id="city" placeholder="Mianwali">
                <div class="invalid-feedback" id="err-city"></div>
              </div>
              <div class="col-12">
                <label for="address" class="form-label">Full Address</label>
                <textarea class="form-control" id="address" rows="2" placeholder="House #, Street, Area"></textarea>
                <div class="invalid-feedback" id="err-address"></div>
              </div>
              <div class="col-md-4">
                <label for="zip" class="form-label">Postal Code</label>
                <input type="text" class="form-control" id="zip" placeholder="42200">
                <div class="invalid-feedback" id="err-zip"></div>
              </div>
            </div>

            <h5 class="mt-5 mb-3"><span class="checkout-step-badge">2</span>Payment Method</h5>
            <div class="row g-3 mb-2">
              <div class="col-md-6">
                <label class="payment-option active d-flex align-items-center gap-2 mb-0">
                  <input type="radio" name="payment" value="cod" checked>
                  <span><i class="bi bi-cash-coin"></i> Cash on Delivery</span>
                </label>
              </div>
              <div class="col-md-6">
                <label class="payment-option d-flex align-items-center gap-2 mb-0">
                  <input type="radio" name="payment" value="card">
                  <span><i class="bi bi-credit-card"></i> Credit / Debit Card</span>
                </label>
              </div>
            </div>
            <p class="small text-muted">This is a UI-only checkout for demonstration — no real payment is processed.</p>

            <button type="submit" class="btn btn-signal btn-lg w-100 mt-3" id="place-order-btn">
              Place Order — ${formatPrice(total)}
            </button>
          </form>
        </div>
      </div>

      <div class="col-lg-5">
        <div class="order-summary-card">
          <h5 class="text-white mb-3">Order Summary</h5>
          ${cart.map(item => `
            <div class="d-flex justify-content-between small mb-2" style="color:#d2d4d9;">
              <span>${item.name} × ${item.qty}</span>
              <span>${formatPrice(item.price * item.qty)}</span>
            </div>
          `).join("")}
          <hr>
          <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
          <hr>
          <div class="summary-row summary-total"><span>Total</span><span>${formatPrice(total)}</span></div>
        </div>
        <a href="cart.html" class="btn btn-outline-ink w-100 mt-3">
          <i class="bi bi-arrow-left"></i> Back to Cart
        </a>
      </div>
    </div>
  `;

  wirePaymentOptionToggle();
  wireCheckoutForm();
}

function wirePaymentOptionToggle() {
  document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener("change", () => {
      document.querySelectorAll(".payment-option").forEach(el => el.classList.remove("active"));
      radio.closest(".payment-option").classList.add("active");
    });
  });
}

/* ---- Validation rules ---------------------------------------------------
   Each validator returns an error string, or "" if the field is valid.
   Keeping these as small pure functions makes each rule easy to read
   and easy to test independently of the DOM. */
const validators = {
  fullName: (v) => {
    if (v.trim() === "") return "Full name is required.";
    if (v.trim().length < 3) return "Name must be at least 3 characters.";
    if (!/^[a-zA-Z\s.'-]+$/.test(v.trim())) return "Name should only contain letters.";
    return "";
  },
  email: (v) => {
    if (v.trim() === "") return "Email address is required.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(v.trim())) return "Enter a valid email address.";
    return "";
  },
  phone: (v) => {
    if (v.trim() === "") return "Phone number is required.";
    const digitsOnly = v.replace(/\D/g, "");
    if (digitsOnly.length < 10 || digitsOnly.length > 13) return "Enter a valid phone number.";
    return "";
  },
  city: (v) => {
    if (v.trim() === "") return "City is required.";
    return "";
  },
  address: (v) => {
    if (v.trim() === "") return "Delivery address is required.";
    if (v.trim().length < 8) return "Address looks too short — add more detail.";
    return "";
  },
  zip: (v) => {
    if (v.trim() === "") return "Postal code is required.";
    if (!/^\d{4,6}$/.test(v.trim())) return "Postal code must be 4–6 digits.";
    return "";
  }
};

function validateField(fieldId) {
  const input = document.getElementById(fieldId);
  const errorBox = document.getElementById(`err-${fieldId}`);
  const message = validators[fieldId](input.value);

  if (message) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    errorBox.textContent = message;
    return false;
  }
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  errorBox.textContent = "";
  return true;
}

function wireCheckoutForm() {
  const form = document.getElementById("checkout-form");
  const fieldIds = Object.keys(validators);

  // Validate on blur so people get feedback before they hit submit
  fieldIds.forEach(id => {
    document.getElementById(id).addEventListener("blur", () => validateField(id));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const results = fieldIds.map(id => validateField(id));
    const allValid = results.every(Boolean);

    if (!allValid) {
      // Scroll to the first invalid field so the user isn't hunting for it
      const firstInvalid = document.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    placeOrder();
  });
}

function placeOrder() {
  const orderNumber = "URB-" + Math.floor(100000 + Math.random() * 900000);
  const total = getCartTotal();
  const name = document.getElementById("fullName").value.trim();

  const root = document.getElementById("checkout-root");
  root.innerHTML = `
    <div class="order-success-card checkout-form-card mx-auto" style="max-width: 560px;">
      <div class="order-success-icon"><i class="bi bi-check-lg"></i></div>
      <h3 class="mb-2">Thank you, ${name.split(" ")[0]}!</h3>
      <p class="text-muted mb-1">Your order has been placed successfully.</p>
      <p class="mb-4">Order Number: <strong>${orderNumber}</strong></p>
      <div class="d-flex justify-content-between border-top border-bottom py-3 mb-4">
        <span class="text-muted">Total Paid</span>
        <span class="fw-bold fs-5">${formatPrice(total)}</span>
      </div>
      <p class="small text-muted mb-4">A confirmation email would be sent to you in a live environment. This demo does not process real payments.</p>
      <a href="index.html" class="btn btn-signal btn-lg w-100" id="back-home-btn">Continue Shopping</a>
    </div>
  `;

  // Clear the cart now that the "order" is placed
  clearCart();

  document.getElementById("back-home-btn").addEventListener("click", () => {
    // clearCart already ran; badge will reset on next page load
  });
}

document.addEventListener("DOMContentLoaded", renderCheckoutPage);
