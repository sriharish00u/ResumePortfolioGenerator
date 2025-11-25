import { z } from "zod";

// Project schema with support for multiple images
export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Project title is required"),
  tools: z.string().min(1, "Tools/technologies are required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  images: z.array(z.string()).max(5, "Maximum 5 images per project").default([]),
});

export type Project = z.infer<typeof projectSchema>;

// Education schema
export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field of study is required"),
  startYear: z.string(),
  endYear: z.string(),
  grade: z.string().optional(),
});

export type Education = z.infer<typeof educationSchema>;

// Experience schema
export const experienceSchema = z.object({
  id: z.string(),
  role: z.string().min(1, "Role is required"),
  organization: z.string().min(1, "Organization is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
});

export type Experience = z.infer<typeof experienceSchema>;

// Achievement schema
export const achievementSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Achievement title is required"),
  description: z.string().optional(),
});

export type Achievement = z.infer<typeof achievementSchema>;

// Main user data schema
export const userDataSchema = z.object({
  // Basic Information
  fullName: z.string().min(1, "Full name is required"),
  role: z.string().min(1, "Role/Career objective is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  
  // Profile image (base64 encoded)
  profileImage: z.string().optional(),
  
  // Optional links
  links: z.object({
    github: z.string().url().optional().or(z.literal("")),
    linkedin: z.string().url().optional().or(z.literal("")),
    portfolio: z.string().url().optional().or(z.literal("")),
    other: z.string().url().optional().or(z.literal("")),
  }).optional(),
  
  // About/Summary
  summary: z.string().min(10, "Summary should be at least 10 characters"),
  
  // Skills
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  
  // Education
  education: z.array(educationSchema).min(1, "At least one education entry is required"),
  
  // Projects with images
  projects: z.array(projectSchema).min(1, "At least one project is required"),
  
  // Experience (optional)
  hasExperience: z.boolean().default(false),
  experience: z.array(experienceSchema).optional(),
  
  // Achievements/Certifications
  achievements: z.array(achievementSchema).optional(),
  
  // Hobbies/Interests
  hobbies: z.array(z.string()).optional(),
  
  // Portfolio-specific
  portfolioHero: z.string().optional(),
  
  // Selected template
  selectedTemplate: z.string().optional(),
});

export type UserData = z.infer<typeof userDataSchema>;

// Template metadata schema
export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(["resume", "portfolio"]),
  thumbnail: z.string(),
  category: z.string(),
  features: z.array(z.string()),
});

export type Template = z.infer<typeof templateSchema>;

// Section visibility schema
export const sectionVisibilitySchema = z.object({
  summary: z.boolean().default(true),
  skills: z.boolean().default(true),
  education: z.boolean().default(true),
  projects: z.boolean().default(true),
  experience: z.boolean().default(true),
  achievements: z.boolean().default(true),
  hobbies: z.boolean().default(true),
});

export type SectionVisibility = z.infer<typeof sectionVisibilitySchema>;

// Section order schema
export const sectionOrderSchema = z.array(
  z.enum(["summary", "skills", "education", "projects", "experience", "achievements", "hobbies"])
);

export type SectionOrder = z.infer<typeof sectionOrderSchema>;
