/* ==========================================================================
   HOME.JS
   Populates the three dynamic sections on index.html: category strip,
   best sellers, and new arrivals. Runs after products.js, cart.js,
   and ui.js have loaded.
   ========================================================================== */

/* Maps each category name to a Bootstrap Icon so the strip looks designed,
   not just a plain text list. Falls back to a generic tag icon for any
   category added later that isn't in this map yet. */
const CATEGORY_ICONS = {
  Footwear: "bi-boot",
  Bags: "bi-bag",
  Accessories: "bi-watch",
  Apparel: "bi-person-standing-dress",
  Electronics: "bi-earbuds",
  Home: "bi-cup-hot"
};

function renderCategoryStrip() {
  const wrap = document.getElementById("category-strip");
  if (!wrap) return;

  wrap.innerHTML = CATEGORIES.map(cat => `
    <div class="col-4 col-md-2">
      <a href="shop.html?category=${encodeURIComponent(cat)}" class="category-pill">
        <i class="bi ${CATEGORY_ICONS[cat] || "bi-tag"} cat-icon"></i>
        <span class="cat-name">${cat}</span>
      </a>
    </div>
  `).join("");
}

function renderBestSellers() {
  const wrap = document.getElementById("bestseller-grid");
  if (!wrap) return;
  const items = PRODUCTS.filter(p => p.badge === "Best Seller").slice(0, 4);
  wrap.innerHTML = items.map(p => productCardHTML(p, "col-6 col-md-3")).join("");
}

function renderNewArrivals() {
  const wrap = document.getElementById("newarrival-grid");
  if (!wrap) return;
  const items = PRODUCTS.filter(p => p.badge === "New").slice(0, 4);
  // Pad with a couple of high-rated items if "New" doesn't have 4,
  // so the grid never looks sparse on a small catalog.
  let pool = items;
  if (pool.length < 4) {
    const extra = PRODUCTS
      .filter(p => !pool.includes(p))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4 - pool.length);
    pool = [...pool, ...extra];
  }
  wrap.innerHTML = pool.map(p => productCardHTML(p, "col-6 col-md-3")).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryStrip();
  renderBestSellers();
  renderNewArrivals();
});
