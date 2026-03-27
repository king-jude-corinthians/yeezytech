# YeezyTech Gadgets — Design & Implementation Specification

## 1. Overview

**Project:** YeezyTech Gadgets — a high-end e-commerce website for premium consumer electronics and accessories.

**Product Range:** Apple iPhones, Samsung phones, phone accessories, PlayStation consoles, speakers, Apple Watches, AirPods, iPads, and other gadgets.

**Tech Stack:** Next.js (App Router, React Server Components) + Tailwind CSS v4 + Framer Motion

**Typography:** Geist Sans + Geist Mono (no Inter, no serif)

**Color Palette:**
- Background: `#f9fafb` (off-white)
- Surface: `#ffffff` with `border-slate-200/50`
- Primary: `#111827` (zinc-900, near-black — never pure `#000`)
- Accent: Emerald `#10b981` (single accent, saturation < 80%)
- Text Primary: `#111827`
- Text Secondary: `#6b7280`
- Text Muted: `#9ca3af`

---

## 2. Design Decisions (Validated)

| Decision | Choice | Rationale |
|---|---|---|
| Visual Direction | Modern Minimalist | Clean, elegant, premium — lets products speak |
| Homepage Layout | Editorial Stacked | Story-driven flow: hero → spotlight → scroll row → promo banner |
| Navigation | Mega Menu Dropdown | Horizontal top nav, hover reveals subcategory panel + featured product |
| Product Cards | Hover Reveal | Minimal default (image, name, price); hover lifts card, reveals Quick View / Wishlist / Add to Cart |

---

## 3. Global Layout & Architecture

### 3.1 Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- Container: `max-w-[1400px] mx-auto`

### 3.2 Shared Layout Components

**Navbar (all pages)**
- Sticky top bar with logo "YEEZYTECH" (left), category links (center: Phones, Gaming, Audio, Wearables, Accessories, Deals), search icon + wishlist icon + cart icon with badge (right)
- On hover of category link → mega menu dropdown with subcategories (left columns) + featured product image (right column)
- Mobile (`< md`): hamburger icon → full-height slide-out drawer with categories
- Font: `tracking-wider font-bold text-sm`

**Footer (all pages)**
- 4-column grid: Company (About, Contact, Careers), Shop (All Products, Deals, New Arrivals), Support (FAQ, Shipping, Returns), Newsletter signup
- Bottom bar: copyright, social icons (SVG, not emoji), payment method icons
- Mobile: stacked single column with accordions

**Announcement Bar (optional, top of page)**
- Thin bar above navbar for promotions: "Free shipping on orders over $50"
- Emerald background with white text, dismissible

---

## 4. Pages

### 4.1 Home Page (`/`)

**Section 1 — Hero (Editorial, left-aligned)**
- Left-aligned headline: `text-4xl md:text-6xl tracking-tighter leading-none`
- Subheadline: `text-base text-gray-600 leading-relaxed max-w-[65ch]`
- CTA button: "Shop Now" — `bg-zinc-900 text-white rounded-xl px-8 py-4`
- No centered hero — left-aligned text with right-side product imagery
- Use `min-h-[100dvh]` (not `h-screen`)

**Section 2 — Featured Product Spotlight**
- Large card spanning full width with split layout: product info left, large product image right
- Product name, key specs (3-4 bullet points), price, "View Details" CTA
- Subtle background gradient (`f3f4f6` → `e5e7eb`)

**Section 3 — Category Row (horizontal scroll)**
- Horizontal scrolling row of category cards (Phones, Gaming, Audio, Wearables, Accessories)
- Each card: rounded image/icon + category name below
- Scroll snapping on mobile, grid on desktop

**Section 4 — Trending Products**
- Heading: "Trending Now"
- Horizontal scroll of product cards (Hover Reveal style)
- 4 visible on desktop, scroll on mobile
- Staggered entrance animation (`staggerChildren`)

**Section 5 — Deals & Promotions Banner**
- Full-width dark (`zinc-900`) banner
- Bold headline: "Today's Deals"
- Countdown timer for flash sale (animated digits)
- CTA: "Shop Deals" button in emerald accent
- 2-3 deal product thumbnails visible

**Section 6 — Customer Reviews**
- Heading: "What Our Customers Say"
- Horizontal carousel of review cards
- Each review: star rating (SVG stars), review text (max 3 lines), reviewer name, verified purchase badge
- Auto-scroll with pause on hover

