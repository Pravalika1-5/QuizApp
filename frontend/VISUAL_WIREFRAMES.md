# Visual Design Wireframes & Layout Reference

## COMPLETE PAGE WIREFRAMES

---

## 1. LOGIN PAGE WIREFRAME

### Desktop (400px width, centered)

```
┌─────────────────────────────────────────────────┐
│                                                 │
│               BACKGROUND GRADIENT              │
│             (Purple → Blue)                    │
│                                                 │
│    ┌───────────────────────────────────────┐   │
│    │                                       │   │
│    │   📚 QuizApp                          │   │
│    │   Welcome Back                        │   │
│    │                                       │   │
│    │  ┌─────────┐   ┌─────────┐           │   │
│    │  │ Admin   │   │ Student │           │   │
│    │  └─────────┘   └─────────┘           │   │
│    │                                       │   │
│    │  📧 Email                             │   │
│    │  ┌─────────────────────────────────┐ │   │
│    │  │ your@email.com                  │ │   │
│    │  └─────────────────────────────────┘ │   │
│    │                                       │   │
│    │  🔒 Password                          │   │
│    │  ┌─────────────────────────────────┐ │   │
│    │  │ ••••••••                        │ │   │
│    │  └─────────────────────────────────┘ │   │
│    │                                       │   │
│    │  ┌─────────────────────────────────┐ │   │
│    │  │     Sign In (GRADIENT BG)      │ │   │
│    │  └─────────────────────────────────┘ │   │
│    │                                       │   │
│    │  Forgot password? • Create account   │   │
│    │                                       │   │
│    └───────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Mobile (100% width)

```
┌─────────────────┐
│   GRADIENT BG   │
│                 │
│  ┌───────────┐  │
│  │ 📚 Quiz   │  │
│  │ Welcome   │  │
│  │           │  │
│  │ [Admin]   │  │
│  │ [Student] │  │
│  │           │  │
│  │ 📧 Email  │  │
│  │ [input]   │  │
│  │           │  │
│  │ 🔒 Pass   │  │
│  │ [input]   │  │
│  │           │  │
│  │ [Sign In] │  │
│  │           │  │
│  │ Forgot?   │  │
│  │ Account   │  │
│  └───────────┘  │
│                 │
└─────────────────┘
```

---

## 2. ADMIN DASHBOARD WIREFRAME

### Full Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│ [Logo] Nav Links           [👤 Admin User ▼]                          │ ← Navbar (64px fixed)
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│ Admin Dashboard                                              Feb 13 ▼  │
│ Welcome back! Here's your quiz management overview.                  │
│                                                                        │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────────┐  │
│ │ 📝 286      │ │ 👥 1,240    │ │ 📊 942      │ │ ⭐ 78.5%   │  │
│ │ Questions   │ │ Users       │ │ Attempts    │ │ Avg Score  │  │
│ │ ↑ 12%       │ │ ↑ 8%        │ │ ↓ 3%        │ │ ↑ 5%       │  │
│ └──────────────┘ └──────────────┘ └──────────────┘ └─────────────┘  │
│                                                                        │
│ ┌─────────────────────────────────────────────────────────────────┐  │
│ │ [Add Q] [AI Gen] [Reports] [Users] [Templates]                │  │
│ └─────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│ ┌─────────────────────────────────────────────────────────────────┐  │
│ │ Quiz Attempts This Week                              [7 days ▼]│  │
│ │                                                                 │  │
│ │     ┌─┐                                                         │  │
│ │     │ │                                                         │  │
│ │ ┌───┘ └───┐                                                     │  │
│ │ │         │ ┌─┐                                                 │  │
│ │ │         │ │ │                                                 │  │
│ │ └─────────┴─┘ └───┐                                             │  │
│ │ M  T  W  T  F  S  S                                             │  │
│ └─────────────────────────────────────────────────────────────────┘  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Metric Card Details

```
┌──────────────────────┐
│[GRADIENT BG - Purple │
│ to Blue]             │
│                      │
│ 📝 (32px icon)       │
│                      │
│ 286 (32px bold num)  │
│                      │
│ Total Questions      │
│ (14px label)         │
│                      │
│ ↑ 12% from month     │
│ (12px, green)        │
│                      │
└──────────────────────┘
Dimensions: 260px × 200px
Padding: 24px
Border Radius: 12px
Shadow: md
```

---

## 3. AI QUESTION GENERATOR WIREFRAME

### Full Layout

```
┌────────────────────────────────────────────────────────────────┐
│ Navbar (sticky)                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ [GRADIENT BG: Purple → Blue]                              │ │
│ │                                                            │ │
│ │         ┌──────────────┐                                  │ │
│ │         │ [Cpu Icon]   │                                  │ │
│ │         │  64px        │                                  │ │
│ │         └──────────────┘                                  │ │
│ │                                                            │ │
│ │   AI Question Generator                                   │ │
│ │   Create quality questions instantly powered by AI        │ │
│ │                                                            │ │
│ │  ⚡ Fast  🧠 Topic  ✨ Multiple  💻 Preview & Edit       │ │
│ │                                                            │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│              ┌──────────────────────────────┐                 │
│              │  Form Card                   │                 │
│              │                              │                 │
│              │  Topic/Concept               │                 │
│              │ ┌────────────────────────┐  │                 │
│              │ │ [Textarea - 4 rows]    │  │                 │
│              │ │                        │  │                 │
│              │ └────────────────────────┘  │                 │
│              │                              │                 │
│              │  Difficulty  │  Quantity    │                 │
│              │ [Dropdown]   │  [Dropdown]  │                 │
│              │                              │                 │
│              │ ┌────────────────────────┐  │                 │
│              │ │  [Generate Button]     │  │                 │
│              │ └────────────────────────┘  │                 │
│              │                              │                 │
│              └──────────────────────────────┘                 │
│                                                                │
│              Questions Preview (if any)                        │
│              ┌──────────────────────────────┐                 │
│              │ Q1 Generated Question        │                 │
│              │ ☐ Option A                   │                 │
│              │ ☐ Option B                   │                 │
│              │ ☐ Option C                   │                 │
│              │ ☐ Option D                   │                 │
│              └──────────────────────────────┘                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Feature Chips

