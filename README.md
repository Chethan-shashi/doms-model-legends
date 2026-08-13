# Doms Model Legends — Website

Plain HTML, CSS and JavaScript. No build step, no frameworks, no installs.

## Files

```
index.html      All page content
style.css       All styling
script.js       Navigation, popups, FAQ, contact form
images/         All photos (32 files)
robots.txt      Tells Google it can index the site
sitemap.xml     Lists pages for Google
```

## Running it locally

Open `index.html` in a browser. That's it.

For live-reload while editing, install the **Live Server** extension in VS Code, then right-click `index.html` → *Open with Live Server*.

---

## Common edits

### Change text
Open `index.html`, use `Ctrl+F` to find the words, type over them.

### Replace a photo
Drop the new photo into `images/` with **exactly the same filename** as the one it replaces. Nothing else to change.

Keep new photos under 1600px wide so pages stay fast.

### Add a gallery image
1. Save it as `images/gallery-18.jpg`
2. In `index.html`, find the gallery grid and copy an existing line:

```html
<div class="g-item fade" tabindex="0" role="button">
  <img loading="lazy" decoding="async" src="images/gallery-18.jpg" alt="Describe the photo here"/>
</div>
```

### Add a new model project
Copy an existing card in the Models section and an existing model detail page (`id="model-1940"` is a good template). Give the new page a unique `id`, and point the card's `data-page` at it.

---

## Turning the contact form on

The form currently opens the visitor's email app. To have messages arrive in Dom's inbox instead:

1. Go to **formspree.io** and sign up (free)
2. Create a new form, using `legendsmodelling1940@outlook.com`
3. Copy the endpoint URL it gives you — looks like `https://formspree.io/f/abcdwxyz`
4. Open `script.js`, find line ~14:

```js
var FORMSPREE_ENDPOINT = '';
```

5. Paste the URL between the quotes:

```js
var FORMSPREE_ENDPOINT = 'https://formspree.io/f/abcdwxyz';
```

6. Save. Done — messages now go straight to the inbox.

---

## Going live

**Netlify** (easiest, free):
1. Go to netlify.com, sign up
2. Drag this whole folder onto the page
3. Live in seconds

**Custom domain:** buy from Namecheap or GoDaddy (~£10/yr), then point it at Netlify in Site settings → Domain management.

After going live, update the domain in three places so link previews and Google work correctly:
- `index.html` — the `og:url`, `og:image`, `canonical` and `twitter:image` tags
- `robots.txt` — the sitemap line
- `sitemap.xml` — all URLs

---

## Still outstanding

- USAAF project image (placeholder currently showing)
- YouTube channel link (button shows "Coming Soon")
- Formspree endpoint (see above)
- Real domain name in the meta tags
