# Swarna Kernel storefront

A static e-commerce storefront for Swarna Kernel, a cashew and dry fruit brand from Gujarat, India.
Built with Next.js (App Router), TypeScript and Tailwind CSS 4. There is no server and no database. Orders and
enquiries are sent through WhatsApp.

`reference/index.html` is the original single-file prototype. It is kept only for comparison.

## Run it

Requires Node 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run build      # static export into /out
npm run start      # serve /out locally (uses npx serve)
npm run lint
npm run typecheck
```

## First things to set up

Open [config/site.ts](config/site.ts) and fill in every `TODO`:

| Setting | What it does |
| --- | --- |
| `whatsappNumber` | Country code plus number, digits only (for example `919812345678`). **Until this is set, the "Order on WhatsApp" and "Send enquiry" buttons show a disabled state.** |
| `siteUrl` | Your production URL with no trailing slash. **Until this is set, the sitemap is empty and canonical links are left out.** |
| `address`, `email`, `fssai` | Shown in the footer. Placeholder text shows until they are filled in. |
| `freeDeliveryFrom`, `deliveryFee` | Rupees. Currently 999 and 60. |

## Edit products and prices

All products live in [data/products.ts](data/products.ts). Each entry looks like this:

```ts
{
  id: 3,                         // unique number, used by the cart. Never reuse an id.
  slug: "w240-premium-cashews",  // the URL: /products/w240-premium-cashews/
  category: "whole",             // whole | splits | flavoured | dryfruits | gifts
  subcategory: "W240",           // must match a name in data/categories.ts
  name: "W240 Premium cashews",
  description: "…",
  price: 299,                    // rupees for 250 g (for gift boxes: the price of one box)
  mrp: 349,                      // printed MRP, same unit as price
  badge: "Bestseller",           // optional
  badgeHot: true,                // optional: red badge instead of dark
  art: "whole",                  // which drawing to use (see below)
  popularity: 10,                // higher shows first under "Most popular"
  keywords: "kaju cashew",       // extra search terms, Hindi and Gujarati names
  image: "/products/w240.jpg",   // optional real photo
}
```

- **Prices:** edit `price` and `mrp`. The 500 g and 1 kg prices are calculated with the multipliers in
  [lib/pricing.ts](lib/pricing.ts) (`1`, `1.95`, `3.8`).
- **Gift boxes:** set `fixedPrice: true`. They have one price and no pack-size picker.
- **Add a product:** copy an entry, give it a new `id` and `slug`. The product page, sitemap and related products
  update by themselves.
- **Add a subcategory or category:** edit [data/categories.ts](data/categories.ts).
- **Grades:** names, descriptions and counts are in [data/grades.ts](data/grades.ts). The grade explorer on the home
  page and the "What W240 means" text on product pages read from it.
- **Search words:** Hindi and Gujarati synonyms (kaju, badam, pista, kishmish, akhrot, anjeer) are in
  [lib/search.ts](lib/search.ts). Add more words to `keywords` on a product, or a new group to `synonymGroups`.

### Art types

`whole`, `half`, `piece` (with `pieceScale`), `flav` (with `tone`: roast, peri, pepper, honey), `almond`, `pista`,
`raisin`, `walnut`, `fig`, `tray` (with `parts`) and `tin`. The drawings are in `components/art/`.

### Real photos

1. Put the file in `public/products/` (for example `public/products/w240.jpg`).
2. Set `image: "/products/w240.jpg"` on the product.

The photo replaces the illustration on cards, the cart and the product page. A static export cannot resize images
at request time (`images.unoptimized` is on in `next.config.mjs`), so export photos at about 800 x 816 px and
compress them before adding them.

## How checkout works

There is no payment step. The cart builds a text message listing items, quantities, subtotal, delivery and total,
then opens `https://wa.me/<number>?text=<message>`. The customer adds their address and presses send in WhatsApp.
The wholesale enquiry form works the same way. The cart is saved in the browser (`localStorage`) and survives
reloads.

## Deploy to Vercel

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel choose **Add New, Project** and import the repository.
3. Leave the framework as **Next.js**. The defaults (`npm run build`) work, and the static export in
   `next.config.mjs` (`output: "export"`) is picked up automatically.
4. Deploy. Then set `siteUrl` in `config/site.ts` to the live address, commit and redeploy so the sitemap and
   canonical links are filled in.

Any static host also works: run `npm run build` and upload the `out/` folder.

## Project layout

```
app/            pages, layout, sitemap, robots, Open Graph image
components/     layout, home, product, cart, art (SVG drawings), ui
config/site.ts  contact details and delivery rules
context/        cart state
data/           products, categories, grades
lib/            pricing, search, WhatsApp links, SEO helpers
public/products optional product photos
```

## Design tokens

Colours, fonts, spacing and radii are defined once in the `@theme` block of [app/globals.css](app/globals.css), and
become Tailwind classes (`bg-leaf`, `text-kernel`, `bg-swarna`, `rounded-pill`, `font-display`, and so on).
Gold (`swarna`) is used for actions and the promise band only. Red (`apple`) is used for badges only.

## Before launch

- Replace the sample prices and descriptions in `data/products.ts` with real ones.
- Fill in `config/site.ts` (WhatsApp number, site URL, email, address, FSSAI number).
- Replace `app/opengraph-image.tsx` with a real brand image (or drop an `opengraph-image.png` in `app/`).
- Add real product photos.
