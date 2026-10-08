# Quick Reference & Implementation Checklist

## 🎨 Design System Quick Reference

### Color Palette

```
Primary: #7C3AED (Purple)
Secondary: #3B82F6 (Blue)
Accent: #EC4899 (Pink)
Success: #10B981 (Green)
Warning: #F59E0B (Orange)
Error: #EF4444 (Red)

Gradients:
- Primary: linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)
- Accent: linear-gradient(135deg, #EC4899 0%, #A855F7 100%)
- Success: linear-gradient(135deg, #14B8A6 0%, #10B981 100%)
- Info: linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)
```

### Typography

```
Font Family: Inter, Poppins, Roboto, system-ui
Body: 14px
Headings: 32px (H1) → 20px (H3)
Line Height: 1.6 (body), 1.2 (headings)
```

### Spacing (8px grid)

```
xs: 4px    md: 12px    xl: 24px    3xl: 40px
sm: 8px    lg: 16px    2xl: 32px   4xl: 48px
```

### Radius

```
Buttons/Inputs: 8px
Cards: 12px
Large Cards: 16px
Badges: 20px (full)
```

### Shadows

```
sm: 0 1px 3px rgba(0,0,0,0.08)
md: 0 4px 12px rgba(0,0,0,0.1)
lg: 0 8px 20px rgba(0,0,0,0.12)
xl: 0 12px 30px rgba(0,0,0,0.15)
```

---

## 📐 Responsive Breakpoints

```
Mobile: 0 - 640px
Tablet: 641px - 1024px
Desktop: 1025px+

Container Width:
- Mobile: 100% (20px padding)
- Tablet: 90% (24px padding)
- Desktop: 1280px max-width
```

### Responsive Grid Pattern

```
Desktop (1025px+): 4 columns | 3 columns | 2 columns
Tablet (641px): 2 columns | 2 columns | 1 column
Mobile (640px↓): 1 column | 1 column | 1 column
```

---

## 🧩 Component Token Map

### Button Component

```jsx
<Button variant="primary|secondary|danger|ghost" size="sm|md|lg" fullWidth icon={<Icon />} loading>
  Label
</Button>

Variants:
- primary: Gradient purple-blue, white text
- secondary: White bg, primary border & text
- danger: Red background, white text
- ghost: Transparent, primary text
```

### Card Component

```jsx
<Card
  variant="default|elevated|outline|gradient"
  padding="sm|md|lg"
  radius="lg|xl"
>
  Content
</Card>
```

### MetricCard Component

```jsx
<MetricCard
  icon={<Icon />}
  number="1,234"
  label="Label Text"
  trend={{ value: "+12%", positive: true }}
  gradient="gradient-1|2|3|4"
/>
```

### Input Component

```jsx
<Input
  label="Label"
  placeholder="Placeholder"
  type="text|email|password|date|number"
  icon={<Icon />}
  error="Error message"
  required
/>
```

### Data Table Component

```jsx
<DataTable
  columns={[
    {
      key: "name",
      label: "Name",
      width: "180px",
      render: (val, row) => <span>{val}</span>,
    },
  ]}
  data={[{ id: 1, name: "John" }]}
  onDelete={(id) => {}}
  actions={true}
/>
```

### Badge Component

```jsx
<Badge variant="success|warning|error|info">
  <span className="badge-icon">{icon}</span>
  Label
</Badge>
```

---

## 🎯 Page Structure Template

```jsx
// pages/PageName.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

export default function PageName() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch data
  }, []);

  return (
    <>
      <Navbar />
      <main className="page-name">
        <div className="page-container">
          {/* Page Header */}
          <div className="page-header">
            <h1>Page Title</h1>
            <p>Subtitle</p>
          </div>

          {/* Content */}
          <Card>{/* Component content */}</Card>
        </div>
      </main>
    </>
  );
}
```

---

## 📋 Installation & Setup Checklist

### 1. Initialize Vite React Project

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

### 2. Install Dependencies

```bash
npm install axios react-router-dom zustand
npm install -D tailwind-css postscss autoprefixer
npm install lucide-react recharts
```

