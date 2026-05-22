import type {
  Article,
  CivicMapRegion,
  Correction,
  EvidenceVaultRecord,
  GovernanceLog,
  GovernanceProposal,
  InvestigationWorkspace,
  Journalist,
  PublicPulseItem,
  RegionalDesk
} from "@/types/domain";

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
    geographicScope: "City",
    topicCategory: "Public Welfare",
    contentDepth: "Investigation",
    urgency: "Ongoing",
    editorialVerificationState: "Reviewed",
    civicIssue: "School nutrition procurement",
    district: "Central Delhi",
    coordinates: { lat: 28.6139, lng: 77.209 },
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
    geographicScope: "State",
    topicCategory: "Infrastructure",
    contentDepth: "Standard Report",
    urgency: "Developing",
    editorialVerificationState: "Verified",
    civicIssue: "Coastal road safety",
    district: "Ernakulam",
    coordinates: { lat: 9.9312, lng: 76.2673 },
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
    geographicScope: "State",
    topicCategory: "Health",
    contentDepth: "Investigation",
    urgency: "Ongoing",
    editorialVerificationState: "Reviewed",
    civicIssue: "Health welfare appeals",
    district: "Pune",
    coordinates: { lat: 18.5204, lng: 73.8567 },
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

export const taxonomy = {
  geographicScopes: ["World", "India", "State", "City"],
  topicCategories: [
    "Governance",
    "Judiciary",
    "Education",
    "Environment",
    "Economy",
    "Infrastructure",
    "Corruption",
    "Elections",
    "Health",
    "Public Welfare"
  ],
  contentDepths: ["Pulse Update", "Standard Report", "Investigation", "Evidence Archive"],
  urgencies: ["Breaking", "Developing", "Ongoing", "Archived"],
  verificationStates: ["Preliminary", "Reviewed", "Verified", "Disputed"]
} as const;

export const publicPulseItems: PublicPulseItem[] = [
  {
    id: "PP-IND-014",
    zone: "India",
    region: "National",
    category: "Judiciary",
    headline: "Supreme Court hearing tracker opened for welfare documentation petitions",
    summary: "Legal desk is monitoring filings that affect identity documents, benefit access, and district appeal procedures.",
    urgency: "Developing",
    verificationState: "Reviewed",
    updatedAt: "2026-05-22T09:20:00+05:30",
    evidenceCount: 4,
    desk: "Judiciary Desk"
  },
  {
    id: "PP-DEL-032",
    zone: "Cities",
    region: "Delhi governance",
    category: "Governance",
    headline: "Municipal procurement records flagged for missing inspection references",
    summary: "The Delhi Desk has linked school meal payments, vendor acknowledgements, and pending inspection uploads.",
    urgency: "Ongoing",
    verificationState: "Reviewed",
    updatedAt: "2026-05-22T08:35:00+05:30",
    evidenceCount: 7,
    linkedArticleSlug: "audit-trail-missing-school-meals",
    desk: "Delhi Desk"
  },
  {
    id: "PP-KER-011",
    zone: "States",
    region: "Kerala infrastructure",
    category: "Infrastructure",
    headline: "Coastal road safety review expands before monsoon field checks",
    summary: "Regional reporters are comparing tender scope, inspection imagery, and district rainfall warnings.",
    urgency: "Developing",
    verificationState: "Verified",
    updatedAt: "2026-05-21T19:05:00+05:30",
    evidenceCount: 6,
    linkedArticleSlug: "coastal-road-safety-files",
    desk: "Kerala Desk"
  },
  {
    id: "PP-NE-006",
    zone: "States",
    region: "Northeast civic reporting",
    category: "Environment",
    headline: "Flood preparedness documents requested across three districts",
    summary: "The Northeast Desk is waiting on official response logs before escalating to investigation status.",
    urgency: "Ongoing",
    verificationState: "Preliminary",
    updatedAt: "2026-05-21T16:45:00+05:30",
    evidenceCount: 2,
    desk: "Northeast Desk"
  },
  {
    id: "PP-US-004",
    zone: "World",
    region: "US politics",
    category: "US Politics",
    headline: "Voting administration cases added to comparative democracy watch",
    summary: "Global desk is tracking court filings and official election administration notices for civic relevance.",
    urgency: "Ongoing",
    verificationState: "Reviewed",
    updatedAt: "2026-05-21T14:10:00+05:30",
    evidenceCount: 5,
    desk: "World Desk"
  },
  {
    id: "PP-EU-003",
    zone: "World",
    region: "Europe policy",
    category: "Europe Policy",
    headline: "Digital public records policy brief marked for archive comparison",
    summary: "Records desk is extracting clauses on transparency obligations and automated decision disclosure.",
    urgency: "Archived",
    verificationState: "Verified",
    updatedAt: "2026-05-20T20:15:00+05:30",
    evidenceCount: 8,
    desk: "World Desk"
  },
  {
    id: "PP-ME-009",
    zone: "World",
    region: "Middle East conflict",
    category: "Middle East Conflict",
    headline: "Humanitarian access claims held at reviewed status pending source triangulation",
    summary: "Conflict desk has separated official claims, field testimony, and third-party monitoring records.",
    urgency: "Developing",
    verificationState: "Reviewed",
    updatedAt: "2026-05-22T07:50:00+05:30",
    evidenceCount: 9,
    desk: "World Desk"
  }
];

