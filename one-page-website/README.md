# DirectBrakesYYC One-Page Website

This is a simple owned-code static website built from the attached PDF design brief.

## Project Folder

`/Users/xyonloowos/Documents/one-page-website`

## How To Open The Project

Open Visual Studio Code, choose **File > Open Folder**, then select:

`/Users/xyonloowos/Documents/one-page-website`

The terminal `code` command was not available when this project was created, so opening the folder manually is the safest option if the app opener does not launch VS Code.

## How To Preview The Site

Simplest option:

1. Open the project folder.
2. Double-click `index.html`.

Local server option:

```bash
cd /Users/xyonloowos/Documents/one-page-website
python3 -m http.server 8000
```

Then open:

`http://localhost:8000`

## How To Edit The Content

Use `CONFIGURATION_GUIDE.md` for exact edit locations, review-slot instructions, image-slot instructions, SEO fields, and pricing configuration notes.

Most visible text is still in `index.html`. Search for the section heading or phrase you want to change, then edit the nearby text.

Important placeholders to replace before publishing:

- Phone number: `(587) 000-0000`
- SMS link phone value: `+15870000000`
- Open Graph URL: `https://example.com`
- Real customer reviews and Google Business Profile proof, if available
- Five real work photos in `assets/images/work/`
- Any final business wording, pricing, or service limits that need legal/business confirmation

The site does not store leads or submit a booking form. It sends visitors to call or text after they compare the packages.

## Package Routes And Prices

The quote section has two selectable parts routes and three package cards:

- Supply + install
- You bring parts. I install them.
- Minimum Service Package
- Brake + Rotor Package
- Brakes + Rotors + Oil Change

Supply + install copy explains that parts cost is paid upfront before ordering. Customer-supplied parts copy explains that fitment and compatibility are at the customer's own risk and expense. Do not add post-service coverage promises.

The route-switching price values are in:

`js/main.js`

Search for:

```js
const packageRanges = {
```

Update the Sedan/SUV/Truck values there when package prices change. Also update the matching default supply prices in `index.html` so the page still shows correct prices if JavaScript is disabled.

## Checks

This project has lightweight local checks with no third-party dependencies:

```bash
npm run lint
npm test
npm run build
```

`npm run build` checks that the static site has no missing local assets or broken internal anchors. It does not create a separate build folder because this is a plain static website.

## Files That Matter

- `index.html` - page content and section structure
- `css/styles.css` - layout, colors, spacing, and responsive design
- `js/main.js` - mobile menu, route price switching, sticky CTA, and click-event hooks
- `scripts/check-static-site.js` - static export readiness check
- `assets/icons/favicon.svg` - simple editable favicon
- `assets/images/brake-oil-service.svg` - editable service illustration
- `assets/images/work/` - real work-photo slots for the customer satisfaction section
- `reference/original-design.pdf` - original uploaded PDF
- `reference/extracted-text.txt` - text extracted from the PDF for reference
- `reference/rendered/` - rendered PDF pages used for visual checking

## Build Or Export

No build tool is used. The site is already exportable as static files.

To publish later, upload these files and folders to any static host:

- `index.html`
- `css/`
- `js/`
- `assets/`

Do not upload the `reference/` folder unless you want the PDF design brief publicly visible.
