# Laurie A Roening Birthday Site

A responsive static birthday site for Laurie A Roening.

## What Is Included

- Romantic birthday hero section
- Animated CSS birthday cake with a candle wish button
- Confetti celebration actions
- SEO/social metadata in the document head
- Local SVG favicon
- Local SVG share preview image
- Interactive 3D flipping birthday book
- Mobile-friendly layout

## Open The Site

Open this file in a browser:

```text
frontend/index.html
```

To jump straight to the birthday book and open the cover:

```text
frontend/index.html#card
```

## Birthday Book Controls

The birthday card is built as a flipping book, not a list of cards.

- Click `Open the card` to jump to the book and open the cover.
- Click or tap the right side of the book to turn forward.
- Click or tap the left side of the book to turn back.
- On desktop, the book presents as a two-page spread.
- On mobile, it becomes a single-page flip book so the message stays readable.

## Main Files

```text
frontend/index.html
frontend/style.css
frontend/script.js
frontend/favicon.svg
frontend/birthday-preview.svg
```

The older demo folders are still present as references:

```text
frontend/css-birthday-cake/
frontend/3d-flip-hover-effects-book-of-congratulations-from-the-game/
```

## Verification

Run a JavaScript syntax check:

```text
node --check frontend/script.js
```
