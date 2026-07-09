import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ResumePdfDocument } from "@/lib/pdf/resume-pdf-document";
import type { ResumePreviewData } from "@/types/resume-preview";

function toDateInputValue(date: Date | null): string {
  if (!date) return "";
  return date.toISOString().slice(0, 7);
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resumeId = request.nextUrl.searchParams.get("resumeId");
  if (!resumeId) {
    return NextResponse.json({ error: "Missing resumeId" }, { status: 400 });
  }

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id, deletedAt: null },
    include: {
      personalInfo: true,
      experiences: { orderBy: { sortOrder: "asc" } },
      educations: { orderBy: { sortOrder: "asc" } },
      skills: { orderBy: { sortOrder: "asc" } },
      projects: { orderBy: { sortOrder: "asc" } },
      certifications: { orderBy: { sortOrder: "asc" } },
      languages: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  const previewData: ResumePreviewData = {
    fullName: resume.personalInfo?.fullName ?? "",
    jobTitle: resume.personalInfo?.jobTitle ?? undefined,
    email: resume.personalInfo?.email ?? undefined,
    phone: resume.personalInfo?.phone ?? undefined,
    location: resume.personalInfo?.location ?? undefined,
    website: resume.personalInfo?.website ?? undefined,
    linkedin: resume.personalInfo?.linkedin ?? undefined,
    github: resume.personalInfo?.github ?? undefined,
    portfolio: resume.personalInfo?.portfolio ?? undefined,
    summary: resume.personalInfo?.summary ?? undefined,
    experiences: resume.experiences.map((experience) => ({
      id: experience.id,
      company: experience.company,
      position: experience.position,
      location: experience.location ?? "",
      employmentType: experience.employmentType ?? undefined,
      startDate: toDateInputValue(experience.startDate),
      endDate: toDateInputValue(experience.endDate),
      isCurrent: experience.isCurrent,
      description: experience.description ?? "",
    })),
    educations: resume.educations.map((education) => ({
      id: education.id,
      institution: education.institution,
      degree: education.degree,
      field: education.field ?? "",
      location: education.location ?? "",
      startDate: toDateInputValue(education.startDate),
      endDate: toDateInputValue(education.endDate),
      grade: education.grade ?? "",
      description: education.description ?? "",
    })),
    skills: resume.skills.map((skill) => ({
      id: skill.id,
      category: skill.category,
      name: skill.name,
    })),
    projects: resume.projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description ?? "",
      techStack: project.techStack,
      githubUrl: project.githubUrl ?? "",
      liveUrl: project.liveUrl ?? "",
      role: project.role ?? "",
      achievements: project.achievements ?? "",
    })),
    certifications: resume.certifications.map((certification) => ({
      id: certification.id,
      name: certification.name,
      issuer: certification.issuer ?? "",
      issueDate: toDateInputValue(certification.issueDate),
      credentialUrl: certification.credentialUrl ?? "",
    })),
    languages: resume.languages.map((language) => ({
      id: language.id,
      name: language.name,
      proficiency: language.proficiency as "Basic" | "Conversational" | "Fluent" | "Native",
    })),
  };

  const pdfBuffer = await renderToBuffer(
    React.createElement(ResumePdfDocument, { data: previewData })
  );

  const safeFileName = resume.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeFileName}.pdf"`,
    },
  });
}