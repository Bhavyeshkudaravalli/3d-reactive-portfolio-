/**
 * PROJECTS CONFIGURATION
 * 
 * Synchronized with Bhavyesh Kuduravalli's official resume projects
 * + featured software development work.
 */

export const projects = [
  {
    id: "facial-emotion-recognition",
    title: "Facial Emotion Recognition Using AI & Deep Learning",
    subtitle: "Convolutional Neural Network for Computer Vision Emotion Detection",
    isFeatured: false,
    status: "Completed",
    category: "AI & Deep Learning",
    shortSummary:
      "A deep learning computer vision system built using Python and TensorFlow that detects and classifies human facial emotions in real-time with approximately 85% accuracy.",
    problemSolved:
      "Accurately recognizing human emotional states from images is challenging due to facial variations, lighting inconsistencies, and subtle facial micro-expressions.",
    proposedSolution:
      "Developed and trained a Convolutional Neural Network (CNN) pipeline on preprocessed facial datasets, implementing image normalization, feature extraction, and real-time inference via OpenCV.",
    
    modules: [
      { name: "Image Preprocessing & Normalization", status: "Implemented", desc: "Grayscale conversion, facial region bounding-box cropping, and pixel normalization." },
      { name: "CNN Model Architecture", status: "Implemented", desc: "Multi-layer convolutional and pooling layers with dropout regularizers to prevent overfitting." },
      { name: "Emotion Classification Head", status: "Implemented", desc: "Softmax output predicting emotional categories (Happy, Sad, Angry, Neutral, Surprise, etc.)." },
      { name: "Real-Time OpenCV Detection Pipeline", status: "Implemented", desc: "Haar cascade / facial detection integration for live webcam video stream inference." },
      { name: "Accuracy Evaluation & Metrics", status: "Implemented", desc: "Validated model convergence achieving ~85% classification accuracy across test partitions." }
    ],

    techStack: [
      "Python 3",
      "TensorFlow",
      "Convolutional Neural Networks (CNN)",
      "OpenCV",
      "NumPy",
      "Image Processing"
    ],

    keyLearnings: [
      "Trained and fine-tuned CNN hyperparameters (learning rates, batch sizes, activation functions).",
      "Handled dataset imbalance and augmented image data to prevent model bias.",
      "Achieved ~85% test accuracy through rigorous validation and convolutional layer tuning."
    ],

    githubUrl: "https://github.com/bhavyeshkudaravalli/facial-emotion-recognition",
    liveDemoUrl: null,
    accentColor: "violet"
  },
  {
    id: "countdown-timer",
    title: "Countdown Timer Web Application",
    subtitle: "Responsive DOM Manipulation & Dynamic Event Handling Tool",
    isFeatured: false,
    status: "Completed",
    category: "Frontend / JavaScript",
    shortSummary:
      "A responsive, lightweight web application built with HTML, CSS, and JavaScript featuring dynamic time calculations, customizable intervals, and clean DOM manipulation.",
    problemSolved:
      "Many online timers are cluttered with ads, slow to load, or lack fluid responsiveness across mobile devices.",
    proposedSolution:
      "Created a clean, modular JavaScript timer engine that updates interval states efficiently without UI freezing or clock drift, wrapped in an intuitive mobile-friendly interface.",

    modules: [
      { name: "Dynamic Time Updates Engine", status: "Implemented", desc: "Accurate interval ticking mechanism calculating remaining hours, minutes, and seconds." },
      { name: "DOM Manipulation & Reactive UI", status: "Implemented", desc: "Direct and lightweight DOM element updates without external library bloat." },
      { name: "Event Handling & Controls", status: "Implemented", desc: "Start, pause, reset, and custom target time setter event listeners." },
      { name: "Responsive CSS Layout", status: "Implemented", desc: "Flexbox and media queries ensuring seamless interaction on phones, tablets, and desktops." }
    ],

    techStack: [
      "JavaScript (ES6)",
      "HTML5",
      "CSS3",
      "DOM Manipulation",
      "Event Handling"
    ],

    keyLearnings: [
      "Mastered JavaScript `setInterval` and `clearInterval` lifecycle management to avoid memory leaks.",
      "Engineered responsive UI transitions using modern CSS keyframes.",
      "Solidified fundamental event-driven frontend programming patterns."
    ],

    githubUrl: "https://github.com/bhavyeshkudaravalli/countdown-timer",
    liveDemoUrl: null,
    accentColor: "cyan"
  },
  {
    id: "background-generator",
    title: "Dynamic Background Generator",
    subtitle: "Interactive Gradient & Palette Generator UI Tool",
    isFeatured: false,
    status: "Completed",
    category: "Frontend / Web Tool",
    shortSummary:
      "An interactive UI utility that allows users to create, customize, preview, and export CSS linear and radial gradient backgrounds dynamically with instant CSS code generation.",
    problemSolved:
      "Developers and designers need quick ways to visualize CSS gradient combinations and copy clean, cross-browser CSS rules without trial and error.",
    proposedSolution:
      "Engineered an interactive color-picker tool with real-time DOM background updating, angle controls, and one-click CSS snippet copying.",

    modules: [
      { name: "Real-Time Background Preview", status: "Implemented", desc: "Immediate visual rendering of multi-stop gradients as user adjusts inputs." },
      { name: "Color Picker & Angle Controls", status: "Implemented", desc: "Hex input, color palette presets, and linear gradient angle selector." },
      { name: "CSS Snippet Export", status: "Implemented", desc: "Generates formatted, ready-to-paste CSS background properties." },
      { name: "Modern Dark/Light Contrast UI", status: "Implemented", desc: "Clean UI card layout emphasizing typography and color clarity." }
    ],

    techStack: [
      "HTML5",
      "CSS3 (Gradients & Variables)",
      "JavaScript",
      "UI/UX Design",
      "Clipboard API"
    ],

    keyLearnings: [
      "Gained deep understanding of CSS styling, color spaces, and user interaction design.",
      "Synchronized state between visual controls and rendered CSS properties.",
      "Crafted intuitive micro-interactions that make developer tooling enjoyable."
    ],

    githubUrl: "https://github.com/bhavyeshkudaravalli/background-generator",
    liveDemoUrl: null,
    accentColor: "blue"
  },
  {
    id: "hospital-management-system",
    title: "Hospital Management System",
    subtitle: "Digital Healthcare Administration & Patient Record System",
    isFeatured: true,
    status: "Completed (Core MVP)",
    category: "Python / Full Stack",
    shortSummary:
      "A software application designed to streamline healthcare facility operations by digitizing patient registrations, doctor assignments, medical records, and administrative workflows.",
    problemSolved:
      "Small clinics and hospital wards often rely on error-prone paper logs or disjointed spreadsheets, resulting in long patient queues, lost medical histories, and chaotic doctor scheduling.",
    proposedSolution:
      "Built a centralized database application with authenticated role-based access for staff and administrators, enabling instant patient check-in, real-time doctor availability checks, and secure medical record lookups.",
    
    modules: [
      { name: "Patient Registration & Profile Directory", status: "Implemented", desc: "Captures patient demographics, contact details, emergency contacts, and assigned ID." },
      { name: "Doctor Management & Department Roster", status: "Implemented", desc: "Maintains doctor profiles, specializations, consultation hours, and room assignments." },
      { name: "Admin Dashboard & Overview Metrics", status: "Implemented", desc: "Real-time summary counts of active admissions, available doctors, and daily registrations." },
      { name: "Role-Based Authentication", status: "Implemented", desc: "Separate access credentials and privileges for administrative staff and doctors." },
      { name: "Patient Medical History & Vitals Log", status: "Implemented", desc: "Chronological recording of diagnoses, prescriptions, and follow-up notes." },
      { name: "Appointment Scheduling System", status: "In Progress", desc: "Interactive slot booking calendar with conflict prevention logic." },
      { name: "Billing & Invoice Generation", status: "Planned", desc: "Automated billing based on consultation fees, tests, and medicines." },
      { name: "Prescription PDF Export", status: "Planned", desc: "One-click digital PDF prescription generator with clinic header." }
    ],

    techStack: [
      "Python 3",
      "SQLite / MySQL",
      "Tkinter / Flask",
      "Relational Schema Design",
      "CRUD Operations"
    ],

    keyLearnings: [
      "Designed normalized relational database schemas with primary & foreign key constraints.",
      "Implemented modular code structure separating UI components and data controllers.",
      "Handled edge cases like duplicate registrations, invalid inputs, and simultaneous updates."
    ],

    githubUrl: "https://github.com/bhavyeshkudaravalli/hospital-management-system",
    liveDemoUrl: null,
    accentColor: "cyan"
  },
  {
    id: "personal-portfolio-website",
    title: "Personal Portfolio & Lead Generation Platform",
    subtitle: "High-Performance Developer Brand & Freelance Inquiries Hub",
    isFeatured: false,
    status: "Completed",
    category: "Frontend / React",
    shortSummary:
      "A modern, responsive personal developer portfolio engineered with React 19, Tailwind CSS v4, and Vite to showcase skills, verified resume credentials, and client development services.",
    problemSolved:
      "Freshers frequently struggle with generic templates that either look like toy projects or fail to provide actionable inquiry pathways for potential freelance and contract opportunities.",
    proposedSolution:
      "Crafted a bespoke, lightning-fast web platform featuring dual user journeys (Recruiter & Client), interactive case study modal breakdowns, honest skill rating badges, and an integrated client lead generation form.",
    
    modules: [
      { name: "Dual-Journey Navigation Flow", status: "Implemented", desc: "Tailored browsing paths for both corporate recruiters and freelance clients." },
      { name: "Interactive Project Case Study Modals", status: "Implemented", desc: "In-depth breakdowns showing problem, solution, code architecture, and learnings." },
      { name: "Client Lead Capture Form", status: "Implemented", desc: "Form validation with Web3Forms/Formspree integration and instant mailto fallbacks." },
      { name: "Service Pre-Selection Flow", status: "Implemented", desc: "Clicking 'Discuss Service' auto-populates the inquiry form and scrolls smoothly." },
      { name: "Responsive Dark Theme UI", status: "Implemented", desc: "Built with modern Tailwind v4, electric blue/cyan accents, and mobile hamburger drawer." },
      { name: "Direct Resume Download", status: "Implemented", desc: "Official PDF resume generated with verified academic, internship, and project credentials." }
    ],

    techStack: [
      "React 19",
      "Tailwind CSS v4",
      "Vite 8",
      "Lucide React",
      "Canvas Confetti"
    ],

    keyLearnings: [
      "Structuring clean, reusable React component hierarchies and centralized config-driven state.",
      "Ensuring high accessibility (ARIA labels, keyboard navigation, semantic HTML tags).",
      "Building seamless client conversion paths with resilient email fallbacks."
    ],

    githubUrl: "https://github.com/bhavyeshkudaravalli/portfolio-website",
    liveDemoUrl: null,
    accentColor: "violet"
  }
];
