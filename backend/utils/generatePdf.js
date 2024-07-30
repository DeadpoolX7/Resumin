const PDFDocument = require('pdfkit');

const generatePDF = (resume) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50
    });

    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // Add blue stripe
    doc.rect(50, 50, 10, 700).fill('#3B82F6');

    // Set font
    doc.font('Helvetica');

    // Name
    doc.fontSize(24).fillColor('#1F2937').text(resume.name || 'Name not provided', 70, 60);

    // Contact
    doc.fontSize(16).fillColor('#2563EB').text('Contact', 70, 100);
    doc.fontSize(12).fillColor('#4B5563')
      .text(resume.email || '', 70, 125)
      .text(resume.phone || '', 70, 140);

    // About
    doc.fontSize(16).fillColor('#2563EB').text('About', 70, 170);
    doc.fontSize(12).fillColor('#374151').text(resume.about || 'About section not provided', 70, 195, {
      width: 470,
      align: 'justify',
      lineGap: 5
    });

    // Skills
    doc.fontSize(16).fillColor('#2563EB').text('Skills', 70, 300);
    const skills = resume.skills && resume.skills.length > 0
      ? (Array.isArray(resume.skills) ? resume.skills : resume.skills.split(','))
      : ['No skills listed'];

    skills.forEach((skill, index) => {
      doc.fontSize(12).fillColor('#374151').text(`• ${skill.trim()}`, 90, 325 + index * 20);
    });

    doc.end();
  });
};

module.exports = generatePDF;