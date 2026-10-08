# Quiz Application - UI/UX Design Guide

## Design System Overview

### Color Palette & Gradients

```
PRIMARY GRADIENTS:
- Purple-to-Blue: linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)
- Pink-to-Purple: linear-gradient(135deg, #EC4899 0%, #A855F7 100%)
- Teal-to-Green: linear-gradient(135deg, #14B8A6 0%, #10B981 100%)
- Blue-to-Cyan: linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)

ACCENT COLORS:
- Success/Green: #10B981 (rgb: 16, 185, 129)
- Warning/Orange: #F59E0B (rgb: 245, 158, 11)
- Error/Red: #EF4444 (rgb: 239, 68, 68)
- Info/Blue: #3B82F6 (rgb: 59, 130, 246)

NEUTRALS:
- Dark: #1F2937 (text)
- Medium: #6B7280 (secondary text)
- Light: #F3F4F6 (background)
- White: #FFFFFF (cards)
- Light Purple: #F3E8FF (subtle backgrounds)
- Light Blue: #EFF6FF (subtle backgrounds)

SEMANTIC COLORS:
- Background: #FAFAF9 (warm white)
- Card Background: #FFFFFF
- Text Primary: #1F2937
- Text Secondary: #6B7280
```

### Typography

```
Font Stack: 'Inter', 'Poppins', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif

SIZES & WEIGHTS:
- H1: 32px, 700 (bold)
- H2: 24px, 700 (bold)
- H3: 20px, 600 (semibold)
- H4: 16px, 600 (semibold)
- Body: 14px, 400 (regular)
- Small: 12px, 400 (regular)
- Caption: 11px, 500 (medium)

LINE HEIGHT:
- Headings: 1.2
- Body: 1.6
- Compact: 1.4
```

### Spacing System

```
8px grid-based spacing:
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
2xl: 32px
3xl: 40px
4xl: 48px

STANDARD PADDING:
- Input fields: 10px 12px
- Cards: 20px
- Sections: 24px
- Page padding: 24px (desktop), 16px (mobile)
- Container max-width: 1280px
```

### Border & Shadow System

```
BORDER RADIUS:
- Buttons: 8px
- Input fields: 8px
- Cards: 12px
- Large cards: 16px
- Badges: 20px (pill-shaped)

SHADOWS:
- Subtle: 0 1px 3px rgba(0,0,0,0.08)
- Default: 0 4px 12px rgba(0,0,0,0.1)
- Hover: 0 8px 20px rgba(0,0,0,0.12)
- Elevated: 0 12px 30px rgba(0,0,0,0.15)
- Inset: inset 0 1px 3px rgba(0,0,0,0.05)
```

---

## Page-by-Page Design Specifications

### 1. LOGIN PAGE

#### Layout Structure

```
┌─────────────────────────────────────┐
│                                     │
│      Full-screen gradient BG        │
│                                     │
│      ┌──────────────────────┐       │
│      │   Login Card         │       │
│      │                      │       │
│      │  [Admin | Student]   │       │
│      │                      │       │
│      │  Form Inputs         │       │
│      │  [CTA Button]        │       │
│      │                      │       │
│      └──────────────────────┘       │
│                                     │
└─────────────────────────────────────┘
```

#### Design Details

- **Background**: Soft gradient (Purple-to-Blue) with subtle animation
- **Card**:
  - Max-width: 400px
  - Center both horizontally & vertically
  - Background: white with subtle shadow (elevation)
  - Border-radius: 16px
  - Padding: 40px

- **Tab Toggle**:
  - Two buttons: "Admin Login" | "Student Login"
  - Active tab: gradient background
  - Inactive: light gray background
  - Smooth transition between tabs
  - Width: 100% of form
  - Margin-bottom: 30px
  - Border-radius: 12px

- **Input Fields**:
  - Icon prefix (email, lock)
  - Placeholder text in secondary color
  - Border: 1px solid #E5E7EB
  - Focus state: blue/purple border, subtle glow
  - Padding: 12px 14px
  - Font-size: 14px
  - Margin-bottom: 16px
  - Transition: 200ms

