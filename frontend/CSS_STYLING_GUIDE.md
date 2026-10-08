# CSS Styling Implementation Guide

## File Structure

```
src/styles/
├── globals.css          # Global reset and base styles
├── variables.css        # CSS custom properties
├── animations.css       # Keyframe animations
├── responsive.css       # Media query utilities
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── inputs.css
│   ├── tables.css
│   ├── navbar.css
│   └── modals.css
└── pages/
    ├── login.css
    ├── dashboard.css
    ├── ai-generator.css
    └── student-management.css
```

---

## CSS Variables (variables.css)

```css
:root {
  /* ===== COLORS ===== */

  /* Primary Colors */
  --color-primary: #7c3aed;
  --color-primary-50: #faf5ff;
  --color-primary-100: #f3e8ff;
  --color-primary-200: #e9d5ff;
  --color-primary-300: #d8b4fe;
  --color-primary-400: #c4b5fd;
  --color-primary-500: #a78bfa;
  --color-primary-600: #9333ea;
  --color-primary-700: #7e22ce;

  /* Secondary Colors */
  --color-secondary: #3b82f6;
  --color-secondary-50: #eff6ff;
  --color-secondary-100: #dbeafe;
  --color-secondary-200: #bfdbfe;
  --color-secondary-300: #93c5fd;

  /* Accent Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Semantic Colors */
  --bg-primary: #fafaf9;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f3f4f6;
  --bg-hover: #f9fafb;

  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;
  --text-inverse: #ffffff;

  --border-color: #e5e7eb;
  --border-color-light: #f3f4f6;

  /* ===== GRADIENTS ===== */
  --gradient-primary: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
  --gradient-accent: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
  --gradient-success: linear-gradient(135deg, #14b8a6 0%, #10b981 100%);
  --gradient-info: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%);

  /* ===== SHADOWS ===== */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 20px 0 rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 12px 30px 0 rgba(0, 0, 0, 0.15);
  --shadow-2xl: 0 20px 40px 0 rgba(0, 0, 0, 0.15);
  --shadow-inset: inset 0 1px 3px 0 rgba(0, 0, 0, 0.05);

  /* ===== BORDER RADIUS ===== */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-full: 9999px;

  /* ===== SPACING - 8px grid ===== */
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --space-9: 36px;
  --space-10: 40px;
  --space-12: 48px;
  --space-14: 56px;
  --space-16: 64px;

  /* ===== TYPOGRAPHY ===== */
  --font-family:
    "Inter", "Poppins", "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  --font-mono: "Fira Code", "Courier New", monospace;

  --font-size-xs: 11px;
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 28px;
  --font-size-4xl: 32px;
  --font-size-5xl: 36px;

  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.2;
  --line-height-snug: 1.4;
  --line-height-normal: 1.6;
  --line-height-relaxed: 1.8;

  /* ===== Z-INDEX ===== */
  --z-hide: -1;
  --z-normal: 0;
  --z-dropdown: 100;
  --z-sticky: 500;
  --z-fixed: 1000;
  --z-navbar: 1000;
  --z-modal-backdrop: 1050;
  --z-modal: 1100;
  --z-popover: 1200;
  --z-toast: 1300;

  /* ===== TRANSITIONS ===== */
  --transition-fast: 100ms ease-in-out;
  --transition-base: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;

  /* ===== CONTAINER SIZES ===== */
  --container-sm: 576px;
  --container-md: 768px;
  --container-lg: 992px;
  --container-xl: 1200px;
  --container-2xl: 1280px;

  /* ===== BREAKPOINTS ===== */
  --breakpoint-xs: 0;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Dark mode (optional) */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0f172a;
    --bg-secondary: #1f2937;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
  }
}
```

---

## Global Styles (globals.css)

