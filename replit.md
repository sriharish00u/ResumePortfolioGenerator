# Resume & Portfolio Builder Platform

## Overview
A comprehensive web application that helps users create professional resumes and portfolio websites without requiring login or AI. Users answer guided questions, upload profile and project images, choose from 5 beautiful templates, preview in real-time, and export as PDF (resume) or HTML (portfolio).

## Project Status
- **Current Date**: November 25, 2025
- **Current Phase**: MVP Development (Task 1: Frontend Complete)
- **Next Phase**: Minimal backend setup and integration

## Tech Stack

### Frontend
- **Framework**: React with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS + Shadcn UI components
- **Forms**: React Hook Form + Zod validation
- **State**: React Context API
- **Storage**: LocalStorage (client-side only, no database)
- **Image Processing**: Browser-based File API with canvas resizing
- **Export**: jsPDF (PDF generation), JSZip (HTML export)

### Backend
- **Server**: Express.js (minimal - serves static assets only)
- **Database**: None (all data stored client-side in localStorage)

## Key Features

### 1. Guided Question Flow (4 Steps)
- **Step 1: Basic Info** - Name, role, contact, profile photo upload, professional links, summary
- **Step 2: Skills & Education** - Skill tags, multiple education entries with details
- **Step 3: Projects & Experience** - Projects with multi-image upload (up to 5 per project), optional work experience
- **Step 4: Final Touches** - Achievements, certifications, hobbies, portfolio hero text

### 2. Image Upload System
- **Profile Image**: Single upload with preview, auto-resize to 400px, circular display
- **Project Images**: Multiple upload (up to 5 per project), auto-resize to 800px, grid display
- **Storage**: Base64 encoding in localStorage
- **Validation**: 5MB max per image, image/* file types only

### 3. Template Selection
- **5 Resume Templates**:
  - Classic Professional (ATS-friendly)
  - Modern Minimal
  - Creative Student
  - Experience Oriented
  - Student Portfolio Style
- **1 Portfolio Template**: Full-featured website with hero, projects gallery, contact
- **Preview**: Thumbnail cards with feature badges

### 4. Live Preview & Export
- **Desktop/Mobile Preview**: Responsive preview with tab switching
- **Section Controls**: Show/hide individual sections
- **PDF Export**: Resume templates with embedded images
- **HTML Export**: Portfolio as downloadable zip with all assets

### 5. Auto-Save System
- Saves to localStorage after every field change
- Persists across browser sessions
- No server storage - completely private

## File Structure

```
client/
├── src/
│   ├── components/
│   │   ├── builder-steps/           # Multi-step form components
│   │   │   ├── BasicInfo.tsx
│   │   │   ├── SkillsEducation.tsx
│   │   │   ├── ProjectsExperience.tsx
│   │   │   └── AchievementsHobbies.tsx
│   │   ├── preview/                 # Preview components
│   │   │   ├── ResumePreview.tsx
│   │   │   └── PortfolioPreview.tsx
│   │   ├── ui/                      # Shadcn UI components
│   │   ├── ImageUpload.tsx          # Single image upload
│   │   ├── MultiImageUpload.tsx     # Multiple image upload
│   │   └── ProgressStepper.tsx      # Step indicator
│   ├── contexts/
│   │   └── BuilderContext.tsx       # Global state management
│   ├── lib/
│   │   ├── storage.ts               # localStorage utilities
│   │   ├── templates.ts             # Template definitions
│   │   └── utils.ts                 # Helper functions
│   ├── pages/
│   │   ├── Landing.tsx              # Hero + features
│   │   ├── Builder.tsx              # Question flow
│   │   ├── Templates.tsx            # Template selection
│   │   └── Preview.tsx              # Preview & export
│   └── App.tsx                      # Main router
shared/
└── schema.ts                        # TypeScript types & Zod schemas
server/
└── routes.ts                        # Minimal API routes
```

## Data Models

### UserData
- Basic info: name, role, email, phone, profile image
- Links: GitHub, LinkedIn, portfolio
- Summary: professional description
- Skills: array of skill strings
- Education: array of education entries
- Projects: array with title, tools, description, images[]
- Experience: optional array of work history
- Achievements: optional array
- Hobbies: optional array
- Portfolio hero: optional intro text

### Template
- ID, name, description, type (resume/portfolio)
- Thumbnail, category, features array

### SectionVisibility
- Boolean flags for each section (summary, skills, education, etc.)

## User Journey

1. **Landing Page** → Click "Start Building"
2. **Step 1-4: Questions** → Fill in details, upload images
3. **Template Selection** → Choose from 6 templates
4. **Preview** → Review, toggle sections, switch desktop/mobile view
5. **Export** → Download PDF or HTML zip file

## Design System

### Colors
- Primary: Blue (#4B91F7) - CTAs, links, accents
- Background: White/Light gray gradients
- Text: Dark gray hierarchy (900, 600, 400)

### Typography
- Font: Inter
- Headings: Bold, large scale (3xl-5xl)
- Body: Regular, comfortable line-height

### Components
- Cards: Rounded corners, subtle shadows
- Buttons: Primary (blue), Outline (white with border)
- Badges: Secondary variant for skills/tags
- Forms: Clean inputs with validation messages

### Spacing
- Tight: 2-4 units (form elements)
- Standard: 6-8 units (sections)
- Generous: 12-16 units (page margins)

## Recent Changes (Task 1)

### November 25, 2025
- Created complete data schema with image support
- Built all 4 question flow steps with validation
- Implemented profile and multi-image upload components
- Created landing page with hero and features
- Built template selection page with 6 templates
- Implemented preview page with PDF/HTML export
- Added localStorage auto-save system
- Integrated React Context for global state
- Set up complete routing with wouter

## Next Steps (Task 2)

1. Backend setup (minimal Express routes)
2. Integration testing
3. Final polish and bug fixes

## User Preferences
- Target users: Students, job seekers, professionals
- Design priority: Clean, professional, easy to use
- No login/signup - focus on privacy and simplicity
- No AI - template-driven with user input only