- **CTA Button**:
  - Full width
  - Gradient: Purple-to-Blue
  - Text: white, bold, 16px
  - Padding: 12px 16px
  - Border-radius: 8px
  - Hover: increased shadow, slight scale (1.02)
  - Active/Loading: opacity 0.8
  - Transition: 200ms

- **Additional Elements**:
  - Error message: red text, icon left
  - "Forgot Password?" link: blue, underline on hover
  - Sign up link: centered below

#### Responsive Behavior

- Desktop: Centered card, 400px width
- Tablet: 90% width, max 400px
- Mobile: 100% width, padding 20px, full height

---

### 2. ADMIN DASHBOARD

#### Layout Structure

```
┌─────────────────────────────────────┐
│  [Logo]  Navigation  [Admin Menu]   │  ← Sticky Navbar
├─────────────────────────────────────┤
│                                     │
│  Admin Dashboard                    │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌───┐ │
│  │Card 1│ │Card 2│ │Card 3│ │C 4│ │  ← Metric Cards (4-column)
│  └──────┘ └──────┘ └──────┘ └───┘ │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌───┐ │
│  │ Btn  │ │ Btn  │ │ Btn  │ │ B │ │  ← Quick Actions
│  └──────┘ └──────┘ └──────┘ └───┘ │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ Recent Activity / Chart         ││
│  └─────────────────────────────────┘│
│                                     │
└─────────────────────────────────────┘
```

#### Navbar Design

- **Height**: 64px
- **Background**: White with subtle shadow below
- **Layout**: Logo (left) | Navigation links (center) | Admin dropdown (right)
- **Sticky**: Fixed to top, z-index: 1000
- **Logo**: 32px height, color: gradient
- **Links**: Gray text, blue underline on hover
- **Admin Dropdown**: Profile avatar (36px, rounded), name, dropdown menu on click

#### Metric Cards

- **Grid**: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- **Gap**: 20px
- **Card Size**: 280px (height flexible)
- **Design**:
  - Gradient background (each card different gradient)
  - Rounded: 14px
  - Shadow: default
  - Padding: 24px
  - Hover: shadow increased, slight lift effect (transform: translateY(-2px))

- **Card Content**:

  ```
  ┌──────────────────────────┐
  │ Icon (32px, colored)     │
  │                          │
  │ 1,234                    │ ← Big number (28px, bold)
  │ Total Questions          │ ← Label (14px)
  │                          │
  │ ↑ 12% from last month    │ ← Stat (12px, green)
  └──────────────────────────┘
  ```

- **Card Colors**:
  - Total Questions: Purple-to-Blue gradient
  - Registered Users: Pink-to-Purple gradient
  - Quiz Attempts: Teal-to-Green gradient
  - Average Score: Blue-to-Cyan gradient

#### Quick Actions Section

- **Title**: "Quick Actions" (24px, bold)
- **Layout**: Horizontal flex, wrap on smaller screens
- **Buttons**:
  - Width: auto (min 120px)
  - Padding: 12px 20px
  - Icon (20px) + Text (14px)
  - Gap between icon & text: 8px
  - Each button has unique gradient
  - Shadow: subtle
  - Hover: shadow increased, scale 1.02
  - Buttons: Add Question, AI Generator, View Reports, Manage Users, Quiz Templates

---

### 3. AI QUESTION GENERATOR PAGE

#### Layout Structure