export const regionalDesks: RegionalDesk[] = [
  {
    slug: "delhi-desk",
    name: "Delhi Desk",
    scope: "City",
    region: "Delhi NCR",
    lead: "Naina Rahman",
    pulseCount: 9,
    activeInvestigations: 3,
    evidenceReviews: 7,
    journalists: ["Naina Rahman"],
    civicIssues: ["Municipal governance", "Education procurement", "Courts"],
    summary: "Tracks capital governance, public procurement, court-linked civic questions, and ward-level public records."
  },
  {
    slug: "northeast-desk",
    name: "Northeast Desk",
    scope: "State",
    region: "Northeast India",
    lead: "Regional Review Desk",
    pulseCount: 6,
    activeInvestigations: 2,
    evidenceReviews: 4,
    journalists: ["Open application queue"],
    civicIssues: ["Environment", "Border governance", "Flood preparedness"],
    summary: "A federation-ready desk for district civic reporting, disaster preparedness records, and state accountability."
  },
  {
    slug: "kerala-desk",
    name: "Kerala Desk",
    scope: "State",
    region: "Kerala",
    lead: "Arvind Menon",
    pulseCount: 8,
    activeInvestigations: 2,
    evidenceReviews: 5,
    journalists: ["Arvind Menon"],
    civicIssues: ["Infrastructure", "Climate resilience", "Public works"],
    summary: "Maintains coastal infrastructure, climate resilience, and public works evidence streams."
  },
  {
    slug: "bengal-desk",
    name: "Bengal Desk",
    scope: "State",
    region: "West Bengal",
    lead: "Editorial Review Desk",
    pulseCount: 4,
    activeInvestigations: 1,
    evidenceReviews: 3,
    journalists: ["Application pending"],
    civicIssues: ["Elections", "Public welfare", "Local governance"],
    summary: "Preparing structured archives for election administration, welfare delivery, and municipal oversight."
  },
  {
    slug: "maharashtra-desk",
    name: "Maharashtra Desk",
    scope: "State",
    region: "Maharashtra",
    lead: "Meera Kulkarni",
    pulseCount: 7,
    activeInvestigations: 2,
    evidenceReviews: 6,
    journalists: ["Meera Kulkarni"],
    civicIssues: ["Health", "Civil liberties", "Welfare delivery"],
    summary: "Coordinates health welfare appeals, district records, and public service delivery investigations."
  }
];

export const investigationWorkspaces: InvestigationWorkspace[] = [
  {
    slug: "school-meal-contracts-repository",
    title: "School Meal Contracts Repository",
    status: "Evidence Verification",
    desk: "Delhi Desk",
    lead: "Naina Rahman",
    collaborators: ["Editorial Review Desk", "AAZADI Research Desk"],
    timeline: [
      { date: "2026-05-08", event: "Procurement ledger imported", state: "complete" },
      { date: "2026-05-11", event: "Inspection timestamp comparison finished", state: "complete" },
      { date: "2026-05-15", event: "Vendor code challenge resolved", state: "active" }
    ],
    sourceTracking: [
      { source: "District procurement portal", protection: "Public record", status: "verified" },
      { source: "School committee member", protection: "Name withheld until consent", status: "reviewed" }
    ],
    evidenceIds: ["EV-DEL-001", "EV-DEL-002", "EV-DEL-003"],
    discussionThreads: [
      { title: "Vendor code reconciliation", type: "Evidence challenge", status: "resolved", comments: 6 },
      { title: "Inspection upload sequence", type: "Editorial review", status: "active", comments: 4 }
    ],
    publicationWorkflow: [
      { step: "Draft", status: "complete" },
      { step: "Review", status: "complete" },
      { step: "Evidence Verification", status: "active" },
      { step: "Editorial Approval", status: "waiting" },
      { step: "Publish", status: "waiting" },
      { step: "Corrections Layer", status: "waiting" },
      { step: "Archive", status: "waiting" }
    ]
  },
  {
    slug: "coastal-road-safety-repository",
    title: "Coastal Road Safety Repository",
    status: "Editorial Approval",
    desk: "Kerala Desk",
    lead: "Arvind Menon",
    collaborators: ["Infrastructure Review Editor"],
    timeline: [
      { date: "2026-05-06", event: "Geotagged image set received", state: "complete" },
      { date: "2026-05-07", event: "Tender annexure matched", state: "complete" },
      { date: "2026-05-21", event: "Monsoon follow-up assigned", state: "active" }
    ],
    sourceTracking: [
      { source: "Field inspection photographs", protection: "Public field evidence", status: "verified" },
      { source: "Contractor response", protection: "On-record reply", status: "reviewed" }
    ],
    evidenceIds: ["EV-KER-004", "EV-KER-005"],
    discussionThreads: [
      { title: "Shoulder erosion terminology", type: "Correction suggestion", status: "published", comments: 3 }
    ],
    publicationWorkflow: [
      { step: "Draft", status: "complete" },
      { step: "Review", status: "complete" },
      { step: "Evidence Verification", status: "complete" },
      { step: "Editorial Approval", status: "active" },
      { step: "Publish", status: "waiting" },
      { step: "Corrections Layer", status: "waiting" },
      { step: "Archive", status: "waiting" }
    ]
  }
];