```
┌────────────────────────┐
│ ⚡ Fast Generation    │
│ (Badge style, light bg)│
└────────────────────────┘

Dimensions: Auto width
Padding: 8px 12px
Border-Radius: 20px
Icon: 16px
Text: 12px (medium weight)
```

---

## 4. STUDENT MANAGEMENT WIREFRAME

### Full Layout

```
┌────────────────────────────────────────────────────────────────┐
│ Navbar (sticky)                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Student Management                                             │
│ Manage your student list and eligibility                       │
│                                                                │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌──────────┐ │
│ │ 👥 1,240   │ │ ✓ 892      │ │ ⚠ 348      │ │ ✓✓ 756  │ │
│ │ Students   │ │ Eligible   │ │ Ineligible │ │ Completed│ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └──────────┘ │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Upload Student List                                      │  │
│ │                                                          │  │
│ │         📤 Upload Arrow                                 │  │
│ │   Drop your CSV or Excel file here                      │  │
│ │   Download template to see required format             │  │
│ │                                                          │  │
│ │  [Download Template] [Browse File] [Upload File]        │  │
│ │                                                          │  │
│ │  ✓ students.csv selected                                │  │
│ │                                                          │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ 🔍 Search by name, email, or roll number               │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Roll No │ Name      │ Email      │ Dept   │ Yr │ Status  │  │
│ ├──────────────────────────────────────────────────────────┤  │
│ │ 001     │ John Doe  │ j@ex.com   │ CS     │ 3  │ ✓ Elg. │  │
│ │ 002     │ Jane Smith│ j@ex.com   │ ENT    │ 2  │ ✕ Inel.│  │
│ │ 003     │ Bob Jones │ b@ex.com   │ CS     │ 4  │ ✓ Elg. │  │
│ │ ... (more rows)                                          │  │
│ │                           [Delete Options on Hover]      │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Upload Section Detailed

```
┌────────────────────────────────────────┐
│ Background: #F3E8FF (light purple)     │
│ Border: 2px dashed #D8B4FE             │
│ Border-Radius: 12px                    │
│ Padding: 32px                          │
│                                        │
│        📤 (32px icon, purple)          │
│                                        │
│ Upload Student List                    │
│ (16px, bold)                           │
│                                        │
│ CSV or Excel format                    │
│ (12px, secondary)                      │
│                                        │
│ ┌──────────────┐  ┌──────────┐        │
│ │Download Tmp. │  │Browse... │        │
│ └──────────────┘  └──────────┘        │
│        (secondary)   (primary)        │
│                                        │
│ Gap: 12px between buttons              │
│                                        │
└────────────────────────────────────────┘
```

### Data Table Column Widths

```
Roll No:    120px
Name:       180px
Email:      200px
Department: 150px
Year:       100px
Eligibility:120px (with badge)
Actions:    80px (delete button)

