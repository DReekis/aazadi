import type { Article, Correction, GovernanceLog, Journalist } from "@/types/domain";

export const journalists: Journalist[] = [
  {
    slug: "naina-rahman",
    name: "Naina Rahman",
    title: "Investigations Editor",
    region: "Delhi NCR",
    beats: ["Public finance", "Local governance", "Courts"],
    bio: "Naina leads document-heavy investigations on municipal spending, public procurement, and accountability institutions.",
    reliabilityScore: 96,
    verifiedReports: 48,
    correctionsIssued: 3,
    joinedAt: "2025-08-12",
    governanceParticipation: 91
  },
  {
    slug: "arvind-menon",
    name: "Arvind Menon",
    title: "Civic Infrastructure Reporter",
    region: "Kerala",
    beats: ["Infrastructure", "Climate resilience", "Public works"],
    bio: "Arvind reports on infrastructure decisions through tenders, inspection records, and field verification.",
    reliabilityScore: 93,
    verifiedReports: 32,
    correctionsIssued: 2,
    joinedAt: "2025-10-03",
    governanceParticipation: 78
  },
  {
    slug: "meera-kulkarni",
    name: "Meera Kulkarni",
    title: "Rights and Welfare Correspondent",
    region: "Maharashtra",
    beats: ["Welfare delivery", "Health", "Civil liberties"],
    bio: "Meera works with public records, community testimony, and legal filings to document institutional accountability.",
    reliabilityScore: 95,
    verifiedReports: 41,
    correctionsIssued: 1,
    joinedAt: "2025-07-19",
    governanceParticipation: 84
  }
];

const [naina, arvind, meera] = journalists;

