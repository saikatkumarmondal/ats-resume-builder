import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumePreviewData } from "@/types/resume-preview";
import {
  formatMonthYear,
  groupSkillsByCategory,
  buildContactLine,
  buildLinkList,
} from "@/lib/resume-preview-helpers";

const ACCENT_COLOR = "#1D4ED8";
const HEADING_COLOR = "#0F172A";
const BODY_COLOR = "#334155";
const MUTED_COLOR = "#64748B";
const DIVIDER_COLOR = "#E2E8F0";

const styles = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 40,
    paddingHorizontal: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: BODY_COLOR,
  },

  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: HEADING_COLOR,
    letterSpacing: 0.3,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: ACCENT_COLOR,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginTop: 3,
  },
  headerRule: {
    height: 2,
    backgroundColor: ACCENT_COLOR,
    marginTop: 10,
    marginBottom: 8,
    width: 60,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contactItem: {
    fontSize: 9,
    color: MUTED_COLOR,
  },
  contactDot: {
    fontSize: 9,
    color: DIVIDER_COLOR,
    marginHorizontal: 6,
  },

  section: { marginTop: 16 },
  sectionHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionHeadingBar: {
    width: 3,
    height: 10,
    backgroundColor: ACCENT_COLOR,
    marginRight: 6,
  },
  sectionHeading: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: HEADING_COLOR,
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: DIVIDER_COLOR,
    marginBottom: 10,
  },

  entry: { marginBottom: 10 },
  entryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  entryTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: HEADING_COLOR,
  },
  entryDate: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: MUTED_COLOR,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  entrySubtitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Oblique",
    color: ACCENT_COLOR,
    marginTop: 1,
  },
  bulletRow: {
    flexDirection: "row",
    marginTop: 4,
    paddingLeft: 2,
  },
  bulletDot: {
    fontSize: 9,
    color: ACCENT_COLOR,
    marginRight: 6,
    lineHeight: 1.5,
  },
  bulletText: {
    fontSize: 9.5,
    color: BODY_COLOR,
    lineHeight: 1.5,
    flex: 1,
  },

  summaryText: {
    fontSize: 10,
    color: BODY_COLOR,
    lineHeight: 1.6,
  },

  skillCategoryRow: { marginBottom: 5, flexDirection: "row", flexWrap: "wrap" },
  skillCategoryLabel: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: HEADING_COLOR,
    marginRight: 4,
  },
  skillNames: {
    fontSize: 9.5,
    color: BODY_COLOR,
  },

  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 48,
    textAlign: "right",
    fontSize: 8,
    color: MUTED_COLOR,
  },
});

interface ResumePdfDocumentProps {
  data: ResumePreviewData;
}

