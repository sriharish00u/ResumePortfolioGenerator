# Design Guidelines: Resume & Portfolio Builder Platform

## Design Approach

**Selected Approach:** Design System-Based (Material Design 3)

**Justification:** This is a utility-focused, form-intensive productivity tool where clarity, efficiency, and user confidence are paramount. Material Design 3's comprehensive form components, clear hierarchy, and proven patterns for multi-step flows make it ideal for this application.

**Key Design Principles:**
1. Progressive disclosure - guide users step-by-step without overwhelming
2. Immediate feedback - show changes in real-time preview
3. Confidence building - clear progress indicators and validation
4. Professional polish - templates should look production-ready

---

## Typography

**Font Family:**
- Primary: Inter (via Google Fonts CDN)
- Monospace: 'Courier New' (for resume template previews)

**Type Scale:**
- Headings: 2xl (main screens), xl (section headers), lg (subsections)
- Body: base (form labels, descriptions), sm (helper text)
- Weights: 400 (regular), 500 (medium for labels), 600 (semibold for headings), 700 (bold for CTAs)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16**
- Tight spacing: 2-4 (form field groups, inline elements)
- Standard spacing: 6-8 (between sections, cards)
- Generous spacing: 12-16 (major section breaks, page margins)

**Container Structure:**
- Main container: max-w-7xl with px-4 md:px-6 lg:px-8
- Form containers: max-w-2xl for optimal readability
- Preview panel: Flexible width to show actual template proportions

---

## Component Library

### A. Navigation & Progress
**Header Bar:**
- Fixed top position with subtle shadow
- Logo/title left, progress indicator center, save/export actions right
- Height: h-16

**Progress Stepper:**
- Horizontal step indicator showing: Questions → Template Selection → Edit & Preview → Export
- Active step highlighted, completed steps with checkmark icons
- Clickable for navigation between completed steps

### B. Form Components

**Question Cards:**
- Each question in its own card with rounded-lg borders
- Card padding: p-6
- Stacked layout with clear label → input → helper text hierarchy
- Required fields marked with asterisk

**Input Fields:**
- Full-width text inputs with h-12
- Text areas with min-h-32 for longer responses
- Clear focus states with ring offset
- Inline validation with success/error states

**File Upload Areas:**
- Profile image: Square upload zone (w-32 h-32) with rounded-full preview
- Project images: Grid of upload slots (up to 5 per project)
- Drag-and-drop zones with dashed borders
- Image previews with remove button overlay
- Accepted formats displayed: "JPG, PNG up to 5MB"

### C. Template Selection

**Template Gallery:**
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Template cards with aspect-ratio-[3/4] thumbnail previews
- Template name and description below thumbnail
- Selected template: highlighted border and checkmark badge
- Hover state: subtle scale and shadow transition

### D. Preview System

**Split View Layout:**
- Left panel (40%): Editable sections with toggle controls
- Right panel (60%): Live preview iframe
- Responsive: Stack vertically on mobile (preview on top)

**Section Controls:**
- Each section header with eye icon (visibility toggle) and drag handle
- Inline editing: Click to edit text directly in preview
- Section spacing: space-y-4 between editable sections

### E. Export Interface

**Export Options Card:**
- Two primary action buttons side-by-side
- "Download PDF" with document icon
- "Export HTML Portfolio" with code icon  
- Buttons: h-14, rounded-lg, with icon + text
- Secondary options: Template selection, re-edit buttons below

---

## Page-Specific Layouts

### Landing Page
**Hero Section:** (h-screen)
- Split layout: 50/50 text and illustration
- Large headline (text-5xl font-bold)
- Subheading explaining "No login, No AI, 5 templates"
- Primary CTA: "Start Building" button (large, prominent)
- Hero image: Illustration showing resume templates fanning out

**Features Section:**
- 3-column grid showcasing: Quick Questions, Professional Templates, Instant Export
- Icon-title-description cards with p-8
- Icons from Heroicons (CDN)

### Question Flow Pages
**Single-column centered form:** max-w-2xl
- Progress bar at top
- One question card at a time (for simple questions)
- Multiple project cards stacked (for project entries)
- "Add Another Project" button with plus icon
- Navigation: "Back" and "Next" buttons footer-fixed

### Template Selection Page
**Full-width gallery:** max-w-7xl
- Large preview thumbnails
- Filter tabs: "All", "Resume", "Portfolio"
- Template cards: hover zoom effect on thumbnail

### Edit & Preview Page
**Dashboard layout:**
- Toolbar across top: Save, Preview modes (Desktop/Tablet/Mobile), Export
- Split panel with resizable divider
- Section list sidebar (left): accordion-style for each resume section
- Live preview (right): Shows actual resume/portfolio rendering

---

## Images

**Hero Section Image:**
- Placement: Right half of hero split-layout
- Description: Modern illustration showing multiple resume templates in a cascading arrangement, with a portfolio website preview on a laptop screen. Clean, professional aesthetic with subtle gradients.

**Feature Section Icons:**
- Use Heroicons for: question mark (Questions), document (Templates), arrow-down-tray (Export)
- Size: w-12 h-12 within circular background containers

**Template Thumbnails:**
- Actual miniature screenshots of each template
- Aspect ratio: 3:4 (standard resume proportions)
- Border: subtle gray stroke

**Upload Placeholders:**
- Profile: User silhouette icon in dashed circle
- Projects: Image icon in dashed rectangle grid

---

## Animations

**Minimal, purposeful only:**
- Form field focus: Subtle ring expansion
- Template selection: Scale(1.02) on hover
- Section reorder: Smooth position transition during drag
- Save confirmation: Brief success checkmark animation

**NO scroll-triggered or decorative animations** - keep focus on workflow efficiency.

---

## Key Implementation Notes

- Use Heroicons (CDN) for all interface icons
- Material Design elevation system: shadow-sm (cards), shadow-md (floating panels), shadow-lg (modals)
- Consistent rounded corners: rounded-lg for cards, rounded-md for inputs
- Form validation uses inline messages, not modals
- Auto-save indicator: Small "Saved" text with checkmark, fades after 2s
- Mobile: hamburger menu for section navigation, preview becomes full-screen modal