**Section 7 — Newsletter Signup**
- Split layout: left side has headline "Stay in the Loop" + subtitle, right side has email input + subscribe button
- Input: `rounded-xl border border-slate-200 px-4 py-3`
- Button: emerald accent `bg-emerald-500 text-white rounded-xl`
- Success state: checkmark animation + "You're in!" message

---

### 4.2 Shop / Products Page (`/shop`)

**Layout:**
- Left sidebar (desktop) / top filter bar (mobile) with filters:
  - Category (Phones, Gaming, Audio, Wearables, Accessories)
  - Brand (Apple, Samsung, Sony, etc.)
  - Price range (slider)
  - Rating (star filter)
  - Availability (In Stock toggle)
- Right: product grid (CSS Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`)
- Top bar: result count, sort dropdown (Price Low-High, Price High-Low, Newest, Popular)

**Product Cards (Hover Reveal):**
- Default: product image on `#f3f4f6` background, product name, price
- Hover: card lifts (`-translate-y-1`), shadow deepens, reveals:
  - "Quick View" button overlay on image
  - Wishlist heart icon (top-right of image)
  - "Add to Cart" button in card footer
- Skeleton loaders for loading state (shimmer animation matching card dimensions)

**Pagination:**
- Load more button (not numbered pagination) — "Show More Products"
- Smooth stagger animation for newly loaded products

**Empty State:**
- If no products match filters: illustration + "No products found" + "Clear Filters" button

---

### 4.3 Category Page (`/category/[slug]`)

**Same layout as Shop page**, but:
- Pre-filtered by category
- Hero banner at top: category name + description + category-specific image
- Subcategory pills below banner for quick filtering (e.g., under Phones: "iPhone", "Samsung Galaxy", "Accessories")

**Categories:**
- `/category/phones` — iPhones, Samsung, accessories
- `/category/gaming` — PlayStation, controllers, gaming headsets
- `/category/audio` — Speakers, AirPods, headphones
- `/category/wearables` — Apple Watch, fitness trackers
- `/category/accessories` — Cases, chargers, cables, stands

---

### 4.4 Product Detail Page (`/product/[slug]`)

**Section 1 — Product Hero**
- Split layout: left 60% image gallery, right 40% product info
- Image gallery: main image (large) + thumbnail row below (click to swap)
- Product info:
  - Brand label (muted, uppercase, small)
  - Product name: `text-2xl md:text-3xl font-bold tracking-tight`
  - Star rating + review count link
  - Price: `text-2xl font-bold`
  - Short description (2-3 sentences)
  - Color/variant selector (circular swatches)
  - Storage/size selector (pill buttons)
  - Quantity selector
  - "Add to Cart" button (full-width, `bg-zinc-900 text-white rounded-xl py-4`)
  - "Add to Wishlist" text link with heart icon
  - Shipping info: "Free shipping over $50" + estimated delivery

**Section 2 — Specifications Tab**
- Tab navigation: Overview | Specifications | Comparisons | Reviews
- **Overview:** feature highlights with icons, key selling points
- **Specifications:** full spec table (2-column, alternating row backgrounds)
  - Display, processor, RAM, storage, battery, camera, dimensions, weight, etc.
- **Comparisons:** side-by-side table comparing this product with 2 similar products
  - Sticky header row with product images
  - Highlight differences in emerald
- **Reviews:** customer reviews list with:
  - Rating breakdown bar chart (5-star to 1-star)
  - Individual reviews: star rating, title, body, reviewer name, date, verified badge
  - "Write a Review" button
  - Sort by: Most Recent, Most Helpful, Highest Rating

**Section 3 — Related Products**
- "You Might Also Like" heading
- Horizontal scroll row of Hover Reveal product cards (4 visible on desktop)

---

### 4.5 Cart Page (`/cart`)

**Layout:**
- Left 65%: cart items list
- Right 35%: order summary sidebar (sticky on desktop)

**Cart Item Row:**
- Product thumbnail (small, rounded)
- Product name + variant (color, storage)
- Quantity stepper (- / count / +)
- Line item price
- Remove button (trash icon)
- Divider between items (`border-t border-slate-100`)

**Order Summary Sidebar:**
- Subtotal
- Shipping estimate (or "Free" in emerald)
- Tax estimate
- Promo code input + "Apply" button
- Total (bold, large)
- "Proceed to Checkout" button (full-width, `bg-zinc-900 text-white rounded-xl py-4`)
- Accepted payment icons row

**Empty Cart State:**
- Illustration + "Your cart is empty" + "Continue Shopping" button

---

### 4.6 Wishlist Page (`/wishlist`)

**Layout:**
- Grid of wishlisted products (same Hover Reveal cards)
- Each card has an additional "Remove from Wishlist" action (filled heart icon toggles)
- "Move to Cart" button on each card
- Empty state: "Your wishlist is empty — browse products to add favorites"
- Share wishlist button (generates shareable link)

---

### 4.7 About Page (`/about`)

**Section 1 — Hero**
- Left-aligned headline: "About YeezyTech"
- Subtitle: company mission statement
- Full-width background image (office/team, subtle overlay)

**Section 2 — Our Story**
- Split layout: text left, image right
- 2-3 paragraphs about the company origin, mission, values

**Section 3 — Why Choose Us**
- 4-item feature grid (2x2):
  - Authentic Products (shield icon)
  - Fast Delivery (truck icon)
  - Expert Support (headset icon)
  - Easy Returns (refresh icon)
- Each: icon + title + short description

**Section 4 — Team / Stats**
- Stats row: "10K+ Happy Customers", "500+ Products", "24/7 Support", "30-Day Returns"
- Clean, minimal number display with subtle count-up animation on scroll

---

### 4.8 Contact Page (`/contact`)

**Layout:** Split — left side info, right side form

**Left Side:**
- Heading: "Get in Touch"
- Address, phone, email (with icons)
- Business hours
- Social media links

**Right Side — Contact Form:**
- Fields: Name, Email, Subject (dropdown), Message (textarea)
- Labels above inputs
- Validation: inline error messages below fields
- Submit button: "Send Message" (`bg-zinc-900 text-white rounded-xl`)
- Success state: checkmark animation + "Message sent!" confirmation
- Loading state: button shows spinner

---

## 5. Interactive Features & Motion

### 5.1 Motion Baseline (MOTION_INTENSITY: 6)
- All transitions: `transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`
- Spring physics for interactive elements: `type: "spring", stiffness: 100, damping: 20`
- Stagger children for grid/list entrances: `staggerChildren: 0.08`
- Page transitions: fade + subtle slide using Framer Motion `AnimatePresence`

### 5.2 Scroll Animations
- Sections fade in + slide up on scroll (Framer Motion `whileInView`)
- Stats count-up on scroll into view
- Deals countdown timer with flip animation on digits

### 5.3 Micro-interactions
- Product card hover: `-translate-y-1`, shadow deepens, actions reveal
- CTA buttons: `active:scale-[0.98]` tactile press feedback
- Wishlist heart: fill animation on toggle
- Cart badge: scale bounce on item add
- Image gallery: smooth crossfade on thumbnail click
- Tab navigation: underline slides to active tab (`layoutId`)

### 5.4 Loading States
- Skeleton loaders matching exact card/content dimensions (shimmer gradient animation)
- Button loading: text replaced with spinner
- Page transitions: top progress bar

### 5.5 Performance Rules
- All perpetual animations isolated in their own `'use client'` leaf components
- Animations use only `transform` and `opacity` (hardware accelerated)
- No `window.addEventListener('scroll')` — use Framer Motion hooks
- `useEffect` cleanup for all animation subscriptions
- Grain/noise effects on `fixed inset-0 pointer-events-none` only

---

## 6. Component Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout (navbar + footer + providers)
│   ├── page.tsx                # Home page (RSC)
│   ├── shop/
│   │   └── page.tsx            # Shop/products listing
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx        # Category-filtered listing
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx        # Product detail
│   ├── cart/
│   │   └── page.tsx            # Cart
│   ├── wishlist/
│   │   └── page.tsx            # Wishlist
│   ├── about/
│   │   └── page.tsx            # About
│   └── contact/
│       └── page.tsx            # Contact
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky navbar (client)
│   │   ├── MegaMenu.tsx        # Mega menu dropdown (client)
│   │   ├── MobileDrawer.tsx    # Mobile nav drawer (client)
│   │   ├── Footer.tsx          # Footer (RSC)
│   │   └── AnnouncementBar.tsx # Promo bar (client, dismissible)
│   ├── product/
│   │   ├── ProductCard.tsx     # Hover Reveal card (client)
│   │   ├── ProductGrid.tsx     # Grid wrapper with stagger (client)
│   │   ├── ProductGallery.tsx  # Image gallery (client)
│   │   ├── VariantSelector.tsx # Color/size pickers (client)
│   │   ├── SpecTable.tsx       # Specifications table (RSC)
│   │   ├── ComparisonTable.tsx # Side-by-side comparison (RSC)
│   │   └── QuickView.tsx       # Quick view modal (client)
│   ├── cart/
│   │   ├── CartItem.tsx        # Cart line item (client)
│   │   ├── CartSummary.tsx     # Order summary sidebar (client)
│   │   └── PromoCode.tsx       # Promo code input (client)
│   ├── reviews/
│   │   ├── ReviewCard.tsx      # Individual review (RSC)
│   │   ├── ReviewList.tsx      # Reviews with sorting (client)
│   │   ├── RatingBreakdown.tsx # Star distribution chart (RSC)
│   │   └── ReviewCarousel.tsx  # Homepage carousel (client)
│   ├── ui/
│   │   ├── Button.tsx          # Shared button with tactile press
│   │   ├── Input.tsx           # Form input with label + error
│   │   ├── Skeleton.tsx        # Shimmer skeleton loader
│   │   ├── StarRating.tsx      # SVG star rating display
│   │   ├── CountdownTimer.tsx  # Deals countdown (client)
│   │   ├── Tabs.tsx            # Tab navigation with layoutId
│   │   └── Badge.tsx           # Cart/notification badge
│   ├── home/
│   │   ├── HeroSection.tsx     # Left-aligned editorial hero
│   │   ├── FeaturedSpotlight.tsx # Featured product spotlight
│   │   ├── CategoryRow.tsx     # Horizontal scroll categories
│   │   ├── TrendingProducts.tsx # Trending row
│   │   ├── DealsBanner.tsx     # Deals section with countdown
│   │   └── NewsletterSignup.tsx # Newsletter CTA
│   └── shared/
│       ├── FilterSidebar.tsx   # Shop filters (client)
│       ├── SortDropdown.tsx    # Sort selector (client)
│       └── EmptyState.tsx      # Empty state component
├── lib/
│   ├── data.ts                 # Mock product data & types
│   ├── cart-store.ts           # Cart state (zustand or context)
│   ├── wishlist-store.ts       # Wishlist state
│   └── utils.ts                # Formatting helpers (currency, etc.)
└── styles/
    └── globals.css             # Tailwind imports + Geist font
```

---

## 7. Data Model (Mock Data)

```typescript
type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;       // for deals/discounts
  images: string[];             // picsum.photos URLs
  description: string;
  shortDescription: string;
  specs: Record<string, string>;
  colors: { name: string; hex: string }[];
  variants: { label: string; value: string }[];
  rating: number;               // e.g. 4.7
  reviewCount: number;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  isDeal: boolean;
  dealEndsAt?: string;          // ISO date for countdown
};

