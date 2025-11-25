import type { Template } from "@shared/schema";

export const templates: Template[] = [
  // 5 Resume Templates
  {
    id: "resume-classic",
    name: "Classic Professional",
    description: "Traditional, ATS-friendly layout perfect for corporate roles",
    type: "resume",
    thumbnail: "/templates/classic-professional.png",
    category: "Professional",
    features: ["ATS-Optimized", "Clean Layout", "Professional Fonts"],
  },
  {
    id: "resume-modern",
    name: "Modern Minimal (Sidebar)",
    description: "Sleek, contemporary design with sidebar layout",
    type: "resume",
    thumbnail: "/templates/modern-minimal.png",
    category: "Modern",
    features: ["Minimalist", "Sidebar Layout", "Modern Typography"],
  },
  {
    id: "resume-creative",
    name: "Creative Student-Focused",
    description: "Vibrant, creative layout ideal for students and freshers",
    type: "resume",
    thumbnail: "/templates/creative-student.png",
    category: "Creative",
    features: ["Colorful", "Project-Focused", "Student-Friendly"],
  },
  {
    id: "resume-experience",
    name: "Experience-Oriented",
    description: "Emphasizes work history for experienced professionals",
    type: "resume",
    thumbnail: "/templates/experience-oriented.png",
    category: "Professional",
    features: ["Timeline Layout", "Experience-First", "Achievement Focus"],
  },
  {
    id: "resume-singlecolumn",
    name: "Modern Single-Column",
    description: "Clean single-column layout with focused information hierarchy",
    type: "resume",
    thumbnail: "/templates/modern-single.png",
    category: "Modern",
    features: ["Single Column", "Visual Hierarchy", "Space Efficient"],
  },
  // 5 Portfolio Templates
  {
    id: "portfolio-simple",
    name: "Simple One-Page",
    description: "Elegant one-page portfolio with clean sections",
    type: "portfolio",
    thumbnail: "/templates/portfolio-simple.png",
    category: "Minimal",
    features: ["One-Page", "Responsive", "Clean Design"],
  },
  {
    id: "portfolio-grid",
    name: "Developer Grid",
    description: "Modern grid-based layout for showcasing projects",
    type: "portfolio",
    thumbnail: "/templates/portfolio-grid.png",
    category: "Modern",
    features: ["Grid Layout", "Project Cards", "Timeline View"],
  },
  {
    id: "portfolio-brand",
    name: "Personal Brand",
    description: "Image-focused portfolio with strong personal branding",
    type: "portfolio",
    thumbnail: "/templates/portfolio-brand.png",
    category: "Creative",
    features: ["Image Showcase", "Personal Brand", "Professional"],
  },
  {
    id: "portfolio-dark",
    name: "Dark Modern",
    description: "Sleek dark theme portfolio with modern aesthetics",
    type: "portfolio",
    thumbnail: "/templates/portfolio-dark.png",
    category: "Modern",
    features: ["Dark Theme", "Modern Design", "Gallery Focus"],
  },
  {
    id: "portfolio-minimal",
    name: "Minimal Landing",
    description: "Minimal landing page portfolio for maximum impact",
    type: "portfolio",
    thumbnail: "/templates/portfolio-minimal.png",
    category: "Minimal",
    features: ["Minimal", "Landing Page", "High Impact"],
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
