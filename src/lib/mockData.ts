import type { UserData } from "@shared/schema";

export const sampleUserData: Partial<UserData> = {
  fullName: "Alex Morgan",
  role: "Senior Product Manager",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 234-5678",
  summary: "Strategic product leader with 6+ years driving product vision, cross-functional team leadership, and data-informed decision making. PMP certified with a track record of delivering SaaS products from zero to 50k users.",
  skills: ["Product Strategy", "Roadmapping", "Agile", "Data Analysis", "A/B Testing", "Figma", "SQL", "Python"],
  links: {
    github: "https://github.com/alexmorgan",
    linkedin: "https://linkedin.com/in/alexmorgan",
    portfolio: "https://alexmorgan.dev",
  },
  education: [
    {
      id: "1",
      institution: "Stanford University",
      degree: "Master of Business Administration",
      field: "Product Management",
      startYear: "2018",
      endYear: "2020",
      grade: "3.9",
    },
    {
      id: "2",
      institution: "UC Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science & Economics",
      startYear: "2013",
      endYear: "2017",
      grade: "3.7",
    },
  ],
  projects: [
    {
      id: "1",
      title: "GrowthPlay — Revenue Intelligence Platform",
      tools: "React, Python, PostgreSQL, AWS, Stripe",
      description: "Led product from concept to 10k MRR within 12 months. Defined OKRs, ran 50+ user interviews, and shipped 3 major releases improving activation by 34%.",
      images: [],
    },
    {
      id: "2",
      title: "TeamFlow — OKR & Collaboration Tool",
      tools: "Next.js, TypeScript, Supabase, Tailwind",
      description: "Designed and shipped an internal OKR tracking tool adopted by 12 teams. Iterated based on NPS feedback loops with bi-weekly ship cycles.",
      images: [],
    },
  ],
  experience: [
    {
      id: "1",
      role: "Senior Product Manager",
      organization: "ScaleUp SaaS Inc.",
      duration: "2022 - Present",
      description: "Own platform-wide product roadmap serving 50k+ users. Drove 3 consecutive quarters of 20%+ ARR growth through pricing experiments and feature discovery.",
    },
    {
      id: "2",
      role: "Product Manager",
      organization: "Launchpad Technologies",
      duration: "2020 - 2022",
      description: "Managed the full product lifecycle for a B2B analytics product. Introduced continuous discovery habits, reducing time-to-validation by 40%.",
    },
  ],
  achievements: [
    {
      id: "1",
      title: "PMP Certified (Project Management Professional)",
      description: undefined,
    },
    {
      id: "2",
      title: "Product School Graduate — Product Leadership Certificate",
      description: undefined,
    },
    {
      id: "3",
      title: "Speaker at ProductCon 2024 — \"Data-Driven Roadmaps\"",
      description: undefined,
    },
  ],
  hobbies: ["Product analytics meetups", "Mentoring PMs", "Trail running", "Jazz piano"],
  hasExperience: true,
  portfolioHero: "Turning ambitious ideas into products people love",
};