export const articles: Article[] = [
  {
    slug: "audit-trail-missing-school-meals",
    title: "The Missing Audit Trail Behind Delhi's School Meal Contracts",
    subtitle:
      "Tender records, payment ledgers, and kitchen inspections reveal how a basic public nutrition program became difficult to verify.",
    category: "Public Accountability",
    region: "Delhi NCR",
    author: naina,
    publishedAt: "2026-05-14T09:30:00+05:30",
    readingMinutes: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A quiet classroom with rows of wooden desks in morning light",
    dek: "AAZADI reviewed 312 procurement entries, 47 inspection notes, and two conflicting departmental replies. The central issue is not whether meals were delivered, but whether the public can verify the chain of responsibility.",
    body: [
      "Public nutrition programs are built on a simple constitutional promise: children should not have to depend on invisible paperwork to receive a meal. Yet the records behind one cluster of school meal contracts show a system where responsibility is distributed across ledgers, inspection notes, and unsigned acknowledgements.",
      "The first irregularity appears in the payment sequence. Three vendors received cleared payments before the corresponding kitchen inspection reports were uploaded to the district archive. Officials described the sequence as an administrative delay, but the timestamps in the procurement portal show a recurring pattern across two quarters.",
      "AAZADI is not alleging that meals were not served. The evidence supports a narrower and more important claim: the verification trail available to citizens is incomplete. When the paper trail disappears, the public loses the ability to distinguish between a functioning welfare system and a system asking to be trusted on faith.",
      "Parents interviewed across four wards described inconsistent communication from school administrators. Some had no complaint about meal quality. Others reported skipped service days that were never reflected in official registers. The gap between lived experience and official records is precisely where public accountability journalism must slow down.",
      "The department has been asked to publish the missing inspection references, vendor acknowledgements, and internal escalation notes. This article will be updated only through visible revisions and corrections."
    ],
    evidence: [
      {
        id: "EV-DEL-001",
        title: "Procurement ledger export, Q3 and Q4",
        type: "pdf",
        verificationState: "verified",
        uploader: "Naina Rahman",
        uploadedAt: "2026-05-10T18:14:00+05:30",
        summary: "312 line items exported from the public procurement portal and hashed on upload."
      },
      {
        id: "EV-DEL-002",
        title: "Kitchen inspection timestamp comparison",
        type: "transcript",
        verificationState: "verified",
        uploader: "AAZADI Research Desk",
        uploadedAt: "2026-05-11T11:42:00+05:30",
        summary: "Structured comparison of inspection upload times against payment clearance entries."
      },
      {
        id: "EV-DEL-003",
        title: "Department reply under public information request",
        type: "external_link",
        verificationState: "under_review",
        uploader: "Naina Rahman",
        uploadedAt: "2026-05-12T16:20:00+05:30",
        summary: "Official reply received from the district education office; authenticity review in progress."
      }
    ],
    revisions: [
      {
        version: 3,
        timestamp: "2026-05-14T16:40:00+05:30",
        editor: "Naina Rahman",
        summary: "Added departmental response and clarified scope of the claim.",
        diff: "Replaced broad wording about meal delivery with a narrower claim about incomplete verification records."
      },
      {
        version: 2,
        timestamp: "2026-05-14T12:10:00+05:30",
        editor: "Editorial Review Desk",
        summary: "Updated evidence labels after verification review.",
        diff: "Marked procurement export and timestamp comparison as verified."
      },
      {
        version: 1,
        timestamp: "2026-05-14T09:30:00+05:30",
        editor: "Naina Rahman",
        summary: "Initial publication.",
        diff: "Published article with evidence ledger, integrity hash, and initial revision record."
      }
    ],
    corrections: [
      {
        id: "COR-102",
        articleSlug: "audit-trail-missing-school-meals",
        articleTitle: "The Missing Audit Trail Behind Delhi's School Meal Contracts",
        issuedAt: "2026-05-15T08:15:00+05:30",
        status: "resolved",
        severity: "minor",
        summary:
          "Corrected the designation of one district official from assistant accounts officer to accounts superintendent."
      }
    ],
    comments: [
      {
        id: "COM-001",
        type: "evidence_challenge",
        author: "Public Records Volunteer",
        createdAt: "2026-05-15T10:12:00+05:30",
        status: "resolved",
        body: "The ward-level register appears to use a different vendor code than the procurement export. Please reconcile the mapping."
      },
      {
        id: "COM-002",
        type: "contextual_addition",
        author: "School Management Committee Member",
        createdAt: "2026-05-15T15:22:00+05:30",
        status: "pending_review",
        body: "Two inspection visits were handwritten in local files but not visible in the portal. I can provide dates for verification."
      }
    ],
    integrity: {
      verificationStatus: "provisionally_verified",
      evidenceCount: 3,
      revisionCount: 3,
      correctionStatus: "corrected",
      canonicalHash: "sha256:8af42c2e6b4d0b1c9a90f4d56c7d3b22",
      lastReviewedAt: "2026-05-15T18:20:00+05:30"
    }
  },
  {
    slug: "coastal-road-safety-files",
    title: "Inspection Files Raise New Questions About Coastal Road Safety",
    subtitle:
      "Field photographs and tender annexures show repeated warnings before monsoon repairs were approved.",
    category: "Infrastructure",
    region: "Kerala",
    author: arvind,
    publishedAt: "2026-05-09T07:45:00+05:30",
    readingMinutes: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A coastal road curving along water under a pale sky",
    dek: "The documents do not show a single dramatic failure. They show a quieter governance problem: recurring warnings folded into routine approvals.",
    body: [
      "Public infrastructure usually fails long before it collapses. It fails in file notes that are downgraded, inspection photographs that are archived without action, and tender annexures that convert risk into routine maintenance language.",
      "AAZADI reviewed road safety inspection files from three coastal stretches. The warnings were specific: drainage blockages, shoulder erosion, and poor visibility markers before high-rainfall weeks. The approvals that followed treated the concerns as seasonal work.",
      "The contractor's response says all required work was completed within the approved scope. That may be true. The public question is whether the scope itself reflected the known risk."
    ],
    evidence: [
      {
        id: "EV-KER-004",
        title: "Field inspection photo set",
        type: "image",
        verificationState: "verified",
        uploader: "Arvind Menon",
        uploadedAt: "2026-05-06T14:05:00+05:30",
        summary: "Geotagged images from three inspection stretches, with EXIF preserved."
      },
      {
        id: "EV-KER-005",
        title: "Tender annexure safety scope",
        type: "pdf",
        verificationState: "verified",
        uploader: "AAZADI Research Desk",
        uploadedAt: "2026-05-07T09:18:00+05:30",
        summary: "Relevant pages extracted from tender annexures and matched with award notice."
      }
    ],
    revisions: [
      {
        version: 1,
        timestamp: "2026-05-09T07:45:00+05:30",
        editor: "Arvind Menon",
        summary: "Initial publication.",
        diff: "Published with verified inspection photos and tender annexure."
      }
    ],
    corrections: [],
    comments: [
      {
        id: "COM-003",
        type: "correction_suggestion",
        author: "Civil Engineer, Kochi",
        createdAt: "2026-05-09T12:32:00+05:30",
        status: "published",
        body: "The shoulder erosion description should distinguish between sea-facing and inland shoulders."
      }
    ],
    integrity: {
      verificationStatus: "verified",
      evidenceCount: 2,
      revisionCount: 1,
      correctionStatus: "none",
      canonicalHash: "sha256:f31bd7e45cb17a0dc82050eab2e6f6d1",
      lastReviewedAt: "2026-05-09T18:10:00+05:30"
    }
  },
  {
    slug: "welfare-appeals-health-records",
    title: "What Welfare Appeal Records Reveal About Denied Health Claims",
    subtitle:
      "A review of district appeal files shows how documentation gaps shape access to public health support.",
    category: "Rights and Welfare",
    region: "Maharashtra",
    author: meera,
    publishedAt: "2026-05-02T10:00:00+05:30",
    readingMinutes: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Hospital corridor with soft daylight and empty chairs",
    dek: "The files show a system that often treats missing paperwork as a neutral fact, even when the paperwork is missing because public offices failed to issue it.",
    body: [
      "A denial letter is a public document with private consequences. For families seeking health support, the phrasing can determine whether a case is reopened, abandoned, or pushed into debt.",
      "AAZADI examined 86 appeal records from two districts. The most common reason for denial was not ineligibility, but incomplete supporting documentation. In 21 cases, the missing document was an office-issued certificate the applicant had requested before filing the appeal.",
      "This distinction matters. When the state requires a document that the state itself has delayed, the appeal process becomes less a remedy than a maze."
    ],
    evidence: [
      {
        id: "EV-MH-006",
        title: "Appeal outcome spreadsheet",
        type: "transcript",
        verificationState: "verified",
        uploader: "Meera Kulkarni",
        uploadedAt: "2026-04-30T17:00:00+05:30",
        summary: "Anonymized coding of appeal outcomes, denial reasons, and certificate request dates."
      },
      {
        id: "EV-MH-007",
        title: "Anonymized denial letters",
        type: "pdf",
        verificationState: "under_review",
        uploader: "AAZADI Research Desk",
        uploadedAt: "2026-05-01T08:30:00+05:30",
        summary: "Redacted document set pending secondary privacy review."
      }
    ],
    revisions: [
      {
        version: 2,
        timestamp: "2026-05-03T11:20:00+05:30",
        editor: "Meera Kulkarni",
        summary: "Added privacy note for redacted denial letters.",
        diff: "Clarified that uploaded letters are anonymized and pending secondary privacy review."
      },
      {
        version: 1,
        timestamp: "2026-05-02T10:00:00+05:30",
        editor: "Meera Kulkarni",
        summary: "Initial publication.",
        diff: "Published with appeal outcome spreadsheet and redacted document set."
      }
    ],
    corrections: [],
    comments: [],
    integrity: {
      verificationStatus: "provisionally_verified",
      evidenceCount: 2,
      revisionCount: 2,
      correctionStatus: "none",
      canonicalHash: "sha256:4d5ddc0ef42a94bdbe6718206d7a5e68",
      lastReviewedAt: "2026-05-03T12:05:00+05:30"
    }
  }
];

