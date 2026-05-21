import type { Template } from "@shared/schema";

export const templates: Template[] = [
  // ── RESUME TEMPLATES (10) ──
  {
    id: "resume-classic",
    name: "Classic Timeless",
    description: "Traditional ATS-friendly layout with gold accents — ideal for law, finance & consulting",
    type: "resume",
    thumbnail: "",
    category: "Professional",
    profession: "law",
    features: ["ATS-Optimized", "Gold Accents", "Serif Typography", "Harvard Law Style"],
  },
  {
    id: "resume-modern",
    name: "Clean Sidebar Pro",
    description: "Navy sidebar layout with clean typography — great for corporate & admin roles",
    type: "resume",
    thumbnail: "",
    category: "Modern",
    profession: "business",
    features: ["Sidebar Layout", "Navy Accent", "ATS-Friendly", "Modern Sans"],
  },
  {
    id: "resume-creative",
    name: "Bold Creative Splash",
    description: "Purple gradient header with vibrant two-column layout for students & creatives",
    type: "resume",
    thumbnail: "",
    category: "Creative",
    profession: "creative",
    features: ["Gradient Header", "Two-Column", "Student-Friendly", "Colorful"],
  },
  {
    id: "resume-experience",
    name: "Executive Timeline",
    description: "Charcoal left-border timeline with warm cards — made for experienced professionals",
    type: "resume",
    thumbnail: "",
    category: "Professional",
    profession: "executive",
    features: ["Timeline Layout", "Warm Palette", "Experience-First", "C-Suite Ready"],
  },
  {
    id: "resume-singlecolumn",
    name: "Minimalist Swiss",
    description: "Swiss-grid single-column layout with single red accent dot — print perfection",
    type: "resume",
    thumbnail: "",
    category: "Modern",
    profession: "design",
    features: ["Swiss Grid", "Single Column", "Minimalist", "Print Ready"],
  },
  {
    id: "resume-executive",
    name: "C-Suite Impact",
    description: "Midnight navy & gold boardroom-quality resume for C-level executives",
    type: "resume",
    thumbnail: "",
    category: "Professional",
    profession: "executive",
    features: ["Executive Style", "Gold Foil Accents", "Boardroom Grade", "FAANG-Ready"],
  },
  {
    id: "resume-techstack",
    name: "Dev Aesthetic Dark",
    description: "GitHub-dark theme with green syntax highlights and JSON-style header for developers",
    type: "resume",
    thumbnail: "",
    category: "Tech",
    profession: "engineering",
    features: ["Dark Theme", "Syntax Highlighting", "JSON Header", "Monospace Code"],
  },
  {
    id: "resume-timeline",
    name: "Story Arc",
    description: "Indigo/violet gradient progression timeline for a narrative-driven career story",
    type: "resume",
    thumbnail: "",
    category: "Creative",
    profession: "creative",
    features: ["Progression Timeline", "Gradient Accents", "Story Focus", "Visual Narrative"],
  },
  {
    id: "resume-compact",
    name: "ATS Maximizer",
    description: "Zero-decoration, maximum-density ATS resume — built to pass automated scanners",
    type: "resume",
    thumbnail: "",
    category: "ATS Optimized",
    profession: "general",
    features: ["98/100 ATS Score", "Zero Decoration", "Max Density", "Taleo & Workday Safe"],
  },
  {
    id: "resume-elegant",
    name: "Editorial Luxe",
    description: "Cream editorial layout with Playfair Display italics — for publishing & media roles",
    type: "resume",
    thumbnail: "",
    category: "Creative",
    profession: "media",
    features: ["Playfair Display", "Editorial Style", "Cream Palette", "Refined Serif"],
  },

  // ── PORTFOLIO TEMPLATES (10) ──
  {
    id: "portfolio-simple",
    name: "Coastal Clean",
    description: "Off-white background with teal accents and sticky navigation for a calm, professional vibe",
    type: "portfolio",
    thumbnail: "",
    category: "Minimal",
    profession: "design",
    features: ["One-Page", "Teal Accents", "Sticky Nav", "Responsive"],
  },
  {
    id: "portfolio-grid",
    name: "Metro Grid",
    description: "Blue & white masonry grid layout with skill-based project filter for developers",
    type: "portfolio",
    thumbnail: "",
    category: "Modern",
    profession: "engineering",
    features: ["Masonry Grid", "Skill Filter", "Project Cards", "Timeline"],
  },
  {
    id: "portfolio-brand",
    name: "Personal Brand Story",
    description: "Coral/terracotta palette with animated gradient hero for personal branding",
    type: "portfolio",
    thumbnail: "",
    category: "Creative",
    profession: "creative",
    features: ["Animated Hero", "Coral Palette", "Personal Brand", "Gradient Effects"],
  },
  {
    id: "portfolio-dark",
    name: "Void Dark",
    description: "Black background with purple glow and starfield canvas for dramatic impact",
    type: "portfolio",
    thumbnail: "",
    category: "Modern",
    profession: "engineering",
    features: ["Dark Theme", "Purple Glow", "Starfield", "Dramatic"],
  },
  {
    id: "portfolio-minimal",
    name: "Type-First Minimal",
    description: "Black/white/gray typographic portfolio with Playfair Display quote moments",
    type: "portfolio",
    thumbnail: "",
    category: "Minimal",
    profession: "design",
    features: ["Typography First", "Black & White", "Playfair Quotes", "High Impact"],
  },
  {
    id: "portfolio-studio",
    name: "Agency Studio",
    description: "Near-black with burnt orange accent, full-viewport marquee for agency pros",
    type: "portfolio",
    thumbnail: "",
    category: "Dark/Creative",
    profession: "creative",
    features: ["Dark Theme", "Burnt Orange", "Marquee Hero", "Full-Screen"],
  },
  {
    id: "portfolio-neon",
    name: "Neon Synthwave",
    description: "Pink/cyan dual-neon with glitch effects, CRT scanline and code aesthetic for devs",
    type: "portfolio",
    thumbnail: "",
    category: "Modern/Tech",
    profession: "engineering",
    features: ["Cyberpunk", "Pink/Cyan Neon", "Glitch FX", "CRT Scanline"],
  },
  {
    id: "portfolio-terminal",
    name: "Interactive CLI",
    description: "Fully interactive terminal portfolio that auto-types your profile and accepts commands",
    type: "portfolio",
    thumbnail: "",
    category: "Unique/Developer",
    profession: "engineering",
    features: ["Interactive", "Terminal Style", "Typewriter FX", "JS Commands"],
  },
  {
    id: "portfolio-warmth",
    name: "Human & Warm",
    description: "Parchment background with terracotta blobs and handwritten accents for human-centered roles",
    type: "portfolio",
    thumbnail: "",
    category: "Creative",
    profession: "healthcare",
    features: ["Parchment", "Terracotta", "Blob Shapes", "Handcrafted Feel"],
  },
  {
    id: "portfolio-blueprint",
    name: "Technical Blueprint",
    description: "Blueprint grid background with spec-sheet layout for architects & engineers",
    type: "portfolio",
    thumbnail: "",
    category: "Modern",
    profession: "architecture",
    features: ["Blueprint Grid", "Spec Sheet", "Technical", "Measurement Lines"],
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((t) => t.id === id);
};

export const getResumeTemplates = (): Template[] => {
  return templates.filter((t) => t.type === "resume");
};

export const getPortfolioTemplates = (): Template[] => {
  return templates.filter((t) => t.type === "portfolio");
};

export const getTemplateProfessions = (): string[] => {
  const professions = new Set(templates.map((t) => t.profession).filter((p): p is string => !!p));
  return Array.from(professions);
};