Row Height:  56px
Header BG:   #F9FAFB
Border:      1px solid #E5E7EB
Hover BG:    #F9FAFB
```

---

## 5. QUIZ LINK MANAGER WIREFRAME

### Full Layout

```
┌────────────────────────────────────────────────────────────────┐
│ Navbar (sticky)                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Quiz Link Manager                                              │
│ Create and manage quiz links                                   │
│                                                                │
│              ┌──────────────────────────────┐                 │
│              │ Form Card                    │                 │
│              │                              │                 │
│              │ Quiz Title                   │                 │
│              │ [input - 100%] (24px)        │                 │
│              │                              │                 │
│              │ Description                  │                 │
│              │ [textarea - 100px]           │                 │
│              │                              │                 │
│              │ Expiry Date     │ Time Limit│                 │
│              │ [date picker]   │ [number]  │                 │
│              │                              │                 │
│              │ Select Questions             │                 │
│              │ ┌────────────────────────┐  │                 │
│              │ │ ☐ Question 1 [Easy]    │  │                 │
│              │ │ ☐ Question 2 [Medium]  │  │                 │
│              │ │ ☐ Question 3 [Hard]    │  │                 │
│              │ │ ... scrollable          │  │                 │
│              │ └────────────────────────┘  │                 │
│              │                              │                 │
│              │ Quiz Settings                │                 │
│              │ ☐ Show answers after       │                 │
│              │ ☐ Randomize questions      │                 │
│              │ ☐ Randomize options        │                 │
│              │ ☐ Allow review before      │                 │
│              │                              │                 │
│              │ ┌────────────────────────┐  │                 │
│              │ │ [Create Quiz Link]     │  │                 │
│              │ └────────────────────────┘  │                 │
│              │                              │                 │
│              └──────────────────────────────┘                 │
│                                                                │
│ Active Quiz Links                                              │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Quiz Name      │ Expiry     │ Link Copy      │ Edit Del │  │
│ ├──────────────────────────────────────────────────────────┤  │
│ │ React Basics   │ 25 Feb     │ [copy] 📋      │ ✎  🗑    │  │
│ │ JS Advanced    │ 28 Feb     │ [copy] 📋      │ ✎  🗑    │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## COLOR GRADIENT REFERENCE

### Gradient 1 (Purple → Blue)

```
Start: #7C3AED (Purple)
End:   #3B82F6 (Blue)
Angle: 135deg

CSS: linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)
```

### Gradient 2 (Pink → Purple)

```
Start: #EC4899 (Pink)
End:   #A855F7 (Purple)
Angle: 135deg

CSS: linear-gradient(135deg, #EC4899 0%, #A855F7 100%)
```

### Gradient 3 (Teal → Green)

```
Start: #14B8A6 (Teal)
End:   #10B981 (Green)
Angle: 135deg

CSS: linear-gradient(135deg, #14B8A6 0%, #10B981 100%)
```

### Gradient 4 (Cyan → Blue)

```
Start: #06B6D4 (Cyan)
End:   #0EA5E9 (Blue)
Angle: 135deg

CSS: linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)
```

---

## SPACING REFERENCE DIAGRAM

### Standard Padding (cards, sections)

```
┌──────────────────────────────┐
│ ← 24px padding →             │
│ ┌──────────────────────────┐ │
│ │ Card Content             │ │
│ │ with 24px safe zone      │ │
│ └──────────────────────────┘ │
│ ← 24px padding →             │
└──────────────────────────────┘

Smaller card (20px padding):
┌──────────────────────┐
│ ← 20px →             │
│ Content              │
│ ← 20px →             │
└──────────────────────┘
```

### Element Spacing (within card)

```
┌─────────────────────────┐
│ Title                   │ ← 24px
│ ← 24px gap             │
│ [Input Field]           │ ← 16px gap
│ [Input Field]           │ ← 16px gap
│ [Input Field]           │ ← 24px gap
│ [Button]                │
└─────────────────────────┘
```

### Grid Gap Reference

```
Desktop:  gap: 24px (large)
Tablet:   gap: 20px (medium)
Mobile:   gap: 16px (small)

4-Column:  gap: 20-24px
2-Column:  gap: 20-24px
1-Column:  gap: 16px
```

---

## SHADOW ELEVATION SCALE

### Shadow Levels

