/* ==========================================================================
   PRODUCT-DETAIL.JS
   Reads ?id= from the URL, renders the full product detail layout,
   wires up the quantity stepper and Add to Cart, and renders 4
   related products from the same category.
   ========================================================================== */

let currentProduct = null;
let selectedQty = 1;

function renderProductDetail() {
  const root = document.getElementById("pdp-root");
  const id = parseInt(getQueryParam("id"), 10);
  currentProduct = PRODUCTS.find(p => p.id === id);

  if (!currentProduct) {
    root.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-exclamation-circle fs-1 text-muted d-block mb-3"></i>
        <h4>Product not found</h4>
        <p class="text-muted">This item may have been removed or the link is incorrect.</p>
        <a href="shop.html" class="btn btn-signal">Back to Shop</a>
      </div>`;
    return;
  }

  document.title = `${currentProduct.name} — ZU`;
  document.getElementById("breadcrumb-product-name").textContent = currentProduct.name;

  root.innerHTML = `
    <div class="row g-5">
      <div class="col-lg-6">
        <div class="pdp-image-frame">
          <img src="${currentProduct.image}" alt="${currentProduct.name}">
          <div class="pdp-hangtag">
            <div class="tag-price">${formatPrice(currentProduct.price)}</div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="pdp-category-tag">${currentProduct.category}</div>
        <h1 class="pdp-title my-2">${currentProduct.name}</h1>
        <div class="star-rating mb-3">
          ${renderStars(currentProduct.rating)}
          <span class="text-muted small ms-1">(${currentProduct.rating.toFixed(1)} / 5.0)</span>
        </div>
        <div class="pdp-price mb-3">${formatPrice(currentProduct.price)}</div>
        <p class="text-muted">${currentProduct.description}</p>

        <hr class="my-4">

        <div class="d-flex align-items-center gap-3 mb-4">
          <span class="fw-semibold small">Quantity</span>
          <div class="qty-stepper">
            <button type="button" id="qty-decrease" aria-label="Decrease quantity">−</button>
            <input type="text" id="qty-display" value="1" readonly aria-label="Quantity">
            <button type="button" id="qty-increase" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <div class="d-flex gap-3">
          <button class="btn btn-signal btn-lg flex-grow-1" id="pdp-add-to-cart">
            <i class="bi bi-bag-plus"></i> Add to Cart
          </button>
          <a href="cart.html" class="btn btn-outline-ink btn-lg" id="pdp-view-cart" style="display:none;">
            View Cart
          </a>
        </div>

        <div class="pdp-meta-row">
          <span><i class="bi bi-truck"></i>Free shipping over $100</span>
          <span><i class="bi bi-arrow-counterclockwise"></i>30-day returns</span>
          <span><i class="bi bi-shield-check"></i>Secure checkout</span>
        </div>
      </div>
    </div>
  `;

  wireQuantityControls();
  document.getElementById("pdp-add-to-cart").addEventListener("click", () => {
    addToCart(currentProduct.id, selectedQty);
    document.getElementById("pdp-view-cart").style.display = "inline-block";
  });
}

function wireQuantityControls() {
  selectedQty = 1;
  const display = document.getElementById("qty-display");

  document.getElementById("qty-increase").addEventListener("click", () => {
    selectedQty += 1;
    display.value = selectedQty;
  });

  document.getElementById("qty-decrease").addEventListener("click", () => {
    if (selectedQty > 1) {
      selectedQty -= 1;
      display.value = selectedQty;
    }
  });
}

function renderRelatedProducts() {
  const wrap = document.getElementById("related-grid");
  if (!wrap || !currentProduct) return;

  const related = PRODUCTS
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);

  // If fewer than 4 in the same category, pad with other top-rated items
  let pool = related;
  if (pool.length < 4) {
    const extra = PRODUCTS
      .filter(p => p.id !== currentProduct.id && !pool.includes(p))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4 - pool.length);
    pool = [...pool, ...extra];
  }

  wrap.innerHTML = pool.map(p => productCardHTML(p, "col-6 col-md-3")).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductDetail();
  renderRelatedProducts();
});
