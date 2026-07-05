import type { ResumePreviewData } from "@/types/resume-preview";

export const SAMPLE_RESUME_DATA: ResumePreviewData = {
  fullName: "Saikat Kumar Mondal",
  jobTitle: "Senior Frontend Developer",
  email: "saikat@example.com",
  phone: "+880 1XXXXXXXXX",
  location: "Dhaka, Bangladesh",
  website: "https://saikatmondal.dev",
  linkedin: "https://linkedin.com/in/saikatmondal",
  summary:
    "Frontend developer with 5+ years building performant, accessible web applications using React and TypeScript.",
  experiences: [
    {
      company: "TechCorp",
      position: "Senior Frontend Developer",
      location: "Remote",
      startDate: "2022-01",
      endDate: "",
      isCurrent: true,
      description: "Led migration to Next.js, improving load times by 40%.",
    },
  ],
  educations: [
    {
      institution: "University of Dhaka",
      degree: "B.Sc.",
      field: "Computer Science",
      startDate: "2016-01",
      endDate: "2020-01",
    },
  ],
  skills: [
    { category: "Frameworks", name: "React" },
    { category: "Frameworks", name: "Next.js" },
    { category: "Programming Languages", name: "TypeScript" },
  ],
  projects: [],
  certifications: [],
  languages: [{ name: "English", proficiency: "Fluent" }],
};