```
┌─────────────────────────────────────┐
│   Navbar (sticky)                   │
├─────────────────────────────────────┤
│                                     │
│    ┌──────────────────────────┐    │
│    │   Hero Header Section    │    │ ← Gradient background
│    │   Icon + Title + Subtitle│    │
│    │   Feature Chips          │    │
│    └──────────────────────────┘    │
│                                     │
│         ┌─────────────────┐        │
│         │  Form Card      │        │
│         │                 │        │
│         │  Textarea       │        │
│         │  [Generate Btn] │        │
│         │                 │        │
│         └─────────────────┘        │
│                                     │
│    ┌──────────────────────────┐    │
│    │   Generated Questions    │    │ ← Preview (if applicable)
│    │   (if any)              │    │
│    └──────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

#### Hero Section

- **Background**: Gradient (Purple-to-Blue with opacity)
- **Padding**: 48px top/bottom
- **Content**:
  - Icon: 64px, gradient background (light), centered
  - Title: "AI Question Generator" (32px, bold, white)
  - Subtitle: Descriptive text (16px, secondary color)
  - Margin-bottom: 24px

- **Feature Chips**:
  - 4 chips in a row (responsive grid)
  - Each chip: badge-style with icon + text
  - Background: light with accent color
  - Icon (16px) + Text (12px)
  - Padding: 8px 12px
  - Border-radius: 20px
  - Gap: 12px

#### Form Card

- **Max-width**: 600px
- **Center**: horizontally
- **Background**: white
- **Border-radius**: 14px
- **Padding**: 32px
- **Shadow**: default
- **Margin-top**: 32px

- **Form Elements**:
  - Label: "Topic/Concept" (14px, bold)
  - Textarea:
    - Height: 120px
    - Padding: 12px
    - Border: 1px solid #E5E7EB
    - Border-radius: 8px
    - Focus: blue border, subtle glow
    - Font-size: 14px
    - Resize: vertical only
  - Generate Button:
    - Full width
    - Gradient: Purple-to-Blue
    - Padding: 14px
    - Font: 16px, bold
    - Border-radius: 8px
    - Margin-top: 20px
    - Hover: shadow + scale effect
    - Loading state: spinner + disabled cursor

---

### 4. STUDENT MANAGEMENT PAGE

#### Layout Structure

```
┌─────────────────────────────────────┐
│   Navbar (sticky)                   │
├─────────────────────────────────────┤
│                                     │
│  Student Management                 │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌───┐ │
│  │Card 1│ │Card 2│ │Card 3│ │C 4│ │  ← Summary Cards (4-col responsive)
│  └──────┘ └──────┘ └──────┘ └───┘ │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ Upload Section                  ││
│  │ [Download] [Upload File] [Btn]  ││
│  └─────────────────────────────────┘│
│                                     │
│  [Search bar]                       │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ Data Table                      ││
│  │ Roll No | Name | Email | ... D  ││
│  │ ─────────────────────────────── ││
│  │ Row 1                           ││
│  │ Row 2                           ││
│  │ Row 3                           ││
│  └─────────────────────────────────┘│
│                                     │
└─────────────────────────────────────┘
```

#### Summary Cards (Top Section)

- **Grid**: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- **Similar to Dashboard Cards**:
  - Total Students, Eligible, Ineligible, Tests Completed
  - Gradient backgrounds
  - Icons + numbers + labels
  - Consistent styling with dashboard

#### Upload Section

- **Card**:
  - Background: #F3E8FF (light purple)
  - Border: 2px dashed #D8B4FE
  - Border-radius: 12px
  - Padding: 32px
  - Text-align: center

- **Content**:
  - Icon: upload arrow (32px, purple)
  - Text: "Upload Student List" (16px, bold)
  - Subtext: "CSV or Excel format" (12px)
  - Buttons Row:
    - "Download Template" button (secondary style)
    - File input (hidden)
    - "Upload" button (primary style)
  - Gap between buttons: 12px

- **Button Styles**:
  - Secondary (Download): white background, blue border, blue text
  - Primary (Upload): gradient background, white text

#### Search Bar

- **Position**: Above data table
- **Width**: 100%
- **Icon**: search icon (left)
- **Placeholder**: "Search by name, email, or roll no"
- **Styling**: similar to login input
- **Margin-bottom**: 20px

#### Data Table

- **Container**: white background, border-radius: 12px, shadow: default
- **Header Row**:
  - Background: #F9FAFB
  - Font: bold, 14px, secondary color
  - Padding: 14px
  - Sticky on scroll (optional)
- **Data Rows**:
  - Padding: 14px
  - Border-bottom: 1px solid #E5E7EB (except last)
  - Hover: background #F9FAFB, slight shadow

- **Columns**:
  - Roll No (120px)
  - Name (180px)
  - Email (200px)
  - Department (150px)
  - Year (100px)
  - Eligibility (120px) - green badge if eligible
  - Delete (80px) - red icon button

- **Eligibility Badge**:
  - Background: #D1FAE5 (light green)
  - Text: #047857 (dark green)
  - Padding: 6px 10px
  - Border-radius: 16px
  - Font: 12px, bold

- **Delete Button**:
  - Icon: trash/delete
  - Color: #EF4444 (red)
  - Hover: background: #FEE2E2, slightly larger
  - Cursor: pointer
  - Transition: 200ms

---

### 5. QUIZ LINK MANAGER

#### Layout Structure

```
┌─────────────────────────────────────┐
│   Navbar (sticky)                   │
├─────────────────────────────────────┤
│                                     │
│  Quiz Link Manager                  │
│                                     │
│         ┌──────────────────┐       │
│         │  Form Card       │       │
│         │  Multiple Fields │       │
│         │  Settings        │       │
│         │  [CTA Button]    │       │
│         │                  │       │
│         └──────────────────┘       │
│                                     │
│  ┌──────────────────────────────┐  │
│  │ Created Quiz Links           │  │ ← If applicable
│  │ (List of active quizzes)     │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