export const evidenceVaultRecords: EvidenceVaultRecord[] = articles.flatMap((article) =>
  article.evidence.map((item) => ({
    ...item,
    desk: `${article.region} Desk`,
    articleSlug: article.slug,
    custodyState:
      item.verificationState === "verified"
        ? "Cleared"
        : item.verificationState === "under_review"
          ? "Verification review"
          : "Disputed",
    officialRecord: item.type === "pdf" || item.type === "external_link"
  }))
);

export const governanceProposals: GovernanceProposal[] = [
  {
    id: "PROP-041",
    title: "Adopt mandatory taxonomy for all public pulse and article submissions",
    proposal:
      "Require geographic scope, topic category, content depth, urgency, and verification state before any civic update can enter publication review.",
    constitutionalReference: "Article II: Evidence before distribution",
    evidence: ["Editorial workflow audit", "Search API quality memo", "Federation readiness note"],
    discussionCount: 11,
    votingRecord: { approve: 8, reject: 0, abstain: 1 },
    finalOutcome: "Voting closes after the Delhi and Kerala desks complete implementation review.",
    status: "Voting"
  },
  {
    id: "PROP-040",
    title: "Appeal standard for unsupported personal allegations",
    proposal:
      "Create a visible appeal path for moderated public discussion entries that name private persons without documentary support.",
    constitutionalReference: "Article IV: Public dignity and correction rights",
    evidence: ["Moderation log GOV-219", "Discussion structure policy", "Appeal retention memo"],
    discussionCount: 7,
    votingRecord: { approve: 6, reject: 1, abstain: 2 },
    finalOutcome: "Resolved with appeal link preservation and public summary requirement.",
    status: "Resolved"
  }
];

export const civicMapRegions: CivicMapRegion[] = [
  {
    id: "MAP-DEL",
    name: "Delhi NCR",
    scope: "City",
    lat: 28.6139,
    lng: 77.209,
    issue: "Public Welfare",
    pulseCount: 9,
    investigationCount: 3,
    verificationState: "Reviewed"
  },
  {
    id: "MAP-KER",
    name: "Kerala",
    scope: "State",
    lat: 10.8505,
    lng: 76.2711,
    issue: "Infrastructure",
    pulseCount: 8,
    investigationCount: 2,
    verificationState: "Verified"
  },
  {
    id: "MAP-NE",
    name: "Northeast India",
    scope: "State",
    lat: 26.2006,
    lng: 92.9376,
    issue: "Environment",
    pulseCount: 6,
    investigationCount: 2,
    verificationState: "Preliminary"
  },
  {
    id: "MAP-MH",
    name: "Maharashtra",
    scope: "State",
    lat: 19.7515,
    lng: 75.7139,
    issue: "Health",
    pulseCount: 7,
    investigationCount: 2,
    verificationState: "Reviewed"
  },
  {
    id: "MAP-WB",
    name: "West Bengal",
    scope: "State",
    lat: 22.9868,
    lng: 87.855,
    issue: "Elections",
    pulseCount: 4,
    investigationCount: 1,
    verificationState: "Preliminary"
  }
];

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

export function getInvestigationWorkspace(slug: string) {
  return investigationWorkspaces.find((workspace) => workspace.slug === slug);
}
