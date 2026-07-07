# ZU — E-Commerce Website (Capstone Project)

A complete, responsive e-commerce website built with **HTML5, CSS3, JavaScript (ES6), and Bootstrap 5** as a Web Development Internship capstone project.

Author:Zahid Ullah — BS Software Engineering, University of Mianwali

 0304-9410498 · [LinkedIn](https://www.linkedin.com/in/zahid-ullah-067aa7283) · [Instagram](https://www.instagram.com/zahidullah9102) · [Facebook](https://www.facebook.com/share/1DPZGQtbpm/)


##  Live Preview

Open index.html in any modern browser — no build step, no server, no dependencies to install. Everything runs client-side.

For the best experience (so relative paths and fonts load cleanly), serve it locally:

bash
# From the project folder
python3 -m http.server 8000
# then open http://localhost:8000

##  Folder Structure

urbana-ecommerce/
├── index.html              # Home page
├── shop.html                # Shop / Products page (search, filter, sort)
├── product-detail.html      # Single product detail page
├── cart.html                 # Shopping cart page
├── checkout.html             # Checkout page with form validation
│
├── css/
│   └── style.css             # All custom styling & design tokens
│
├── js/
│   ├── products.js           # Product data (14 sample products)
│   ├── cart.js                # Shared cart logic (localStorage)
│   ├── ui.js                  # Shared rendering helpers (product cards, stars)
│   ├── partials.js            # Injects shared navbar/footer/toast
│   ├── home.js                # Home page logic
│   ├── shop.js                 # Search / filter / sort engine
│   ├── product-detail.js      # Product detail page logic
│   ├── cart-page.js            # Cart page logic
│   └── checkout.js             # Checkout form + validation
│
└── docs/
    ├── ZU_Project_Report.docx          # Full project report (Word)
    ├── Reflection.md                   # Personal learning reflection
    ├── LinkedIn_Post.md                # Ready-to-publish LinkedIn post
    └── Demo_Presentation_Script.md     # 5-minute demo script

##  Features

| Feature | Where |
|---|---|
| Product search (live, case-insensitive) | Shop page |
| Category filtering (multi-select) | Shop page |
| Price range filtering | Shop page |
| Sorting (price ↑↓, rating, name) | Shop page |
| Add to cart (with quantity) | Shop, Product Detail |
| Remove from cart | Cart page |
| Update quantity | Cart, Product Detail |
| Auto-calculated subtotal / shipping / total | Cart, Checkout |
| Free shipping threshold ($100+) | Cart, Checkout |
| Cart persistence via `localStorage` | All pages |
| Checkout form validation (JS) | Checkout page |
| Toast notifications | All pages |
| Fully responsive (mobile/tablet/desktop) | All pages |


##  Design System

- Colors: Ink black (`#0F1115`), warm paper (`#FAF8F4`), signal orange (`#FF5A36`)
- Typography: Space Grotesk (display/headings) + Inter (body/UI)
- Signature element: A rotated "hang-tag" price label echoing a real clothing price tag

## Architecture Notes

-No backend — all product data lives in `js/products.js`. Swapping this for an API call later would not require changing any other file, since every page reads from the same `PRODUCTS` array.
- **One cart module** — every page includes `cart.js`, so add/remove/update logic exists in exactly one place.
- **Shared partials** — the navbar and footer are rendered once in `partials.js` and injected into a placeholder `<div>` on each page, avoiding five copies of the same markup.

## Documentation

See the `docs/` folder for the full project report, personal reflection, LinkedIn post, and demo script — all written to accompany this submission.

Built with HTML, CSS, JavaScript & Bootstrap 5 — June 2026

