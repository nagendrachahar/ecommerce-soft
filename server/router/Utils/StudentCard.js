
var fs = require('fs');
const PDFDocument = require('pdfkit');

const Card = (studentCardDetail) => {
    const doc = new PDFDocument({size: [300,220]});

    doc.pipe(fs.createWriteStream('client/wwwroot/Students/Icard/output.pdf'));

    doc.fontSize(20).fillColor('blue').text('RSAS Public Schooll', 0,10, {align: 'center',width: 300 });

    doc.image(`client/wwwroot/Students/ProfilePhoto/${student["photoPath"]}`,10, 50, {
        fit: [100, 150],
        align: 'center',
        valign: 'top'
    });

    doc.fontSize(12).fillColor('black')
    .text(`Name : ${studentCardDetail.studentName}`, 120, 50, {align: 'left', width: 200,});
    doc.fontSize(12)
    .text(`ID : ${studentCardDetail.studentCode}`, 120, 70, {align: 'left', width: 200,});
    doc.fontSize(12)
    .text(`Father Name : ${studentCardDetail.parentId.fatherName}`, 120, 90, {align: 'left', width: 200,});
    doc.fontSize(12)
    .text(`Mother Name : ${studentCardDetail.parentId.motherName}`, 120, 110, {align: 'left', width: 200,});
    doc.fontSize(12)
    .text(`Class : ${studentCardDetail.classId.className}`, 120, 130, {align: 'left', width: 200,});

    doc.end();
}

module.exports = Card;
