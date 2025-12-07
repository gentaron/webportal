import { jsPDF } from "jspdf";

export const generateCertificate = (novelTitle) => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    });

    // Background
    doc.setFillColor(26, 26, 26); // Dark bg
    doc.rect(0, 0, 297, 210, "F");

    // Border
    doc.setDrawColor(255, 126, 179); // Accent Pink/Purple
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Decorative Corner (Simple)
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.rect(15, 15, 267, 180);

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.text("Certificate of Completion", 148.5, 60, { align: "center" });

    // Subtitle
    doc.setFontSize(20);
    doc.setFont("helvetica", "normal");
    doc.text("This certifies that the reader has successfully completed the novel:", 148.5, 90, { align: "center" });

    // Novel Title
    doc.setTextColor(255, 126, 179); // Pink
    doc.setFontSize(36);
    doc.setFont("helvetica", "bold");
    doc.text(novelTitle, 148.5, 120, { align: "center" });

    // Date
    const date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(16);
    doc.setFont("helvetica", "italic");
    doc.text(`Completed on ${date}`, 148.5, 150, { align: "center" });

    // Footer
    doc.setFontSize(14);
    doc.text("Web Novel Portal", 148.5, 180, { align: "center" });

    doc.save(`${novelTitle.replace(/\s+/g, '_')}_Certificate.pdf`);
};
