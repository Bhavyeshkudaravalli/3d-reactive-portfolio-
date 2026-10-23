# Personal Developer Portfolio & Client Lead Generation Website
> **CSE / IT Fresher Portfolio** • Developer Brand + High-Converting Freelance Client Pathways

A modern, fast, responsive personal portfolio built with **React 19**, **Tailwind CSS v4**, and **Vite 8**. Engineered specifically for Computer Science & IT freshers to balance two distinct user journeys:
1. **Tech Recruiters & Interviewers**: Showcases verified skills, academic foundation, core CS concepts, deep-dive project case studies (featuring the **Hospital Management System**), and a downloadable resume.
2. **Freelance Clients & Local Businesses**: Highlights 6 practical, scoped digital services, a transparent 4-step workflow, and an integrated lead generation form with spam prevention, celebrations, and reliable delivery fallbacks.

---

## 🚀 Live Demo & Quick Start

### 1. Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or pnpm

### 2. Installation
```bash
# Clone or open the repository folder
cd "my website"

# Install dependencies
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application with instant Hot Module Replacement (HMR).

### 4. Production Build & Preview
```bash
# Build optimized production bundle in /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Architecture

The entire website is designed with a **centralized configuration architecture**. You do **not** need to dig into complex JSX code to update your name, projects, skills, or links.

```text
my-website/
├── public/
│   ├── favicon.svg          # Modern cyan/violet code monogram
│   └── resume.pdf           # Downloadable PDF resume
├── src/
│   ├── data/                # ⚡ CENTRAL CONFIGURATION (Edit your content here)
│   │   ├── profile.js       # Personal info, education, contacts, availability
│   │   ├── projects.js      # Projects, case studies, modules, status tags
│   │   ├── skills.js        # Categorized technical skills & honest ratings
│   │   ├── services.js      # Scoped client services & benefits
│   │   └── workflow.js      # 4-step client collaboration workflow
│   ├── components/
│   │   ├── Navbar.jsx       # Responsive sticky navbar + mobile drawer
│   │   ├── Hero.jsx         # Hero section + interactive code terminal preview
│   │   ├── About.jsx        # About me narrative + academic credentials
│   │   ├── Skills.jsx       # Categorized skills grid + search & filters
│   │   ├── Projects.jsx     # Project showcase + featured case study
│   │   ├── ProjectModal.jsx # Deep-dive modal (problem, modules, learnings)
│   │   ├── HospitalDashboardMockup.jsx # Interactive hospital UI simulation
│   │   ├── Services.jsx     # 6 client digital solutions with auto-fill CTAs
│   │   ├── Workflow.jsx     # 4-step structured client workflow
│   │   ├── LeadForm.jsx     # Client inquiry lead form + validation & confetti
│   │   ├── Resume.jsx       # Resume credentials preview + download triggers
│   │   ├── Contact.jsx      # Direct email copy, WhatsApp, LinkedIn cards
│   │   ├── Footer.jsx       # Footer with dual sitemap & dynamic year
│   │   └── SocialIcons.jsx  # Crisp inline SVG icons for GitHub, LinkedIn, WA
│   ├── App.jsx              # Main layout & scroll tracking
│   ├── index.css            # Tailwind v4 styles, glassmorphism & gradients
│   └── main.jsx             # React entry point
├── .env.example             # Template for email endpoint keys
├── index.html               # Semantic HTML, SEO tags, Open Graph meta
└── package.json
```

---

## 🛠️ How to Customize Your Portfolio

### 1. Update Your Personal Details (`src/data/profile.js`)
Open `src/data/profile.js` to modify:
- **`name`**: Your full name (e.g. `"John Doe"`).
- **`title`**: Your professional title (e.g. `"Aspiring Software Developer | Python & Web Development"`).
- **`email`**: Your real professional email address.
- **`whatsappNumber`**: Your international phone number without `+` (e.g. `"919876543210"`).
- **`location`**: Your city and country (e.g. `"Bangalore, India"`).
- **`githubUrl` & `linkedinUrl`**: Your direct profile URLs.
- **`isAvailable`**: Set `true` or `false` to toggle the availability pulse badge.
- **`education`**: Update your college name, degree, and expected graduation year.

### 2. Manage Your Projects (`src/data/projects.js`)
To update or add a project:
1. Open `src/data/projects.js`.
2. Edit the existing projects (**Hospital Management System**, **Personal Portfolio Website**, **Student/Business Management System**).
3. Update module statuses to `"Implemented"`, `"In Progress"`, or `"Planned"`.
4. Provide your actual repository URLs in `githubUrl`.

### 3. Replace Your Resume PDF
1. Export your finalized resume as a PDF.
2. Name the file `resume.pdf`.
3. Replace the placeholder file located at `public/resume.pdf`.
4. The download button on the website will automatically serve your new PDF.

### 4. Connect Real Contact Form Submissions (Powered by Resend)
Your portfolio can use the **Resend API** to deliver client inquiries to your inbox.

Copy `.env.example` to `.env` and set `RESEND_API_KEY`, `RESEND_TO_EMAIL`, and `RESEND_FROM_EMAIL`. The `.env` file is ignored by Git. For Vercel or Netlify, configure these variables in the hosting provider's environment-variable settings; local `.env` files are not deployed.

- **Local Development / Preview**: Vite's built-in middleware plugin intercepts `/api/contact` and dispatches via Resend.
- **Vercel / Netlify Deployment**: The serverless handler located at [`api/contact.js`](file:///c:/Users/Enfec%20Solutions/Desktop/my%20website/api/contact.js) automatically handles requests on serverless environments.
- **Fail-Safe Fallbacks**: If the serverless endpoint is ever unreachable, the form automatically offers Web3Forms, Formspree, and direct email client (`mailto:`) fallbacks so no client inquiry is ever lost!

---

## 🚢 Deployment Guide

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Visit [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Under **Environment Variables**, add `RESEND_API_KEY`, `RESEND_TO_EMAIL`, and `RESEND_FROM_EMAIL`. Add `VITE_WEB3FORMS_KEY` or `VITE_FORMSPREE_KEY` only if using those optional client-side fallbacks.
6. Click **Deploy**. Your portfolio will be live in under 60 seconds with free SSL.

### Deploy to Netlify
1. Push your repository to GitHub.
2. Log into [Netlify](https://netlify.com) and choose **"Import from Git"**.
3. Set the build command to `npm run build` and publish directory to `dist`.
4. Add `RESEND_API_KEY`, `RESEND_TO_EMAIL`, and `RESEND_FROM_EMAIL` in the site's environment-variable settings. Add `VITE_WEB3FORMS_KEY` or `VITE_FORMSPREE_KEY` only if using those optional client-side fallbacks.
5. Click **Deploy Site**.

---

## 💡 Key Design & Engineering Features

- **Zero False Claims**: Honest status tags (`Proficient`, `Familiar`, `Learning`) instead of arbitrary percentage skill meters.
- **Dual User Journeys**: Quick navigation buttons for recruiters and potential business clients.
- **Visual Hospital Management System Case Study**: Interactive UI dashboard simulation showcasing real backend schema concepts.
- **Lead Capture Ergonomics**: Clicking "Discuss This Service" on any service card automatically pre-selects the dropdown in the inquiry form and scrolls down.
- **Celebration Feedback**: Confetti animation triggers on valid project inquiry submissions using `canvas-confetti`.
- **Keyboard & Mobile Accessible**: ARIA labels, semantic landmark tags, and mobile navigation drawer.
