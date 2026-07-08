import { NextRequest, NextResponse } from "next/server";
import { pdf, Document, Page, View, Text, StyleSheet, Font } from "@react-pdf/renderer";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ResumePreviewData } from "@/types/resume-preview";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3H6y_k66RjGxrd_o.woff2",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3H6y_k66RjGxrd_o.woff2",
      fontWeight: 700,
    },
  ],
});

function formatMonthYear(value?: string): string {
  if (!value) return "";

  const date = new Date(value);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatContactLine(data: ResumePreviewData) {
  const values = [data.email, data.phone, data.location].filter(Boolean);
  const links = [data.website, data.linkedin, data.github, data.portfolio].filter(Boolean);
  return [...values, ...links].join(" • ");
}

function mapResumeToData(resume: any): ResumePreviewData {
  return {
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
    experiences: resume.experiences.map((experience: any) => ({
      id: experience.id,
      company: experience.company,
      position: experience.position,
      location: experience.location ?? "",
      employmentType: experience.employmentType ?? undefined,
      startDate: experience.startDate?.toISOString().slice(0, 7) ?? "",
      endDate: experience.endDate?.toISOString().slice(0, 7) ?? "",
      isCurrent: experience.isCurrent,
      description: experience.description ?? "",
    })),
    educations: resume.educations.map((education: any) => ({
      id: education.id,
      institution: education.institution,
      degree: education.degree,
      field: education.field ?? "",
      location: education.location ?? "",
      startDate: education.startDate?.toISOString().slice(0, 7) ?? "",
      endDate: education.endDate?.toISOString().slice(0, 7) ?? "",
      grade: education.grade ?? "",
      description: education.description ?? "",
    })),
    skills: resume.skills.map((skill: any) => ({
      id: skill.id,
      category: skill.category,
      name: skill.name,
    })),
    projects: resume.projects.map((project: any) => ({
      id: project.id,
      name: project.name,
      description: project.description ?? "",
      techStack: project.techStack,
      githubUrl: project.githubUrl ?? "",
      liveUrl: project.liveUrl ?? "",
      role: project.role ?? "",
      achievements: project.achievements ?? "",
    })),
    certifications: resume.certifications.map((certification: any) => ({
      id: certification.id,
      name: certification.name,
      issuer: certification.issuer ?? "",
      issueDate: certification.issueDate?.toISOString().slice(0, 7) ?? "",
      credentialUrl: certification.credentialUrl ?? "",
    })),
    languages: resume.languages.map((language: any) => ({
      id: language.id,
      name: language.name,
      proficiency: language.proficiency,
    })),
  };
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 11,
    padding: 40,
    lineHeight: 1.4,
    color: "#111827",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 6,
    color: "#4b5563",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
    color: "#111827",
  },
  text: {
    fontSize: 11,
    color: "#1f2937",
  },
  itemLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#111827",
  },
  itemDetail: {
    marginBottom: 4,
  },
});

function ResumePdfDocument({ data }: { data: ResumePreviewData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{data.fullName || "Your Name"}</Text>
          {data.jobTitle ? <Text style={styles.subtitle}>{data.jobTitle}</Text> : null}
          <Text style={styles.text}>{formatContactLine(data)}</Text>
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experiences?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experiences.map((experience) => (
              <View key={experience.id} style={styles.itemDetail}>
                <Text style={styles.itemLabel}>{experience.position} · {experience.company}</Text>
                <Text style={styles.text}>
                  {formatMonthYear(experience.startDate)} – {experience.isCurrent ? "Present" : formatMonthYear(experience.endDate)}{experience.location ? ` · ${experience.location}` : ""}
                </Text>
                {experience.description ? <Text style={styles.text}>{experience.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.educations?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.educations.map((education) => (
              <View key={education.id} style={styles.itemDetail}>
                <Text style={styles.itemLabel}>{education.degree}{education.field ? `, ${education.field}` : ""}</Text>
                <Text style={styles.text}>
                  {education.institution} · {formatMonthYear(education.startDate)} – {formatMonthYear(education.endDate)}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.skills?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.text}>{data.skills.map((skill) => skill.name).join(", ")}</Text>
          </View>
        ) : null}

        {data.projects?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project) => (
              <View key={project.id} style={styles.itemDetail}>
                <Text style={styles.itemLabel}>{project.name}</Text>
                {project.description ? <Text style={styles.text}>{project.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.certifications?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <Text style={styles.text}>{data.certifications.map((certification) => certification.name).join(" • ")}</Text>
          </View>
        ) : null}

        {data.languages?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.text}>{data.languages.map((language) => `${language.name} (${language.proficiency})`).join(" • ")}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  const { resumeId } = await params;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  try {
    const data = mapResumeToData(resume);
    const document = <ResumePdfDocument data={data} />;
    const pdfBuffer = await pdf(document).toBuffer();

    const fileName = `${(resume.title || "resume")
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase()}.pdf`;

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("[pdf-generation] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}