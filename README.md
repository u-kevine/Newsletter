# Frontend Mentor: Newsletter sign-up form with success message

A responsive newsletter sign-up form built with HTML, CSS and vanilla JavaScript, matching the Frontend Mentor design in the `/design` folder. Users can enter their email, get real-time validation feedback, and see a success message that confirms the address they subscribed with.

![Design preview](./design/desktop-preview.jpg)

## The challenge

Users should be able to:

- Add their email and submit the form
- See a success message with their email after successfully submitting the form
- See form validation messages if the field is left empty or the email address is not formatted correctly
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

## Built with

- Semantic HTML5
- CSS custom properties, using the colors from `style-guide.md`
- Flexbox
- Mobile-first workflow with media queries
- Vanilla JavaScript (no libraries or frameworks)
- Roboto (400 and 700), self-hosted from `/assets/fonts` with `@font-face`
- A `<picture>` element to swap between the mobile and desktop illustrations

## Project structure

```
Newsletter-main/
├── index.html        # Sign-up card and success message
├── styles.css        # Fonts, colors, layout, states and media queries
├── script.js         # Validation logic and view switching
├── style-guide.md    # Colors and fonts from the design
├── assets/
│   ├── fonts/        # Roboto Regular and Bold
│   └── images/       # Illustrations, icons and favicon
└── design/           # Reference designs (mobile, desktop, states)
```

## Getting started

No build step is needed. Download the project and open `index.html` in a browser.

Because the fonts are loaded from local files, some browsers block them when a page is opened directly from disk. If the text doesn't appear in Roboto, run a local server instead:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

## How it works

1. The form uses `novalidate`, so the browser's default error bubbles are replaced with custom messages styled to match the design.
2. On submit, the email is trimmed and checked:
   - Empty → "Email address is required"
   - Wrong format → "Valid email required"
3. After the first submit or blur, the field re-validates on every keystroke, so errors clear as soon as the input becomes valid and reappear if the field is emptied.
4. Invalid input sets `aria-invalid="true"`. The CSS selector `.form__input[aria-invalid="true"]` uses that same attribute for the error styling (tomato border and tinted background), so the visual and screen-reader states always match.
5. A valid submission hides the form, shows the success message, and inserts the email with `textContent`, which prevents HTML injection.
6. "Dismiss message" resets the form and returns focus to the email field.

## Responsive layout

| Screen width | Layout |
|---|---|
| Below 600px | White full-screen layout with the mobile illustration on top; the success view fills the screen with the button at the bottom |
| 600px to 959px | White card on the charcoal background, with the illustration on top |
| 960px and up | Two-column card with the desktop illustration on the right, as in the desktop design |

The `<picture>` element loads the desktop illustration only at 960px and up, so phones don't download the larger image.

## Hover and focus states

- **Input:** dark slate border on hover and focus, plus a soft focus ring.
- **Buttons:** the tomato gradient and glow from `active-states.jpg` on hover and keyboard focus, plus an outline for keyboard users.
- **Error state:** tomato border and tinted background, with the message beside the label (from `error-states.jpg`).

## Accessibility

- The input has an associated `<label>`, and `type="email"` with `autocomplete="email"` for mobile keyboards and autofill.
- The error message is linked with `aria-describedby` and announced through `aria-live="polite"`.
- Focus moves to the success heading after submitting, and back to the input after dismissing.
- Decorative images use `alt=""`, so screen readers skip them.
- Keyboard focus is always visible.
- The error text and placeholder use slightly darker shades of the style-guide colors, so they meet WCAG AA contrast (4.5:1). The style-guide tomato is still used for the error border and background.
- Transitions are disabled when `prefers-reduced-motion` is set.

## Cross-browser consistency

- A small reset removes default margins and padding and uses `box-sizing: border-box`.
- `appearance: none` on the input and buttons removes default iOS/Safari styling.
- Form controls inherit the page font.
- Firefox's faded placeholder is reset to full opacity.
- Fonts use `font-display: swap`, with Arial as a fallback.

Tested in Chrome, Firefox, Safari and Edge, and at 375px, 768px and 1440px widths.
