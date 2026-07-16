# Website Configuration Guide

Project folder: `/Users/xyonloowos/Documents/one-page-website`

Open this folder in Visual Studio Code. Most content edits happen in `index.html`. Keep existing classes and `data-*` attributes unless you intentionally want to change behavior.

## Preview Locally

From Terminal:

```bash
cd /Users/xyonloowos/Documents/one-page-website
python3 -m http.server 8020
```

Open `http://localhost:8020`. If that port is busy, use another port and open the matching URL.

## Business Basics

In `index.html`, search and replace these placeholders:

- Phone shown to customers: `(587) 000-0000`
- Phone links and SMS links: `+15870000000`
- Website URL in SEO/schema: `https://example.com`
- Business name if needed: `DirectBrakesYYC`
- Service area wording if needed: `Mahogany, Calgary AB`

Phone link format:

```html
href="tel:+15871234567"
href="sms:+15871234567?&body=..."
```

## Hero Copy

Search for:

```html
id="hero-title"
```

Edit the nearby eyebrow, H1, subheadline, CTA buttons, trust pills, and reassurance line. Keep the positioning clear:

- Private garage
- Upfront estimate
- No surprise work
- Drop-off by appointment
- Located in Mahogany, Calgary AB

Avoid customer-facing wording like `mobile`, `backyard garage`, and `cheap`.

## Package Section

Search for:

```html
id="packages-title"
```

This section controls the customer funnel:

1. Select `Supply + install` or `You bring parts. I install them.`
2. Compare the three packages.
3. Text or call with vehicle details.

The three visible package cards are in `index.html`:

- `Minimum Service Package`
- `Brake + Rotor Package`
- `Brakes + rotors + oil change`

Keep these policy rules visible when editing this section:

- Supply + install: parts cost is paid upfront before ordering.
- You bring parts: fitment and compatibility are at the customer's own risk and expense.
- No added work happens without approval.
- Do not add post-service coverage promises.

When changing the visible supply-install prices, update the default Sedan/SUV/Truck values in `index.html`:

```html
data-package-price="minimum-sedan"
data-package-price="minimum-suv"
data-package-price="minimum-truck"
data-package-price="rotor-sedan"
data-package-price="rotor-suv"
data-package-price="rotor-truck"
data-package-price="bundle-sedan"
data-package-price="bundle-suv"
data-package-price="bundle-truck"
```

## Route Price Values

The selectable route pricing is in `js/main.js`. Search for:

```js
const packageRanges = {
```

Update these values:

```js
supply: {
  prices: {
    minimum: "$139 to $259",
    rotor: "$249 to $689",
    bundle: "$324 to $829"
  }
}

customer: {
  prices: {
    minimum: "$99 to $174",
    rotor: "$129 to $229",
    bundle: "$214 to $379"
  }
}
```

If you change the default `supply` prices in `js/main.js`, also update the matching prices in `index.html` so the page stays accurate before JavaScript runs.

The current static site does not fetch live supplier pricing. Auto Value pricing can be store-specific, and public supplier pages may require vehicle fitment or location. Update the configured values manually after checking your supplier cost.

## CTAs

Search for these phrases in `index.html`:

- `Get my brake estimate`
- `Text for a brake estimate`
- `Call now`
- `Text for estimate`

Change visible text only unless you also need to update the phone number or SMS message. Keep `data-track-event` attributes because they are used for click-event hooks if analytics is added later.

## Reviews And 5 Stars

Search for:

```html
<section class="section reviews-section" id="reviews"
```

Each review card uses this pattern:

```html
<article class="review-card">
  <div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
  <blockquote>"Replace with the real customer review."</blockquote>
  <p class="review-source">Customer name, vehicle, Calgary neighbourhood.</p>
</article>
```

To fill a 5-star review slot, replace only the text inside `<blockquote>` and `.review-source`. Keep the star line exactly as-is for a 5-star review. Use real customer wording only.

## Work Image Slots

Five work-photo placeholders are scattered through the page. Search for:

```html
photo-placeholder image-slot
```

Recommended image files go in:

```text
assets/images/work/
```

Recommended filenames:

- `garage-setup.jpg`
- `front-brakes.jpg`
- `rear-inspection.jpg`
- `tools-and-parts.jpg`
- `finished-job.jpg`

Replace a placeholder like this:

```html
<div class="photo-placeholder image-slot">Work photo 1: private garage setup</div>
```

With an image like this:

```html
<img class="site-photo" src="assets/images/work/garage-setup.jpg" alt="Private garage brake service appointment in Calgary">
```

Good alt text examples:

- `Private garage brake service appointment in Calgary`
- `Front brake pad and rotor replacement`
- `Rear brake service inspection`
- `Brake parts and tools for private garage service`
- `Finished brake job and old-parts review`

Use real photos when possible. Keep image files reasonably small, ideally under 300 KB each after compression.

## FAQ

Visible FAQ copy is in `index.html`. Search for:

```html
<section class="section faq-section" id="faq"
```

If you change FAQ questions or answers, update the FAQ JSON-LD in the `<head>` too. Search for:

```text
"@type": "FAQPage"
```

Visible FAQ and schema FAQ should stay consistent.

## SEO

SEO tags are near the top of `index.html`. Edit these together when changing the city, business name, or offer:

- `<title>`
- `<meta name="description">`
- Open Graph tags starting with `<meta property="og:`
- Twitter tags starting with `<meta name="twitter:`
- JSON-LD schema inside `<script type="application/ld+json">`

Do not add fake ratings, fake reviews, fake certifications, fake licensing, fake insurance, or a public address unless the business wants that information public.

## Final Check

Run:

```bash
npm run lint
npm test
npm run build
```

Then preview the page on a phone-sized browser. Confirm there is no `mobile`, `backyard garage`, or `cheap` wording unless it is intentionally non-customer-facing.
