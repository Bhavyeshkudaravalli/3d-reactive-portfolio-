/**
 * CENTRAL PROFILE CONFIGURATION
 * 
 * Configured for Bhavyesh Kuduravalli
 * Fully synchronized with official resume
 */

export const profile = {
  // Basic Personal Info
  name: "Bhavyesh Kuduravalli",
  preferredName: "Bhavyesh",
  title: "Aspiring Software Developer | Python, Web Development & AI/ML",
  badge: "Available for Internships & Projects",
  isAvailable: true,

  // Location & Background
  background: "Computer Science (AI & ML) Fresher",
  location: "Andhra Pradesh, India",
  email: "bhavyeshkudaravalli007@gmail.com",
  phone: "+91-9491517475",
  whatsappNumber: "919491517475",

  // Social & Platform Links
  githubUrl: "https://github.com/bhavyeshkudaravalli",
  linkedinUrl: "https://www.linkedin.com/in/bhavyesh-kudaravalli-003700283/",
  portfolioUrl: "https://bhavyeshkudaravalli.dev",
  resumePath: "/resume.pdf",

  // Professional Positioning & Mission
  headline: "I Build Digital Solutions That Turn Ideas Into Reality.",
  shortBio:
    "Aspiring Computer Science (AI & ML) student with hands-on experience in web development and deep learning projects. Skilled in Python, JavaScript, and TensorFlow, with a strong interest in building intelligent and scalable applications. Strong interest in Generative AI with foundational knowledge in Cybersecurity.",
  
  aboutMe: {
    introParagraph:
      "Hello! I am Bhavyesh Kuduravalli, an aspiring Computer Science (AI & ML) student at Amrita Sai Institute of Science and Technology. My focus is on building intelligent, user-friendly, and scalable software solutions by combining web development with deep learning architectures.",
    approachParagraph:
      "With hands-on experience developing web applications during my internship at Codec Technologies and building deep learning models using Python and TensorFlow, I emphasize practical execution, clean code, and continuous learning.",
    careerGoal:
      "My primary goal is to secure software development opportunities, internships, and freelance projects where I can contribute to real-world codebases, solve challenging engineering problems, and collaborate with forward-thinking teams.",
  },

  // Education Details
  education: [
    {
      degree: "B.Tech in Computer Science (AI & ML)",
      institution: "Amrita Sai Institute of Science and Technology",
      duration: "2022 - 2026",
      score: "CGPA: 7.33",
      status: "Final Year / 2026",
      location: "Andhra Pradesh, India",
      coursework: [
        "Data Structures & Algorithms",
        "Deep Learning & Neural Networks",
        "Object-Oriented Programming (OOP)",
        "Database Management Systems (DBMS)",
        "Operating Systems",
        "Computer Networks",
        "Web Development & Python"
      ]
    },
    {
      degree: "Senior Secondary (Class 12)",
      institution: "Sri Sarada Junior College, Vijayawada",
      duration: "2022",
      score: "Score: 640/1000",
      status: "Completed",
      location: "Vijayawada, India",
      coursework: ["Mathematics", "Physics", "Chemistry"]
    },
    {
      degree: "Secondary (Class 10)",
      institution: "Vijanana Vihara (EM) High School, Nutakki",
      duration: "2020",
      score: "Score: 443/600",
      status: "Completed",
      location: "Nutakki, India",
      coursework: ["General Sciences", "Mathematics", "English"]
    }
  ],

  // Professional Experience
  experience: [
    {
      role: "Web Development Intern",
      company: "Codec Technologies",
      type: "Remote",
      duration: "April 2025 – May 2025",
      highlights: [
        "Collaborated with team members to develop web-based applications",
        "Worked with HTML, CSS, JavaScript, and Git",
        "Improved debugging and problem-solving skills"
      ]
    }
  ],

  // Certifications
  certifications: [
    {
      title: "Tata Data Visualization",
      issuer: "Forage",
      date: "May 2025",
      description: "Created dashboards and visual insights for business decision-making"
    },
    {
      title: "GenAI for Professionals",
      issuer: "Udemy",
      date: "May 2025",
      description: "Learned prompt engineering and real-world AI applications"
    },
    {
      title: "Introduction to Modern AI",
      issuer: "Cisco",
      date: "May 2025",
      description: "Explored AI concepts including chatbots and computer vision"
    }
  ],

  // Core Highlights (Quick stats for recruiters & clients)
  highlights: [
    { label: "Primary Focus", value: "Python, Web & AI/ML" },
    { label: "Degree Path", value: "B.Tech CSE (AI & ML) - CGPA 7.33" },
    { label: "Internship", value: "Codec Technologies (Web Dev)" },
    { label: "Availability", value: "Immediate / Open for Roles" }
  ],

  // Lead Generation & Contact Form Settings
  formConfig: {
    apiEndpoint: "/api/contact",
    web3FormsKey: import.meta.env.VITE_WEB3FORMS_KEY || "",
    formspreeId: import.meta.env.VITE_FORMSPREE_KEY || "",
    fallbackEmail: "bhavyeshkudaravalli007@gmail.com"
  }
};