### 3. Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Textarea.jsx
│   │   ├── Navbar.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── DataTable.jsx
│   │   └── Badge.jsx
│   ├── dashboard/
│   │   ├── MetricCard.jsx
│   │   ├── QuickActions.jsx
│   │   └── DashboardGrid.jsx
│   ├── auth/
│   │   └── LoginForm.jsx
│   ├── ai/
│   │   ├── HeroSection.jsx
│   │   └── GeneratorForm.jsx
│   └── students/
│       ├── UploadSection.jsx
│       └── StudentTable.jsx
├── pages/
│   ├── Login.jsx
│   ├── AdminDashboard.jsx
│   ├── AIGenerator.jsx
│   ├── StudentManagement.jsx
│   ├── QuizManager.jsx
│   └── NotFound.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useFetch.js
│   ├── useForm.js
│   └── useToast.js
├── context/
│   ├── AuthContext.jsx
│   └── ToastContext.jsx
├── styles/
│   ├── globals.css
│   ├── variables.css
│   ├── animations.css
│   ├── responsive.css
│   ├── components.css
│   └── pages.css
├── utils/
│   ├── api.js
│   ├── validators.js
│   ├── constants.js
│   └── formatters.js
├── App.jsx
├── App.css
└── main.jsx
```

### 4. CSS Setup

- [ ] Create `styles/variables.css` with design tokens
- [ ] Create `styles/globals.css` with base styles
- [ ] Create `styles/animations.css` with keyframes
- [ ] Create `styles/responsive.css` with media queries
- [ ] Import all in `main.jsx`

### 5. Components to Create (Priority Order)

- [ ] **Phase 1 (Core)**: Button, Card, Input, Badge
- [ ] **Phase 2 (Common)**: Navbar, Textarea, Toast, Modal
- [ ] **Phase 3 (Complex)**: DataTable, MetricCard, QuickActions
- [ ] **Phase 4 (Pages)**: Login, Dashboard, AIGenerator, StudentManagement

---

## ✅ Page Implementation Checklist

### LOGIN PAGE

- [ ] Tab toggle (Admin/Student)
- [ ] Email input with validation
- [ ] Password input
- [ ] Login button with loading state
- [ ] Error message display
- [ ] Responsive on mobile
- [ ] Forgot password link
- [ ] Create account link
- [ ] Background gradient
- [ ] Centered card layout
- [ ] Form submission handling

### ADMIN DASHBOARD

- [ ] Sticky navbar with logo & user menu
- [ ] Page header with title
- [ ] 4 metric cards in responsive grid
- [ ] MetricCard: icon, number, label, trend
- [ ] Quick Actions section with 5 buttons
- [ ] Recent activity chart (optional)
- [ ] Responsive grid (4 cols → 2 cols → 1 col)
- [ ] Proper spacing and alignment
- [ ] Fetch metrics from API
- [ ] Loading state while fetching

### AI QUESTION GENERATOR

- [ ] Hero section with gradient background
- [ ] Feature chips (4 items)
- [ ] Form card with topic textarea
- [ ] Difficulty selector
- [ ] Quantity selector
- [ ] Generate button
- [ ] Generated questions preview (optional)
- [ ] Loading state while generating
- [ ] Error handling
- [ ] Responsive layout

### STUDENT MANAGEMENT

- [ ] Summary metric cards (4)
- [ ] Upload section with drag-drop styling
- [ ] Download template button
- [ ] File upload button
- [ ] Search bar
- [ ] Data table with columns
- [ ] Eligibility badge (green/red)
- [ ] Delete action button
- [ ] Loading states
- [ ] Pagination (if 100+ students)
- [ ] Responsive table (card view on mobile)

### QUIZ MANAGER

- [ ] Quiz title input
- [ ] Description textarea
- [ ] Expiry date picker
- [ ] Time limit input
- [ ] Question selector (scrollable list)
- [ ] Quiz settings checkboxes
- [ ] Create button
- [ ] Active quiz links list
- [ ] Edit/Delete actions
- [ ] Copy link functionality

---

## 🎬 Animation & Interaction Checklist

### Button Interactions

- [ ] Hover: shadow increase + scale 1.02
- [ ] Active: shadow decrease + scale 1.0
- [ ] Loading: spinner inside button
- [ ] Disabled: opacity 0.6 + no cursor

### Card Interactions

- [ ] Hover on elevated: shadow lg + translateY(-2px)
- [ ] Fade in on load: 300ms

### Input Interactions

- [ ] Focus: blue border + glow effect
- [ ] Error: red border + error message
- [ ] Filled: border color change

### Page Transitions

- [ ] Fade in: 300ms
- [ ] Slide up: 300ms (elements)

---

## 🔍 Testing Checklist

### Responsive Testing

- [ ] Mobile (320px, 375px, 480px)
- [ ] Tablet (600px, 768px, 900px)
- [ ] Desktop (1024px, 1280px, 1920px)

### Browser Testing

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Accessibility Testing

- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader testing
- [ ] Color contrast ratio (4.5:1)
- [ ] Focus indicators visible
- [ ] ARIA labels where needed

### Functionality Testing

- [ ] Form validation
- [ ] Error handling
- [ ] Loading states
- [ ] API integration
- [ ] Auth flow
- [ ] Data display
- [ ] Search/Filter
- [ ] File upload
- [ ] Delete confirmations

---

## 🚀 Performance Checklist

- [ ] Minify CSS & JS
- [ ] Optimize images (WebP format)
- [ ] Lazy load images
- [ ] Code splitting for pages
- [ ] Remove unused dependencies
- [ ] Use CSS modules or BEM naming
- [ ] Implement error boundaries
- [ ] Add skeleton screens for loading
- [ ] Debounce search input
- [ ] Memoize React components where needed
- [ ] Check bundle size

---

## 📱 Mobile-First Development Tips

1. **Start with mobile layout**: Design base styles for 320px
2. **Use min-width media queries**: Not max-width
3. **Touch-friendly targets**: Min 44x44px for buttons
4. **Test with real devices**: Not just browser devtools
5. **Consider data usage**: Optimize images
6. **Navigation patterns**: Hamburger menu for mobile
7. **Thumb zones**: Place actions in reachable areas
8. **Mobile first breakpoints**:
   - 640px: Tablet switches
   - 1024px: Desktop switches

---

## 🎨 CSS Class Naming Convention (BEM)

```css
/* Block */
.card {
}

