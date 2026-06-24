/* ==========================================================================
   PARTIALS.JS
   Renders the navbar and footer once, then injects them into every page.
   Keeping this in one place means a nav-link change happens in one file,
   not five. Each page sets window.ACTIVE_NAV before this runs to
   highlight the right link.
   ========================================================================== */

function renderNavbar() {
  const active = window.ACTIVE_NAV || "";
  const navLink = (href, label, key) =>
    `<a class="nav-link ${active === key ? "active" : ""}" href="${href}">${label}</a>`;

  return `
  <nav class="navbar navbar-expand-lg urbana-navbar sticky-top">
    <div class="container">
      <a class="navbar-brand urbana-brand" href="index.html">ZU<span class="brand-dot">.</span></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#urbanaNav" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="urbanaNav">
        <div class="navbar-nav mx-lg-auto">
          ${navLink("index.html", "Home", "home")}
          ${navLink("shop.html", "Shop", "shop")}
        </div>
        <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
          <a href="shop.html" class="text-ink" aria-label="Search products"><i class="bi bi-search fs-5"></i></a>
          <a href="cart.html" class="cart-icon-btn" aria-label="View cart">
            <i class="bi bi-bag"></i>
            <span id="cart-count-badge" class="d-none">0</span>
          </a>
        </div>
      </div>
    </div>
  </nav>`;
}

function renderFooter() {
  return `
  <footer class="urbana-footer mt-auto">
    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-4">
          <h5 class="text-white" style="font-family: var(--font-display); font-weight:700;">ZU<span class="text-signal">.</span></h5>
          <p class="small">Considered goods for everyday life — footwear, bags, electronics, and home pieces built to be used, not just owned.</p>
          <div class="d-flex gap-3 fs-5 mt-3">
            <a href="https://www.facebook.com/share/1DPZGQtbpm/" target="_blank" rel="noopener" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/zahidullah9102?igsh=MXRhNHp4aDM1YQ==" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="https://www.linkedin.com/in/zahid-ullah-067aa7283" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
          </div>
          <p class="small mt-3 mb-0"><i class="bi bi-telephone"></i> 0304-9410498</p>
        </div>
        <div class="col-lg-2 col-6">
          <h6>Shop</h6>
          <ul class="list-unstyled small">
            <li class="mb-2"><a href="shop.html">All Products</a></li>
            <li class="mb-2"><a href="shop.html?category=Footwear">Footwear</a></li>
            <li class="mb-2"><a href="shop.html?category=Apparel">Apparel</a></li>
            <li class="mb-2"><a href="shop.html?category=Electronics">Electronics</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-6">
          <h6>Company</h6>
          <ul class="list-unstyled small">
            <li class="mb-2"><a href="#">About Us</a></li>
            <li class="mb-2"><a href="#">Careers</a></li>
            <li class="mb-2"><a href="tel:+923049410498">Contact</a></li>
          </ul>
        </div>
        <div class="col-lg-4">
          <h6>Stay in the loop</h6>
          <p class="small">New drops and restock alerts, twice a month, no spam.</p>
          <form class="d-flex gap-2" onsubmit="return false;">
            <input type="email" class="form-control form-control-sm" placeholder="you@email.com" aria-label="Email address">
            <button class="btn btn-signal btn-sm">Join</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom d-flex flex-wrap justify-content-between">
        <span>&copy; 2026 ZU. Capstone E-Commerce Project by Zahid Ullah.</span>
        <span>Built with HTML, CSS, JavaScript &amp; Bootstrap 5</span>
      </div>
    </div>
  </footer>`;
}

function renderToast() {
  return `
  <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1080;">
    <div id="urbana-toast" class="toast align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body toast-body-text bg-white"></div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const navSlot = document.getElementById("navbar-slot");
  const footerSlot = document.getElementById("footer-slot");
  const toastSlot = document.getElementById("toast-slot");
  if (navSlot) navSlot.outerHTML = renderNavbar();
  if (footerSlot) footerSlot.outerHTML = renderFooter();
  if (toastSlot) toastSlot.outerHTML = renderToast();
  updateCartBadge();
});