#### Form Card

- **Max-width**: 600px
- **Center**: horizontally
- **Background**: white
- **Border-radius**: 14px
- **Padding**: 32px
- **Shadow**: default
- **Margin-top**: 24px
- **Margin-bottom**: 24px

#### Form Fields

1. **Quiz Title Input**:
   - Label: "Quiz Title" (14px, bold)
   - Input: standard style
   - Placeholder: "Enter quiz name"
   - Margin-bottom: 20px

2. **Description Textarea**:
   - Label: "Description" (14px, bold)
   - Textarea: 100px height
   - Placeholder: "Add a brief description"
   - Margin-bottom: 20px

3. **Expiry Date Picker**:
   - Label: "Expiry Date" (14px, bold)
   - Input type: date
   - Icon: calendar
   - Margin-bottom: 20px

4. **Time Limit Input**:
   - Label: "Time Limit (minutes)" (14px, bold)
   - Input type: number
   - Placeholder: "e.g., 60"
   - Min: 1
   - Margin-bottom: 20px

5. **Question Selector**:
   - Label: "Select Questions" (14px, bold)
   - Container: border-radius: 8px, max-height: 200px, overflow-y: scroll
   - Style: list with checkboxes
   - Each item: checkbox + question text + difficulty badge
   - Padding: 12px per item
   - Hover: light background
   - Margin-bottom: 20px

6. **Quiz Settings (Checkboxes)**:
   - Label: "Quiz Settings" (14px, bold)
   - Options:
     - ☐ Show answers after submission
     - ☐ Randomize questions
     - ☐ Randomize options
     - ☐ Allow review before submit
   - Each checkbox: 12px gap between checkbox & label
   - Gap between options: 12px
   - Margin-bottom: 24px

#### CTA Button

- **Label**: "Create Quiz Link"
- **Width**: 100%
- **Gradient**: Purple-to-Blue
- **Padding**: 14px
- **Font**: 16px, bold, white
- **Border-radius**: 8px
- **Hover**: shadow + scale
- **Loading**: spinner + disabled

#### Quiz Links List (Below form)

- **Title**: "Active Quiz Links" (16px, bold)
- **Cards** (if quizzes exist):
  - Background: white
  - Border-radius: 12px
  - Padding: 16px
  - Shadow: default
  - Layout: horizontal
  - Columns: Quiz Name | Expiry Date | Link | Actions
  - Actions: Copy link, Edit, Delete
  - Hover: subtle background change

---

## Component Breakdown

### Reusable Components

```
1. NAVBAR
   - Logo
   - Nav links
   - User dropdown
   - Responsive burger menu (mobile)

2. METRIC CARD
   - Icon
   - Number
   - Label
   - Optional stat line
   - Optional trend indicator

3. ACTION BUTTON
   - Gradient background
   - Icon + text
   - Responsive sizing

4. FORM CARD
   - Title
   - Form fields (input, textarea, select, etc.)
   - Validation messages
   - CTA button

5. BADGE
   - Color variants (success, warning, error, info)
   - Icon optional
   - Pill-shaped

6. INPUT FIELD
   - Icon prefix/suffix
   - Placeholder
   - Error state
   - Focus state
   - Disabled state

7. DATA TABLE
   - Header row
   - Data rows
   - Actions column
   - Hover effects
   - Pagination (if needed)

8. MODAL/DIALOG
   - Overlay
   - Card with close button
   - Content area
   - Footer with actions

9. TOAST/NOTIFICATION
   - Top right position
   - Icon + message
   - Auto dismiss
   - Color variants

10. SPINNER/LOADER
    - Animated rotation
    - Gradient colors
    - Sizes: sm, md, lg
```