function splitIntoBullets(text: string): string[] {
  return text
    .split(/\n+/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter((line) => line.length > 0);
}

function DescriptionBullets({ text }: { text: string }) {
  const bullets = splitIntoBullets(text);
  return (
    <>
      {bullets.map((bullet, index) => (
        <View key={index} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{bullet}</Text>
        </View>
      ))}
    </>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <View>
      <View style={styles.sectionHeadingRow}>
        <View style={styles.sectionHeadingBar} />
        <Text style={styles.sectionHeading}>{children}</Text>
      </View>
      <View style={styles.sectionDivider} />
    </View>
  );
}

export function ResumePdfDocument({ data }: ResumePdfDocumentProps) {
  const {
    fullName,
    jobTitle,
    email,
    phone,
    location,
    website,
    linkedin,
    github,
    portfolio,
    summary,
    experiences = [],
    educations = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
  } = data;

  const contactItems = buildContactLine(email, phone, location);
  const linkItems = buildLinkList(website, linkedin, github, portfolio);
  const allContactItems = [...contactItems, ...linkItems];
  const skillsByCategory = groupSkillsByCategory(skills);

  return (
    <Document title={`${fullName || "Resume"} - Resume`}>
      <Page size="A4" style={styles.page} wrap>
        <View>
          <Text style={styles.name}>{fullName || "Your Name"}</Text>
          {jobTitle ? <Text style={styles.jobTitle}>{jobTitle}</Text> : null}
          <View style={styles.headerRule} />
          {allContactItems.length > 0 && (
            <View style={styles.contactRow}>
              {allContactItems.map((item, index) => (
                <Text key={index} style={styles.contactItem}>
                  {item}
                  {index < allContactItems.length - 1 ? "   •   " : ""}
                </Text>
              ))}
            </View>
          )}
        </View>

        {summary ? (
          <View style={styles.section} wrap={false}>
            <SectionHeading>Professional Summary</SectionHeading>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {experiences.length > 0 && (
          <View style={styles.section}>
            <SectionHeading>Experience</SectionHeading>
            {experiences.map((experience, index) => (
              <View key={index} style={styles.entry} wrap={false}>
                <View style={styles.entryHeaderRow}>
                  <Text style={styles.entryTitle}>{experience.position || "Position"}</Text>
                  <Text style={styles.entryDate}>
                    {formatMonthYear(experience.startDate)} — {experience.isCurrent ? "Present" : formatMonthYear(experience.endDate)}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>
                  {experience.company}
                  {experience.location ? `  ·  ${experience.location}` : ""}
                </Text>
                {experience.description ? <DescriptionBullets text={experience.description} /> : null}
              </View>
            ))}
          </View>
        )}

        {projects.length > 0 && (
          <View style={styles.section}>
            <SectionHeading>Projects</SectionHeading>
            {projects.map((project, index) => (
              <View key={index} style={styles.entry} wrap={false}>
                <View style={styles.entryHeaderRow}>
                  <Text style={styles.entryTitle}>{project.name}</Text>
                  {project.role ? <Text style={styles.entryDate}>{project.role}</Text> : null}
                </View>
                {project.techStack.length > 0 ? (
                  <Text style={styles.entrySubtitle}>{project.techStack.join("  ·  ")}</Text>
                ) : null}
                {project.description ? <DescriptionBullets text={project.description} /> : null}
                {project.achievements ? <DescriptionBullets text={project.achievements} /> : null}
              </View>
            ))}
          </View>
        )}

        {educations.length > 0 && (
          <View style={styles.section}>
            <SectionHeading>Education</SectionHeading>
            {educations.map((education, index) => (
              <View key={index} style={styles.entry} wrap={false}>
                <View style={styles.entryHeaderRow}>
                  <Text style={styles.entryTitle}>
                    {education.degree}
                    {education.field ? `, ${education.field}` : ""}
                  </Text>
                  <Text style={styles.entryDate}>
                    {formatMonthYear(education.startDate)} — {formatMonthYear(education.endDate)}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>
                  {education.institution}
                  {education.grade ? `  ·  ${education.grade}` : ""}
                </Text>
                {education.description ? <DescriptionBullets text={education.description} /> : null}
              </View>
            ))}
          </View>
        )}

        {Object.keys(skillsByCategory).length > 0 && (
          <View style={styles.section} wrap={false}>
            <SectionHeading>Skills</SectionHeading>
            {Object.entries(skillsByCategory).map(([category, names]) => (
              <View key={category} style={styles.skillCategoryRow}>
                <Text style={styles.skillCategoryLabel}>{category}:</Text>
                <Text style={styles.skillNames}>{names.join(", ")}</Text>
              </View>
            ))}
          </View>
        )}

        {certifications.length > 0 && (
          <View style={styles.section} wrap={false}>
            <SectionHeading>Certifications</SectionHeading>
            {certifications.map((certification, index) => (
              <View key={index} style={styles.skillCategoryRow}>
                <Text style={styles.skillNames}>
                  <Text style={styles.skillCategoryLabel}>{certification.name}</Text>
                  {certification.issuer ? `  —  ${certification.issuer}` : ""}
                  {certification.issueDate ? `  (${formatMonthYear(certification.issueDate)})` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {languages.length > 0 && (
          <View style={styles.section} wrap={false}>
            <SectionHeading>Languages</SectionHeading>
            <Text style={styles.skillNames}>
              {languages.map((language) => `${language.name} (${language.proficiency})`).join("   ·   ")}
            </Text>
          </View>
        )}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}