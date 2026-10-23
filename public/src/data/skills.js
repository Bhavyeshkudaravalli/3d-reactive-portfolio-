/**
 * TECHNICAL SKILLS CONFIGURATION
 * 
 * Synchronized with Bhavyesh Kuduravalli's verified resume.
 * Levels: "Proficient" | "Familiar" | "Learning"
 * No misleading percentage meters.
 */

export const skillCategories = [
  { id: "all", label: "All Skills" },
  { id: "programming", label: "Languages" },
  { id: "web", label: "Web Technologies" },
  { id: "aiml", label: "AI & ML Tools" },
  { id: "tools", label: "Tools & DevOps" },
  { id: "core", label: "CS & Analytical Skills" }
];

export const skills = [
  // Programming Languages
  {
    name: "Python",
    category: "programming",
    level: "Proficient",
    description: "Core scripting, OOP architecture, deep learning with TensorFlow, and data processing.",
    tags: ["Core Language", "AI/ML", "OOP", "Automation"]
  },
  {
    name: "Java",
    category: "programming",
    level: "Familiar",
    description: "Object-oriented software design, classes, collections framework, and algorithmic logic.",
    tags: ["OOP", "Java Core", "Enterprise Foundation"]
  },
  {
    name: "C Programming",
    category: "programming",
    level: "Familiar",
    description: "Memory management, pointers, and foundational computer science logic.",
    tags: ["CS Foundation", "Memory", "Pointers"]
  },

  // Web Technologies
  {
    name: "HTML5",
    category: "web",
    level: "Proficient",
    description: "Semantic web standards, accessibility, modern forms, and structural markup.",
    tags: ["Semantic HTML", "Accessibility", "Standards"]
  },
  {
    name: "CSS3",
    category: "web",
    level: "Proficient",
    description: "Modern layouts (Flexbox, Grid), dynamic gradients, animations, and responsive styling.",
    tags: ["Flexbox", "CSS Grid", "Animations", "Styling"]
  },
  {
    name: "JavaScript",
    category: "web",
    level: "Proficient",
    description: "DOM manipulation, event handling, asynchronous operations, and modern ES6+ features.",
    tags: ["DOM Manipulation", "ES6+", "Event Handling"]
  },
  {
    name: "React.js",
    category: "web",
    level: "Familiar",
    description: "Component architecture, hooks, state management, and modern Single Page Applications.",
    tags: ["Component Architecture", "Hooks", "Modern SPA"]
  },
  {
    name: "Tailwind CSS",
    category: "web",
    level: "Proficient",
    description: "Utility-first rapid prototyping, responsive layouts, and dark theme design.",
    tags: ["Utility-First", "Responsive Design", "Modern UI"]
  },

  // AI & ML Tools
  {
    name: "TensorFlow",
    category: "aiml",
    level: "Familiar",
    description: "Building deep learning architectures, CNNs, image preprocessing, and model evaluation.",
    tags: ["Deep Learning", "CNN", "Model Training"]
  },
  {
    name: "NumPy",
    category: "aiml",
    level: "Proficient",
    description: "Numerical computations, n-dimensional matrix manipulation, and mathematical routines.",
    tags: ["Matrix Math", "Array Operations", "Data Processing"]
  },
  {
    name: "OpenCV",
    category: "aiml",
    level: "Familiar",
    description: "Computer vision tasks, image filtration, facial feature analysis, and video processing.",
    tags: ["Computer Vision", "Image Processing", "Feature Extraction"]
  },

  // Tools & Platforms
  {
    name: "Git & GitHub",
    category: "tools",
    level: "Proficient",
    description: "Version control, branching workflows, pull requests, and repository hosting.",
    tags: ["Version Control", "Collaboration", "Git CLI"]
  },
  {
    name: "VS Code",
    category: "tools",
    level: "Proficient",
    description: "Primary engineering environment, debugging workflows, and extension setups.",
    tags: ["Primary IDE", "Debugging", "Extensions"]
  },
  {
    name: "Generative AI Tools",
    category: "tools",
    level: "Proficient",
    description: "Prompt engineering, workflow acceleration, code analysis with ChatGPT, Claude, and Gemini.",
    tags: ["ChatGPT", "Claude", "Prompt Engineering"]
  },

  // Core CS & Other Skills
  {
    name: "Problem Solving",
    category: "core",
    level: "Proficient",
    description: "Algorithmic thinking, debugging complex bugs, and structured issue breakdown.",
    tags: ["Analytical Thinking", "Debugging", "Algorithms"]
  },
  {
    name: "Data Analysis",
    category: "core",
    level: "Familiar",
    description: "Insight extraction, data visualization (Tata / Forage), and metric interpretation.",
    tags: ["Visualization", "Dashboards", "Metrics"]
  },
  {
    name: "Data Structures & Algorithms",
    category: "core",
    level: "Familiar",
    description: "Arrays, Linked Lists, Stacks, Queues, Binary Trees, Searching, and Sorting.",
    tags: ["Complexity Analysis", "Data Structures", "Sorting"]
  },
  {
    name: "Cybersecurity Foundations",
    category: "core",
    level: "Learning",
    description: "Security fundamentals, secure coding practices, access control, and web security.",
    tags: ["Security Basics", "Auth Best Practices", "Data Protection"]
  }
];