---

## Responsive Design Strategy

### Breakpoints

```
Mobile: 0px - 640px
  - Single column layouts
  - Full-width cards
  - Burger menu (navbar)
  - Smaller fonts (12px body)
  - Reduced padding (16px sections)

Tablet: 641px - 1024px
  - 2-column grids
  - Adjusted card sizes
  - Hamburger menu
  - Standard fonts
  - Standard padding

Desktop: 1025px+
  - 3-4 column grids
  - Max-width containers (1280px)
  - Full horizontal nav
  - Large fonts
  - Generous padding
```

### Responsive Grid Examples

#### Dashboard Cards

- Desktop: `grid-template-columns: repeat(4, 1fr)`
- Tablet: `grid-template-columns: repeat(2, 1fr)`
- Mobile: `grid-template-columns: 1fr`

#### Quick Actions Buttons

- Desktop: `flex-wrap: wrap; gap: 16px`
- Tablet: `flex-wrap: wrap; gap: 12px`
- Mobile: `flex-direction: column; width: 100%`

#### Data Table

- Desktop: Full table with all columns visible
- Tablet: Hide secondary columns (Department, Year), keep essentials
- Mobile: Card view instead of table (single row per card)

---

## Interaction & Animations

### Transitions

```
Default: 200ms ease-in-out
Hover effects: 150ms ease-out
Page transitions: 300ms fade

HOVER STATES:
- Buttons: shadow increase + scale(1.02) + opacity change
- Cards: shadow increase + translateY(-2px)
- Links: color change + underline
- Inputs: border color change + glow effect

FOCUS STATES:
- All interactive elements: outline-offset 2px, color: primary
- Accessibility: high contrast outline

ACTIVE STATES:
- Buttons: opacity 0.9 + shadow decrease
- Tabs: gradient background + underline
```

### Loading States

- Spinner animation (rotating gradient)
- Button disabled with spinner inside
- Skeleton screens for data tables (optional)
- Toast notifications for actions (success/error)

---

## Design Tokens CSS Variables

```css
:root {
  /* Colors */
  --color-primary: #7c3aed;
  --color-secondary: #3b82f6;
  --color-accent: #ec4899;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* backgrounds */
  --bg-primary: #fafaf9;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f3f4f6;

  /* Text */
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 20px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 12px 30px rgba(0, 0, 0, 0.15);

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
  --space-2xl: 32px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Typography */
  --font-family: "Inter", "Poppins", "Roboto", sans-serif;
  --font-size-body: 14px;
  --font-size-sm: 12px;
  --font-size-heading: 24px;

  /* Z-index */
  --z-navbar: 1000;
  --z-modal: 1100;
  --z-toast: 1200;
}
```

---

## Accessibility Considerations

1. **Color Contrast**: Ensure 4.5:1 ratio for text
2. **Focus Indicators**: Visible outline on all interactive elements
3. **ARIA Labels**: Use for icons, buttons without visible text
4. **Semantic HTML**: Use <button>, <nav>, <header>, <main> appropriately
5. **Keyboard Navigation**: Tab through all elements in logical order
6. **Screen Readers**: Alt text for images, meaningful button labels
7. **Motion**: Respect prefers-reduced-motion media query

---

## Performance Considerations

1. **Images**: Optimize and use WebP format
2. **CSS**: Minimize inline styles, use CSS modules or Tailwind
3. **Animations**: Use transform and opacity (GPU accelerated)
4. **Lazy Loading**: For data tables and images
5. **Responsive Images**: srcset for different screen sizes

---

## Summary

This design system creates a **modern, professional edu-tech dashboard** with:

- ✅ Clean, consistent visual language
- ✅ Accessible and responsive layouts
- ✅ Smooth interactions and animations
- ✅ Admin-friendly, non-cluttered interface
- ✅ Production-ready SaaS aesthetic
- ✅ Easy component reusability
- ✅ Strong visual hierarchy
