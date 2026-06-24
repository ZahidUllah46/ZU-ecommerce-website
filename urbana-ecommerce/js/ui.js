/* ==========================================================================
   UI.JS
   Shared rendering helpers — building a product card, a star rating
   string, and a badge — so the markup stays identical wherever a
   product card appears (home page, shop page, etc.).
   ========================================================================== */

/* Renders a 5-star rating as filled/empty star icons based on a 0-5 value. */
function renderStars(rating) {
  const full = Math.round(rating);
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += i <= full ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
  }
  return html;
}

function badgeMarkup(badge) {
  if (!badge) return "";
  const cls = badge === "Sale" ? "badge-sale" : badge === "New" ? "badge-new" : "";
  return `<span class="product-badge ${cls}">${badge}</span>`;
}

/* Builds the HTML for one product card. `colClass` lets each page control
   its own grid breakpoint (e.g. col-6 col-md-4 col-lg-3) without this
   function needing to know about layout. */
function productCardHTML(product, colClass = "col-6 col-md-4 col-lg-3") {
  return `
    <div class="${colClass}">
      <div class="product-card">
        <a href="product-detail.html?id=${product.id}" class="product-card-img-wrap d-block">
          ${badgeMarkup(product.badge)}
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
        <div class="product-card-body">
          <div class="product-card-category">${product.category}</div>
          <h3 class="product-card-name">
            <a href="product-detail.html?id=${product.id}">${product.name}</a>
          </h3>
          <div class="star-rating">${renderStars(product.rating)}</div>
          <div class="product-card-price">$${product.price.toFixed(2)}</div>
          <div class="product-card-actions">
            <button class="btn btn-signal btn-sm flex-grow-1" onclick="addToCart(${product.id})">
              <i class="bi bi-bag-plus"></i> Add to Cart
            </button>
            <a href="product-detail.html?id=${product.id}" class="btn btn-outline-ink btn-sm" aria-label="View ${product.name}">
              <i class="bi bi-eye"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* Reads a query-string parameter by name from the current URL. */
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/* Formats a number as USD currency string, e.g. 9 -> "$9.00" */
function formatPrice(num) {
  return `$${num.toFixed(2)}`;
}
