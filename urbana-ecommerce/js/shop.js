/* ==========================================================================
   SHOP.JS
   Drives shop.html: renders category checkboxes, then applies search,
   category filter, price filter and sort together every time any
   control changes. The URL's ?category= param (set by home page links)
   pre-checks the matching category on load.
   ========================================================================== */

/* Current filter/sort state, kept in one object so applyFilters() has a
   single source of truth instead of re-reading five different inputs. */
const shopState = {
  search: "",
  categories: [],   // empty array = "all categories"
  minPrice: null,
  maxPrice: null,
  sort: "default"
};

function renderCategoryCheckboxes() {
  const wrap = document.getElementById("category-filter-list");
  if (!wrap) return;
  wrap.innerHTML = CATEGORIES.map(cat => `
    <div class="form-check filter-cat-check">
      <input class="form-check-input category-checkbox" type="checkbox" value="${cat}" id="cat-${cat}">
      <label class="form-check-label" for="cat-${cat}">${cat}</label>
    </div>
  `).join("");

  wrap.querySelectorAll(".category-checkbox").forEach(cb => {
    cb.addEventListener("change", () => {
      shopState.categories = Array.from(wrap.querySelectorAll(".category-checkbox:checked"))
        .map(el => el.value);
      applyFilters();
    });
  });
}

/* Pulls every input's current value into shopState, then re-renders.
   Called by every control's event listener so behavior stays consistent
   no matter which filter changed. */
function applyFilters() {
  let results = [...PRODUCTS];

  // 1. Search — matches against name and description, case-insensitive
  if (shopState.search.trim() !== "") {
    const q = shopState.search.trim().toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // 2. Category filter — if none checked, show all categories
  if (shopState.categories.length > 0) {
    results = results.filter(p => shopState.categories.includes(p.category));
  }

  // 3. Price range filter
  if (shopState.minPrice !== null && !isNaN(shopState.minPrice)) {
    results = results.filter(p => p.price >= shopState.minPrice);
  }
  if (shopState.maxPrice !== null && !isNaN(shopState.maxPrice)) {
    results = results.filter(p => p.price <= shopState.maxPrice);
  }

  // 4. Sort
  switch (shopState.sort) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "name-asc":
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      results.sort((a, b) => a.id - b.id); // catalog order
  }

  renderResults(results);
}

function renderResults(results) {
  const grid = document.getElementById("product-grid");
  const emptyState = document.getElementById("no-results-state");
  const countLabel = document.getElementById("results-count");

  countLabel.textContent = `Showing ${results.length} product${results.length !== 1 ? "s" : ""}`;

  if (results.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.remove("d-none");
    return;
  }
  emptyState.classList.add("d-none");
  grid.innerHTML = results.map(p => productCardHTML(p, "col-6 col-md-4")).join("");
}

function clearAllFilters() {
  shopState.search = "";
  shopState.categories = [];
  shopState.minPrice = null;
  shopState.maxPrice = null;
  shopState.sort = "default";

  document.getElementById("search-input").value = "";
  document.getElementById("price-min").value = "";
  document.getElementById("price-max").value = "";
  document.getElementById("sort-select").value = "default";
  document.querySelectorAll(".category-checkbox").forEach(cb => cb.checked = false);

  applyFilters();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryCheckboxes();

  // Pre-apply category from URL, e.g. shop.html?category=Footwear
  const urlCategory = getQueryParam("category");
  if (urlCategory && CATEGORIES.includes(urlCategory)) {
    shopState.categories = [urlCategory];
    const checkbox = document.getElementById(`cat-${urlCategory}`);
    if (checkbox) checkbox.checked = true;
  }

  // Search — live filter as you type
  document.getElementById("search-input").addEventListener("input", (e) => {
    shopState.search = e.target.value;
    applyFilters();
  });

  // Sort
  document.getElementById("sort-select").addEventListener("change", (e) => {
    shopState.sort = e.target.value;
    applyFilters();
  });

  // Price range
  document.getElementById("apply-price-btn").addEventListener("click", () => {
    const min = document.getElementById("price-min").value;
    const max = document.getElementById("price-max").value;
    shopState.minPrice = min === "" ? null : parseFloat(min);
    shopState.maxPrice = max === "" ? null : parseFloat(max);
    applyFilters();
  });

  // Clear all
  document.getElementById("clear-filters-btn").addEventListener("click", clearAllFilters);

  applyFilters();
});