```css
/* ===== RESET ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: var(--line-height-normal);
  overflow-x: hidden;
}

/* ===== TYPOGRAPHY ===== */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-3);
}

h1 {
  font-size: var(--font-size-4xl);
}
h2 {
  font-size: var(--font-size-3xl);
}
h3 {
  font-size: var(--font-size-2xl);
}
h4 {
  font-size: var(--font-size-xl);
}
h5 {
  font-size: var(--font-size-lg);
}
h6 {
  font-size: var(--font-size-md);
}

p {
  margin-bottom: var(--space-4);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-base);
}

a:hover {
  color: var(--color-primary-600);
  text-decoration: underline;
}

strong,
b {
  font-weight: var(--font-weight-bold);
}

em,
i {
  font-style: italic;
}

/* ===== FORM ELEMENTS ===== */
button,
input,
select,
textarea {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
}

button {
  cursor: pointer;
  border: none;
  outline: none;
}

input,
textarea,
select {
  border: none;
  outline: none;
  background: transparent;
}

/* ===== LISTS ===== */
ul,
ol {
  margin-bottom: var(--space-4);
  padding-left: var(--space-6);
}

li {
  margin-bottom: var(--space-2);
}

/* ===== SCROLLBARS ===== */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* ===== FOCUS STATES (ACCESSIBILITY) ===== */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ===== SELECTION ===== */
::selection {
  background-color: var(--color-primary);
  color: var(--text-inverse);
}

/* ===== PLACEHOLDER ===== */
::placeholder {
  color: var(--text-tertiary);
}

:-ms-input-placeholder {
  color: var(--text-tertiary);
}

::-ms-input-placeholder {
  color: var(--text-tertiary);
}

/* ===== PRINT STYLES ===== */
@media print {
  body {
    background: white;
  }

  a {
    text-decoration: underline;
  }
}
```

---

## Animations (animations.css)

```css
/* ===== FADE ANIMATIONS ===== */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* ===== SLIDE ANIMATIONS ===== */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ===== SCALE ANIMATIONS ===== */
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* ===== ROTATE ANIMATIONS ===== */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* ===== SHIMMER (Skeleton) ===== */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* ===== UTILITY ANIMATION CLASSES ===== */
.animate-fadeIn {
  animation: fadeIn 300ms ease-in-out forwards;
}

.animate-slideUp {
  animation: slideUp 300ms ease-out forwards;
}

.animate-scaleIn {
  animation: scaleIn 300ms ease-out forwards;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## Responsive Design (responsive.css)

```css
/* ===== FLEX & GRID UTILITIES ===== */
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.gap-2 {
  gap: var(--space-2);
}
.gap-3 {
  gap: var(--space-3);
}
.gap-4 {
  gap: var(--space-4);
}
.gap-6 {
  gap: var(--space-6);
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: 1fr;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* ===== RESPONSIVE GRID LAYOUTS ===== */

/* Desktop: 1025px+ */
@media (min-width: 1025px) {
  .grid-desktop-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-5);
  }

  .grid-desktop-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
  }

  .hide-mobile {
    display: none;
  }
}

/* Tablet: 641px - 1024px */
@media (max-width: 1024px) and (min-width: 641px) {
  .grid-tablet-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }

  .hide-mobile {
    display: block;
  }

  .hide-tablet {
    display: none;
  }

  body {
    font-size: var(--font-size-base);
  }

  h1 {
    font-size: var(--font-size-3xl);
  }
  h2 {
    font-size: var(--font-size-2xl);
  }
}