```
Level 1 (sm):      0 1px 3px rgba(0,0,0,0.08)
  → Used for: hover states, borders replacement

Level 2 (md):      0 4px 12px rgba(0,0,0,0.1)
  → Used for: default cards, buttons

Level 3 (lg):      0 8px 20px rgba(0,0,0,0.12)
  → Used for: elevated hover states, modals

Level 4 (xl):      0 12px 30px rgba(0,0,0,0.15)
  → Used for: dropdowns, overlays

Level 5 (2xl):     0 20px 40px rgba(0,0,0,0.15)
  → Used for: top-level modals, menus
```

---

## BORDER RADIUS REFERENCE

### Size Scale

```
2px  (xs):   Tight circles, subtle
4px  (sm):   Minimal rounding
8px  (md):   Button standard, inputs
12px (lg):   Cards standard
16px (xl):   Large cards, hero sections
20px (2xl):  Badges, pill-shaped buttons
9999px (full): Perfect circles, rounded pills
```

### Component Application

```
Buttons:              8px
Input Fields:         8px
Cards:               12px
Large Cards:         16px
Dropdowns:           12px
Modal Dialogs:       14px
Badges/Pills:        20px
Avatar Circles:   9999px (full)
```

---

## RESPONSIVE GRID TRANSFORMATION

### How Grids Change

```
DESKTOP (1025px+)
┌──────────┬──────────┬──────────┬──────────┐
│   Card   │  Card    │  Card    │   Card   │
│  (4 col) │ (4 col)  │ (4 col)  │ (4 col)  │
└──────────┴──────────┴──────────┴──────────┘

TABLET (641px - 1024px)
┌─────────────────┬─────────────────┐
│      Card       │      Card       │
│    (2 col)      │    (2 col)      │
├─────────────────┬─────────────────┤
│      Card       │      Card       │
│    (2 col)      │    (2 col)      │
└─────────────────┴─────────────────┘

MOBILE (0px - 640px)
┌──────────────────────┐
│       Card           │
│     (1 col)          │
├──────────────────────┤
│       Card           │
│     (1 col)          │
├──────────────────────┤
│       Card           │
│     (1 col)          │
└──────────────────────┘
```

---

## FOCUS & HOVER STATE REFERENCE

### Button Hover Effect

```
Normal:
┌──────────┐
│  Button  │  Shadow: md
└──────────┘  Scale: 1.0

Hover:
        ╱╱ (slight upward lift)
   ╱╱  ┌──────────┐
  ╱╱   │  Button  │  Shadow: lg
       └──────────┘  Scale: 1.02
```

### Input Focus Effect

```
Normal State:
┌──────────────────────┐
│ [input field]        │
│ Border: 1px #E5E7EB  │
└──────────────────────┘

Focus State:
┌──────────────────────┐
│ [input field]        │ ← Border: 2px #7C3AED
│ 🔵 Glow: 3px shadow  │
└──────────────────────┘
   (Box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1))
```

---

## ICON SIZING REFERENCE

### Standardized Icon Sizes

```
Navigation:           20-24px
Buttons:             16-20px
Input Prefix/Suffix: 16-18px
Metric Card Icon:    32px
Hero Section Icon:   64px
Large Buttons:       24px
```

---

## Typography Hierarchy

### Page Structure

```
Page Title (H1):          32px, bold, #1F2937
  ↓
Section Header (H2):      24px, bold, #1F2937
  ↓
Subsection (H3):          20px, semibold, #1F2937
  ↓
Card Title (H4):          16px, semibold, #1F2937
  ↓
Body Text:                14px, regular, #1F2937
  ↓
Helper Text:              12px, regular, #6B7280
  ↓
Caption:                  11px, medium, #9CA3AF
```

---

## Animation Timing Reference

### Page Transitions

```
Fade In:          300ms ease-in-out
Slide Up:         300ms ease-out
Scale In:         300ms ease-out
Slide In (toast): 300ms ease-out
```

### Interactive Elements

```
Button Hover:     150ms ease-out
Input Focus:      150ms ease-out
Card Hover:       200ms ease-in-out
Dropdown:         200ms ease-in-out
```

---

## Mobile Touch Targets

### Minimum Sizes

```
Buttons:          44px × 44px
Input Fields:     44px height
Clickable Links:  44px × 44px
Tap Targets:      Min 44px (Apple), 48px (Google)
```

### Spacing for Touch

```
Between elements: Min 8px
Button gap:       Min 12px
Reachable area:   Bottom 75% of screen (thumb zone)
```

---
