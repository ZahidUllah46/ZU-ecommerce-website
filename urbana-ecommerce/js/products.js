/* ==========================================================================
   PRODUCTS.JS
   Single source of truth for all product data on the site.
   Each product object follows the same schema so every page (home,
   shop, product detail, cart) can rely on the same fields.
   ========================================================================== */

const PRODUCTS = [
  {
    id: 1,
    name: "Aero Runner Sneakers",
    category: "Footwear",
    price: 89.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    badge: "Best Seller",
    shortDesc: "Lightweight knit sneakers built for everyday miles.",
    description: "The Aero Runner pairs a breathable knit upper with a responsive foam midsole, so it feels just as good on a 5K as it does on a coffee run. Reinforced heel counter keeps your stride locked in, and the rubber outsole grips wet pavement without complaint."
  },
  {
    id: 2,
    name: "Heritage Leather Backpack",
    category: "Bags",
    price: 129.5,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
    badge: "New",
    shortDesc: "Full-grain leather backpack with a padded laptop sleeve.",
    description: "Cut from full-grain leather that ages into its own character, the Heritage Backpack carries a 15-inch laptop, a change of clothes, and everything in between. Brass hardware and a hand-stitched base mean this is a buy-once piece, not a seasonal one."
  },
  {
    id: 3,
    name: "Minimalist Steel Watch",
    category: "Accessories",
    price: 154.0,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop",
    badge: null,
    shortDesc: "Brushed steel case with a sapphire crystal face.",
    description: "Stripped of every unnecessary marking, this watch tells time and nothing else — which is exactly the point. The brushed steel case resists scratches, the sapphire crystal resists fog, and the 5-ATM rating means it survives the sink and the rain."
  },
  {
    id: 4,
    name: "Cloudknit Pullover Hoodie",
    category: "Apparel",
    price: 64.0,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
    badge: "Best Seller",
    shortDesc: "Mid-weight fleece hoodie with a brushed interior.",
    description: "Cloudknit fleece is brushed on the inside for warmth without bulk, so this hoodie layers under a jacket in winter and stands alone in spring. A kangaroo pocket and ribbed cuffs keep the silhouette clean and the fit honest."
  },
  {
    id: 5,
    name: "Wireless Noise-Cancel Headphones",
    category: "Electronics",
    price: 199.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    badge: "Sale",
    shortDesc: "Over-ear ANC headphones with 30-hour battery life.",
    description: "Active noise cancellation drops road and office noise by up to 28dB, while 40mm drivers keep bass tight instead of muddy. A 30-hour battery and 10-minute fast charge mean you're rarely tethered to a cable."
  },
  {
    id: 6,
    name: "Recycled Canvas Tote",
    category: "Bags",
    price: 32.0,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=600&fit=crop",
    badge: null,
    shortDesc: "Heavyweight tote made from recycled cotton canvas.",
    description: "Woven from recycled cotton canvas at 16oz weight, this tote holds groceries, books, or a laptop without sagging at the seams. Reinforced bottom corners and long handles make it as comfortable on the shoulder as in the hand."
  },
  {
    id: 7,
    name: "Trailhead Hiking Boots",
    category: "Footwear",
    price: 142.0,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop",
    badge: null,
    shortDesc: "Waterproof leather boots with a Vibram outsole.",
    description: "A waterproof leather upper and sealed seams keep your feet dry through stream crossings, while the Vibram outsole bites into loose gravel and wet rock alike. Break-in time is minimal thanks to a pre-curved last that mirrors your foot's natural shape."
  },
  {
    id: 8,
    name: "Slim Fit Oxford Shirt",
    category: "Apparel",
    price: 48.0,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop",
    badge: null,
    shortDesc: "Breathable cotton oxford with a tailored cut.",
    description: "A tailored cut through the chest and waist gives this oxford structure without stiffness. 100% combed cotton breathes through long days, and mother-of-pearl buttons add a detail you'll notice before anyone else does."
  },
  {
    id: 9,
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 59.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
    badge: "Sale",
    shortDesc: "IPX7 waterproof speaker with 360° sound.",
    description: "IPX7-rated against full submersion, this speaker survives the pool deck and the rain it didn't see coming. 360° sound fills a room evenly, and a 12-hour battery outlasts most days at the beach."
  },
  {
    id: 10,
    name: "Polarized Aviator Sunglasses",
    category: "Accessories",
    price: 76.5,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
    badge: "New",
    shortDesc: "UV400 polarized lenses in a classic aviator frame.",
    description: "Polarized UV400 lenses cut glare off water and windshields alike, set in a lightweight titanium-alloy frame that won't pinch after eight hours on. Spring hinges add a little forgiveness for a tighter fit."
  },
  {
    id: 11,
    name: "Performance Jogger Pants",
    category: "Apparel",
    price: 54.0,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=600&fit=crop",
    badge: null,
    shortDesc: "Tapered joggers with four-way stretch fabric.",
    description: "Four-way stretch fabric moves with you through every angle of a workout, while a tapered leg keeps the silhouette sharp enough for the street after. Zippered side pockets actually fit a phone — no awkward bounce."
  },
  {
    id: 12,
    name: "Ceramic Pour-Over Coffee Set",
    category: "Home",
    price: 38.0,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop",
    badge: "Best Seller",
    shortDesc: "Hand-glazed ceramic dripper with matching carafe.",
    description: "Each dripper is hand-glazed, so no two are perfectly identical — a small reminder that someone made this on purpose. The double-wall design keeps brew temperature stable, and the matching 600ml carafe goes straight from counter to table."
  },
  {
    id: 13,
    name: "Smart Fitness Tracker Band",
    category: "Electronics",
    price: 49.0,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600&h=600&fit=crop",
    badge: null,
    shortDesc: "Heart-rate and sleep tracking with a 10-day battery.",
    description: "Continuous heart-rate and sleep tracking run quietly in the background for up to 10 days on a single charge. A 1.1-inch AMOLED display stays readable in direct sun, and the silicone band won't irritate skin on long runs."
  },
  {
    id: 14,
    name: "Linen Throw Blanket",
    category: "Home",
    price: 42.0,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1580301762395-21ce84d00bc8?w=600&h=600&fit=crop",
    badge: null,
    shortDesc: "Stonewashed linen blanket, 130 x 170cm.",
    description: "Stonewashed for softness from the first use rather than after a dozen washes, this linen throw drapes naturally over a sofa arm or the foot of a bed. Breathable fibers mean it works equally well in July and January."
  }
];

/* Derive the list of unique categories directly from the data,
   so the filter UI never goes stale if products are added later. */
const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))].sort();