/* Mobile: 0px - 640px */
@media (max-width: 640px) {
  body {
    font-size: 12px;
  }

  h1 {
    font-size: var(--font-size-2xl);
  }
  h2 {
    font-size: var(--font-size-xl);
  }
  h3 {
    font-size: var(--font-size-lg);
  }

  .grid-mobile-1 {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .hide-desktop {
    display: none;
  }

  /* Full-width mobile */
  .container-mobile-full {
    width: 100% !important;
    max-width: none !important;
    padding: var(--space-4);
  }

  /* Stack layouts on mobile */
  .flex-mobile-stack {
    flex-direction: column;
  }
}

/* ===== CONTAINER SIZES ===== */
.container {
  margin-left: auto;
  margin-right: auto;
}

.container-sm {
  max-width: var(--container-sm);
}

.container-md {
  max-width: var(--container-md);
}

.container-lg {
  max-width: var(--container-lg);
}

.container-xl {
  max-width: var(--container-xl);
}

.container-2xl {
  max-width: var(--container-2xl);
}

/* ===== DISPLAY UTILITIES ===== */
.hidden {
  display: none;
}

.visible {
  display: block;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.inline-block {
  display: inline-block;
}

/* ===== OVERFLOW UTILITIES ===== */
.overflow-hidden {
  overflow: hidden;
}

.overflow-auto {
  overflow: auto;
}

.overflow-x-auto {
  overflow-x: auto;
}

.overflow-y-auto {
  overflow-y: auto;
}

/* ===== POSITIONING ===== */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.fixed {
  position: fixed;
}

.sticky {
  position: sticky;
}

/* ===== SIZING ===== */
.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.min-h-screen {
  min-height: 100vh;
}

/* ===== PADDING UTILITIES ===== */
.p-2 {
  padding: var(--space-2);
}
.p-3 {
  padding: var(--space-3);
}
.p-4 {
  padding: var(--space-4);
}
.p-6 {
  padding: var(--space-6);
}

.px-4 {
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}
.py-6 {
  padding-top: var(--space-6);
  padding-bottom: var(--space-6);
}

/* ===== MARGIN UTILITIES ===== */
.m-0 {
  margin: 0;
}
.m-auto {
  margin: auto;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.my-6 {
  margin-top: var(--space-6);
  margin-bottom: var(--space-6);
}

.mt-4 {
  margin-top: var(--space-4);
}
.mb-6 {
  margin-bottom: var(--space-6);
}

/* ===== TEXT UTILITIES ===== */
.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.font-bold {
  font-weight: var(--font-weight-bold);
}

.font-semibold {
  font-weight: var(--font-weight-semibold);
}

.text-primary {
  color: var(--text-primary);
}

.text-secondary {
  color: var(--text-secondary);
}
```

---

## Component-Specific Styling

### Buttons (buttons.css)

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-family);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
}

/* ===== VARIANTS ===== */
.btn--primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-md);
}

.btn--primary:hover:not(:disabled) {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.btn--primary:active:not(:disabled) {
  box-shadow: var(--shadow-md);
  transform: translateY(0);
}

.btn--secondary {
  background: white;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn--secondary:hover:not(:disabled) {
  background: var(--color-primary-50);
}

.btn--danger {
  background: var(--color-error);
  color: white;
}

.btn--danger:hover:not(:disabled) {
  background: #dc2626;
}

.btn--ghost {
  background: transparent;
  color: var(--color-primary);
}

.btn--ghost:hover:not(:disabled) {
  background: var(--color-primary-50);
}

/* ===== SIZES ===== */
.btn--sm {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
}

.btn--md {
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-base);
}

.btn--lg {
  padding: var(--space-4) var(--space-6);
  font-size: var(--font-size-md);
}

/* ===== STATES ===== */
.btn:disabled,
.btn--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--loading {
  pointer-events: none;
  opacity: 0.8;
}

/* ===== FULL WIDTH ===== */
.btn--full {
  width: 100%;
}

/* ===== ICON BUTTONS ===== */
.btn--icon {
  padding: var(--space-3);
  border-radius: var(--radius-lg);
}

.btn__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn__spinner {
  animation: spin 1s linear infinite;
  margin-right: var(--space-2);
}
```

---

## Responsive Pattern Examples

### Mobile-First Approach

```css
/* Base styles (mobile first) */
.dashboard {
  padding: var(--space-4);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.dashboard__header {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-4);
}

.dashboard__metrics {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.dashboard__actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Tablet (641px+) */
@media (min-width: 641px) {
  .dashboard {
    padding: var(--space-6);
    gap: var(--space-6);
  }

  .dashboard__metrics {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard__actions {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

/* Desktop (1025px+) */
@media (min-width: 1025px) {
  .dashboard {
    padding: var(--space-6);
    max-width: var(--container-2xl);
    margin: 0 auto;
  }

  .dashboard__metrics {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-6);
  }

  .dashboard__actions {
    gap: var(--space-4);
  }
}
```

---

## Performance Optimization Tips

1. **Minimize repaints**:
   - Use `transform` and `opacity` for animations
   - Avoid animating `width`, `height`, `padding`, `margin`

2. **Lazy load images** with `loading="lazy"`

3. **Use CSS Grid/Flexbox** instead of floats

4. **Minify CSS** for production

5. **Use CSS custom properties** for maintainability

6. **Prefer `rem`/`em`** over `px` for scalability

7. **Use `will-change`** sparingly on animated elements

---

## Accessibility Best Practices

1. **Color contrast**: Min 4.5:1 for normal text
2. **Focus indicators**: Always visible
3. **Semantic HTML**: Use correct tags
4. **ARIA labels**: For screen readers
5. **Keyboard navigation**: Tab through all elements
6. **Reduced motion**: Respect `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---