type Review = {
  id: string;
  productId: string;
  rating: number;
  title: string;
  body: string;
  author: string;
  date: string;
  verified: boolean;
};

type CartItem = {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedVariant: string;
};
```

---

## 8. Key Implementation Notes

1. **RSC by default.** Only add `'use client'` for interactive leaf components (hover cards, carousels, modals, forms, state-dependent UI).
2. **No emoji anywhere.** Use Phosphor Icons (`@phosphor-icons/react`) for all icons.
3. **Images:** Use `https://picsum.photos/seed/{product-slug}/800/600` for reliable placeholders.
4. **State:** Use React Context for cart and wishlist (wrap providers in a `'use client'` component in root layout).
5. **No purple/blue AI aesthetic.** Stick to zinc/slate neutrals with emerald accent.
6. **Mobile-first:** All asymmetric layouts collapse to single-column `w-full px-4` below `md`.
7. **Fonts:** Import Geist via `next/font/google` or local files. Set as CSS variable.
8. **No 3-column equal card rows.** Use asymmetric grids or horizontal scroll instead.
9. **Full-height sections:** Always `min-h-[100dvh]`, never `h-screen`.
10. **Grid over flexbox math:** Use CSS Grid for all multi-column layouts.

---

## 9. Pages Summary

| Page | Route | Key Sections |
|---|---|---|
| Home | `/` | Hero, Featured Spotlight, Categories, Trending, Deals, Reviews, Newsletter |
| Shop | `/shop` | Filter sidebar, Product grid, Sort, Pagination |
| Category | `/category/[slug]` | Category hero, Subcategory pills, Filtered product grid |
| Product Detail | `/product/[slug]` | Image gallery, Specs, Comparisons, Reviews, Related products |
| Cart | `/cart` | Cart items, Order summary, Promo code |
| Wishlist | `/wishlist` | Wishlisted product grid, Move to cart |
| About | `/about` | Story, Values, Stats |
| Contact | `/contact` | Contact info, Form |
