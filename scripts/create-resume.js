import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

async function generateResumePdf() {
  const pdfDoc = await PDFDocument.create();

  // Load standard fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette
  const black = rgb(0.1, 0.1, 0.1);
  const darkGray = rgb(0.25, 0.25, 0.25);
  const linkBlue = rgb(0.05, 0.25, 0.65);
  const lineGray = rgb(0.3, 0.3, 0.3);

  // Page Dimensions (Letter: 612 x 792)
  const pageWidth = 612;
  const pageHeight = 792;
  const leftMargin = 50;
  const rightMargin = 562;
  const contentWidth = rightMargin - leftMargin;

  // -------------------------------------------------------------
  // HELPER FUNCTIONS
  // -------------------------------------------------------------
  const drawSectionHeader = (page, title, y) => {
    page.drawText(title.toUpperCase(), {
      x: leftMargin,
      y: y,
      size: 11,
      font: fontBold,
      color: black,
    });
    const lineY = y - 3;
    page.drawLine({
      start: { x: leftMargin, y: lineY },
      end: { x: rightMargin, y: lineY },
      thickness: 1,
      color: lineGray,
    });
    return y - 16;
  };

  const wrapText = (text, maxWidth, font, size) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, size);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  // =============================================================
  // PAGE 1
  // =============================================================
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 50;

  // Header Left
  page1.drawText('Bhavyesh Kuduravalli', {
    x: leftMargin,
    y: y,
    size: 16,
    font: fontBold,
    color: black,
  });

  // Header Right (Contact info)
  const phone = '+91-9491517475';
  const email = 'bhavyeshkudaravalli007@gmail.com';
  const linkedin = 'linkedin.com/in/bhavyesh-kudaravalli-003700283';
  const github = 'github.com/bhavyeshkudaravalli';

  page1.drawText(phone, {
    x: rightMargin - fontRegular.widthOfTextAtSize(phone, 9),
    y: y,
    size: 9,
    font: fontRegular,
    color: darkGray,
  });

  y -= 13;
  page1.drawText('Bachelor of Technology', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });
  page1.drawText(email, {
    x: rightMargin - fontRegular.widthOfTextAtSize(email, 9),
    y: y,
    size: 9,
    font: fontRegular,
    color: linkBlue,
  });

  y -= 12;
  page1.drawText('Computer science (AI&ML)', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });
  page1.drawText(linkedin, {
    x: rightMargin - fontRegular.widthOfTextAtSize(linkedin, 9),
    y: y,
    size: 9,
    font: fontRegular,
    color: linkBlue,
  });

  y -= 12;
  page1.drawText('Amritasai institute of science and technology', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });
  page1.drawText(github, {
    x: rightMargin - fontRegular.widthOfTextAtSize(github, 9),
    y: y,
    size: 9,
    font: fontRegular,
    color: linkBlue,
  });

  y -= 24;

  // SUMMARY
  y = drawSectionHeader(page1, 'SUMMARY', y);
  const summaryText =
    'Aspiring Computer Science (AI & ML) student with hands-on experience in web development and deep learning projects. Skilled in Python, JavaScript, and TensorFlow, with a strong interest in building intelligent and scalable applications. Strong interest in Generative AI with foundational knowledge in Cybersecurity.';
  const summaryLines = wrapText(summaryText, contentWidth, fontRegular, 9.5);
  for (const line of summaryLines) {
    page1.drawText(line, {
      x: leftMargin,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: darkGray,
    });
    y -= 13;
  }

  y -= 10;

  // EDUCATION
  y = drawSectionHeader(page1, 'EDUCATION', y);

  // College
  page1.drawText('B.Tech in Computer Science (AI & ML)', {
    x: leftMargin,
    y: y,
    size: 10,
    font: fontBold,
    color: black,
  });
  y -= 13;
  page1.drawText('Amritasai Institute of Science and Technology | 2026', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });
  y -= 12;
  page1.drawText('CGPA: 7.33', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });

  y -= 15;

  // Senior Secondary
  page1.drawText('Senior Secondary (Class 12)', {
    x: leftMargin,
    y: y,
    size: 10,
    font: fontBold,
    color: black,
  });
  y -= 13;
  page1.drawText('Sri Sarada Junior College, Vijayawada | 2022', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });
  y -= 12;
  page1.drawText('Score: 640/1000', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });

  y -= 15;

  // Secondary
  page1.drawText('Secondary (Class 10)', {
    x: leftMargin,
    y: y,
    size: 10,
    font: fontBold,
    color: black,
  });
  y -= 13;
  page1.drawText('Vijanana Vihara (EM) High School, Nutakki', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });
  y -= 12;
  page1.drawText('Score: 443/600', {
    x: leftMargin,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });

  y -= 18;

  // EXPERIENCE
  y = drawSectionHeader(page1, 'EXPERIENCE', y);

  page1.drawText('Web Development Intern - Codec Technologies (Remote)', {
    x: leftMargin,
    y: y,
    size: 10,
    font: fontBold,
    color: black,
  });
  y -= 12;
  page1.drawText('April 2025 - May 2025', {
    x: leftMargin,
    y: y,
    size: 9,
    font: fontOblique,
    color: darkGray,
  });
  y -= 14;

  const expBullets = [
    'Collaborated with team members to develop web-based applications',
    'Worked with HTML, CSS, JavaScript, and Git',
    'Improved debugging and problem-solving skills',
  ];
  for (const bullet of expBullets) {
    page1.drawText('•', { x: leftMargin + 10, y: y, size: 9, font: fontRegular, color: black });
    page1.drawText(bullet, { x: leftMargin + 22, y: y, size: 9.5, font: fontRegular, color: darkGray });
    y -= 13;
  }

  y -= 12;

  // PROJECTS
  y = drawSectionHeader(page1, 'PROJECTS', y);

  // Project 1: Facial Emotion Recognition
  page1.drawText('•  FACIAL EMOTION RECOGNITION USING AI & DEEP LEARNING', {
    x: leftMargin,
    y: y,
    size: 10,
    font: fontBold,
    color: black,
  });
  y -= 14;
  const proj1Bullets = [
    'Developed a deep learning model using Python and TensorFlow for emotion detection',
    'Applied CNN and image processing techniques',
    'Achieved ~85% accuracy in emotion classification',
  ];
  for (const b of proj1Bullets) {
    page1.drawText(b, { x: leftMargin + 15, y: y, size: 9.5, font: fontRegular, color: darkGray });
    y -= 13;
  }

  y -= 6;

  // Project 2: Countdown Timer
  page1.drawText('Countdown Timer (HTML, CSS, JavaScript)', {
    x: leftMargin + 15,
    y: y,
    size: 10,
    font: fontBold,
    color: black,
  });
  y -= 14;
  const proj2Bullets = [
    'Built a responsive countdown timer with dynamic time updates',
    'Implemented DOM manipulation and event handling',
  ];
  for (const b of proj2Bullets) {
    page1.drawText(b, { x: leftMargin + 15, y: y, size: 9.5, font: fontRegular, color: darkGray });
    y -= 13;
  }

  y -= 6;

  // Project 3: Background Generator
  page1.drawText('•  BACKGROUND GENERATOR Using HTML, CSS', {
    x: leftMargin,
    y: y,
    size: 10,
    font: fontBold,
    color: black,
  });
  y -= 14;
  const proj3Bullets = [
    'Designed a UI tool to generate gradient backgrounds dynamically',
    'Improved understanding of CSS styling and user interaction',
  ];
  for (const b of proj3Bullets) {
    page1.drawText(b, { x: leftMargin + 15, y: y, size: 9.5, font: fontRegular, color: darkGray });
    y -= 13;
  }

  // =============================================================
  // PAGE 2
  // =============================================================
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
  y = pageHeight - 50;

  // SKILLS
  y = drawSectionHeader(page2, 'SKILLS', y);

  const skillsList = [
    { label: 'Programming Languages:', val: 'Python, Java, C' },
    { label: 'Web Technologies:', val: 'HTML5, CSS3, JavaScript' },
    { label: 'AI/ML Tools:', val: 'TensorFlow, NumPy, OpenCV' },
    { label: 'Tools:', val: 'Git, VS Code, Generative AI Tools (ChatGPT, Claude)' },
    { label: 'Other Skills:', val: 'Problem Solving, Data Analysis' },
  ];

  for (const s of skillsList) {
    page2.drawText(s.label, {
      x: leftMargin,
      y: y,
      size: 9.5,
      font: fontBold,
      color: black,
    });
    const labelWidth = fontBold.widthOfTextAtSize(s.label, 9.5);
    page2.drawText(s.val, {
      x: leftMargin + labelWidth + 6,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: darkGray,
    });
    y -= 16;
  }

  y -= 16;

  // CERTIFICATIONS
  y = drawSectionHeader(page2, 'CERTIFICATIONS', y);

  // Cert 1
  page2.drawText('Tata Data Visualization - Forage (May 2025)', {
    x: leftMargin,
    y: y,
    size: 10,
    font: fontBold,
    color: black,
  });
  y -= 14;
  page2.drawText('•  Created dashboards and visual insights for business decision-making', {
    x: leftMargin + 10,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });
  y -= 18;

  // Cert 2
  page2.drawText('GenAI for Professionals - Udemy (May 2025)', {
    x: leftMargin,
    y: y,
    size: 10,
    font: fontBold,
    color: black,
  });
  y -= 14;
  page2.drawText('•  Learned prompt engineering and real-world AI applications', {
    x: leftMargin + 10,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });
  y -= 18;

  // Cert 3
  page2.drawText('Introduction to Modern AI - Cisco (May 2025)', {
    x: leftMargin,
    y: y,
    size: 10,
    font: fontBold,
    color: black,
  });
  y -= 14;
  page2.drawText('•  Explored AI concepts including chatbots and computer vision', {
    x: leftMargin + 10,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });

  // Save PDF
  const pdfBytes = await pdfDoc.save();

  const publicDest = path.resolve('public', 'resume.pdf');
  const distDest = path.resolve('dist', 'resume.pdf');

  fs.writeFileSync(publicDest, pdfBytes);
  console.log(`Saved resume PDF to ${publicDest}`);

  if (fs.existsSync('dist')) {
    fs.writeFileSync(distDest, pdfBytes);
    console.log(`Saved resume PDF to ${distDest}`);
  }
}

generateResumePdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