/* Block--Modifier */
.card--elevated {
}
.card--gradient {
}

/* Block__Element */
.card__title {
}
.card__content {
}

/* Block__Element--Modifier */
.card__title--large {
}

/* State classes */
.is-loading {
}
.is-active {
}
.is-disabled {
}
```

---

## 🔗 Common API Routes (Backend Integration)

```
Authentication:
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/logout

Admin Dashboard:
- GET /api/dashboard/metrics
- GET /api/dashboard/activity

AI Generator:
- POST /api/ai/generate

Students:
- GET /api/students
- POST /api/students/upload
- DELETE /api/students/:id

Questions:
- GET /api/questions
- POST /api/questions
- PUT /api/questions/:id
- DELETE /api/questions/:id

Quizzes:
- GET /api/quizzes
- POST /api/quizzes
- PUT /api/quizzes/:id
- DELETE /api/quizzes/:id
```

---

## 🎯 Key Principles to Remember

1. **Consistency**: Use design tokens everywhere
2. **Accessibility**: WCAG 2.1 AA minimum
3. **Performance**: Optimize for Core Web Vitals
4. **Mobile-First**: Design for small screens first
5. **Simplicity**: Keep UI clean and uncluttered
6. **Feedback**: Show loading, error, and success states
7. **Spacing**: Use 8px grid consistently
8. **Hierarchy**: Clear visual priority
9. **Contrast**: Sufficient color contrast
10. **Testing**: Test across devices and browsers

---

## 📚 Documentation Links

- [React Docs](https://react.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Web Accessibility](https://www.a11y-101.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 💡 Quick Copy-Paste Snippets

### Button Component Skeleton

```jsx
export const Button = ({
  children,
  variant = "primary",
  loading,
  ...props
}) => (
  <button
    className={`btn btn--${variant} ${loading ? "btn--loading" : ""}`}
    {...props}
  >
    {loading && <span className="btn__spinner">⚙️</span>}
    {children}
  </button>
);
```

### Card Component Skeleton

```jsx
export const Card = ({ children, variant = "default", ...props }) => (
  <div className={`card card--${variant}`} {...props}>
    {children}
  </div>
);
```

### Input Component Skeleton

```jsx
export const Input = ({ label, error, icon, ...props }) => (
  <div className={`input-wrapper ${error ? "input-wrapper--error" : ""}`}>
    {icon && <span className="input__icon">{icon}</span>}
    <input className="input" {...props} />
    {error && <span className="input__error">{error}</span>}
  </div>
);
```

### useForm Hook

```jsx
export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return { values, errors, touched, handleChange, handleBlur, handleSubmit };
};
```

---
