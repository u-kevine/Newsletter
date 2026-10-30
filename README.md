# Newsletter Sign-Up Form with Success Message

A responsive newsletter sign-up form built with HTML, CSS and vanilla JavaScript. Users can enter their email, get real-time validation feedback, and see a success message that confirms the address they subscribed with.

## Overview

Users should be able to:

- Add their email and submit the form
- See a success message with their email after successfully submitting the form
- See form validation messages if the field is left empty or the email address is not formatted correctly
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

## Features

- **Real-time validation** for empty fields and incorrectly formatted emails
- **Dynamic messages:** error text appears beside the label, and the success view shows the submitted email
- **Hover and focus states** on the input and both buttons, including a gradient hover effect on the buttons
- **Mobile-first responsive layout** with three breakpoints
- **Accessible markup:** labels, ARIA attributes, live regions and focus management
- **Reduced-motion support** for users who prefer less animation

## Built with

- Semantic HTML5
- CSS custom properties (variables)
- Flexbox and CSS Grid
- Mobile-first workflow with media queries
- Vanilla JavaScript (no libraries or frameworks)
- [Roboto](https://fonts.google.com/specimen/Roboto) from Google Fonts

## Project structure

```
newsletter-signup/
├── index.html   # Page structure: sign-up card and success message
├── styles.css   # Design tokens, layout, states and media queries
├── script.js    # Validation logic and view switching
└── README.md
```

## Getting started

No build step or installation is needed.

1. Clone or download this repository.
2. Open `index.html` in any modern browser.

To run it with a local server instead (optional):

```bash
# Using Python
python -m http.server 8000

# Or using Node
npx serve .
```

Then visit `http://localhost:8000`.

## How it works

1. The form uses `novalidate` so the browser's default error bubbles are replaced with custom, consistently styled messages.
2. On submit, the email is trimmed and checked:
   - Empty → "Email address is required"
   - Wrong format → "Valid email required"
3. After the first submit or blur, the field re-validates on every keystroke, so errors clear as soon as the input becomes valid. Users are not shown an error while typing for the first time.
4. Invalid input sets `aria-invalid="true"`, which CSS uses to apply the error styling.
5. A valid submission hides the form, shows the success message, and inserts the email using `textContent` (which prevents HTML injection).
6. "Dismiss message" resets the form and returns focus to the email field.

## Accessibility

- Every input has an associated `<label>`.
- `type="email"`, `inputmode="email"` and `autocomplete="email"` help with mobile keyboards and autofill.
- The error message is linked to the input with `aria-describedby` and announced through `aria-live="polite"`.
- Focus moves to the success heading after submitting, and back to the input after dismissing.
- Decorative SVGs use `aria-hidden="true"` and `focusable="false"`.
- Visible keyboard focus styles are provided with `:focus-visible`.
- Animations are disabled when `prefers-reduced-motion` is set.

## Responsive breakpoints

| Screen width | Layout |
|---|---|
| Below 600px | Full-screen white layout, illustration on top |
| 600px and up | Centered card on a dark background |
| 900px and up | Two columns: content on the left, illustration on the right |

## Browser testing

Tested in the latest versions of:

- Google Chrome
- Mozilla Firefox
- Safari (macOS and iOS)
- Microsoft Edge

Also checked with browser dev tools at common device widths (375px, 768px, 1440px).

## What I learned

- Gradients can't be transitioned directly, so the button hover uses a `::before` pseudo-element with a gradient whose opacity fades in.
- Using `aria-invalid` as a styling hook keeps the visual and accessible states in sync.

## Possible improvements

- Connect the form to a real email service (e.g. Mailchimp or a custom API).
- Add a loading state to the submit button while the request is in progress.
- Swap in the official challenge illustrations using a `<picture>` element.
