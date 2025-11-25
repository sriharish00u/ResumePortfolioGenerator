import type { UserData } from "@shared/schema";

export const sampleUserData: Partial<UserData> = {
  fullName: "Sarah Johnson",
  role: "Full Stack Developer",
  email: "sarah@example.com",
  phone: "+1 (555) 123-4567",
  summary: "Experienced full-stack developer with 5+ years building scalable web applications. Passionate about clean code and user experience.",
  skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "GraphQL"],
  education: [
    {
      id: "1",
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startYear: "2016",
      endYear: "2020",
      grade: "3.8",
    },
  ],
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      tools: "React, Node.js, PostgreSQL, Stripe",
      description: "Built a full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
      images: [],
    },
    {
      id: "2",
      title: "Real-Time Chat Application",
      tools: "React, WebSockets, Express, MongoDB",
      description: "Developed a real-time chat application with user authentication, file sharing, and message encryption.",
      images: [],
    },
  ],
  experience: [
    {
      id: "1",
      role: "Senior Developer",
      organization: "Tech Innovations Inc",
      duration: "2022 - Present",
      description: "Led development of microservices architecture and mentored junior developers on best practices.",
    },
    {
      id: "2",
      role: "Full Stack Developer",
      organization: "Digital Solutions Ltd",
      duration: "2020 - 2022",
      description: "Built and maintained multiple production applications, improving performance by 40%.",
    },
  ],
  achievements: [
    {
      id: "1",
      title: "AWS Certified Solutions Architect",
      description: undefined,
    },
    {
      id: "2",
      title: "Open Source Contributor - 500+ GitHub Stars",
      description: undefined,
    },
  ],
  hobbies: ["Open source development", "Technical writing", "Photography"],
  portfolioHero: "Building beautiful, scalable web applications",
};
