/**
 * CLIENT WORKFLOW CONFIGURATION
 * 
 * 4-Step transparent process for client collaborations.
 */

export const workflowSteps = [
  {
    step: "01",
    title: "Understand",
    subtitle: "Discovery & Requirements",
    description:
      "We discuss your core objectives, what problem you want to solve, your target audience, and any project scope or deadline considerations.",
    activities: [
      "Initial conversation via email, WhatsApp, or call",
      "Clarifying must-have features vs nice-to-haves",
      "Reviewing existing reference websites or materials"
    ]
  },
  {
    step: "02",
    title: "Plan",
    subtitle: "Scope & Architecture",
    description:
      "I put together a transparent project scope outlining deliverables, key technical choices, and an agreed-upon timeline before any code is written.",
    activities: [
      "Defining clear milestone expectations",
      "Agreeing on sitemap, layout, and content requirements",
      "Confirming communication channels & review checkpoints"
    ]
  },
  {
    step: "03",
    title: "Build",
    subtitle: "Iterative Development & Testing",
    description:
      "I develop the website or application with clean, responsive code, testing across mobile devices and modern desktop browsers throughout the build.",
    activities: [
      "Semantic markup, responsive styling, and clean logic",
      "Cross-browser and mobile device verification",
      "Regular milestone previews for your review and feedback"
    ]
  },
  {
    step: "04",
    title: "Deliver",
    subtitle: "Deployment & Handover",
    description:
      "Once approved, I deploy your project live on your chosen hosting platform (e.g. Vercel, Netlify, or custom domain) and provide a straightforward walkthrough.",
    activities: [
      "Live deployment and domain setup assistance",
      "Form submission and link verification",
      "Complete code repository handover with simple instructions"
    ]
  }
];

export const workflowNote =
  "Every project is unique. The exact timeline, scope, and review milestones are agreed upon collaboratively before starting.";