export const governanceLogs: GovernanceLog[] = [
  {
    id: "GOV-221",
    title: "Journalist application approved after document review",
    category: "journalist_approval",
    timestamp: "2026-05-16T18:35:00+05:30",
    actor: "Governance Review Panel",
    publicSummary:
      "Approved a civic infrastructure reporter after identity verification, conflict review, and work sample assessment.",
    outcome: "Approved with six-month evidence review cadence"
  },
  {
    id: "GOV-220",
    title: "Evidence challenge resolved on school meal investigation",
    category: "correction",
    timestamp: "2026-05-15T17:40:00+05:30",
    actor: "Corrections Desk",
    publicSummary:
      "Mapped vendor code discrepancy between ward register and procurement export; no article claim changed.",
    outcome: "Resolved, note added to evidence ledger"
  },
  {
    id: "GOV-219",
    title: "Moderation action disclosed for unsupported allegation",
    category: "moderation",
    timestamp: "2026-05-13T13:22:00+05:30",
    actor: "Civic Discussion Moderator",
    publicSummary:
      "Removed a public discussion entry that named a private person without documentary support.",
    outcome: "Removed with appeal link preserved"
  },
  {
    id: "GOV-218",
    title: "Constitutional editorial policy amended",
    category: "policy",
    timestamp: "2026-05-11T09:00:00+05:30",
    actor: "Editorial Council",
    publicSummary:
      "Added explicit rule requiring visible revision records for substantial headline, claim, or evidence changes.",
    outcome: "Adopted unanimously"
  }
];

export const corrections: Correction[] = articles.flatMap((article) => article.corrections);

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getJournalist(slug: string) {
  return journalists.find((journalist) => journalist.slug === slug);
}

export function getArticlesByRegion(region: string) {
  const normalized = decodeURIComponent(region).toLowerCase().replaceAll("-", " ");
  return articles.filter((article) => article.region.toLowerCase() === normalized);
}

export function getArticlesByCategory(category: string) {
  const normalized = decodeURIComponent(category).toLowerCase().replaceAll("-", " ");
  return articles.filter((article) => article.category.toLowerCase() === normalized);
}
