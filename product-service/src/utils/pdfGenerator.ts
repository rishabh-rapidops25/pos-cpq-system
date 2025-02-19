import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generatePDF = ({
  productName,
  price,
  finalPrice,
  colors,
  mount,
  materials,
}: {
  productName: string;
  price: number;
  finalPrice: number;
  colors: string[];
  mount: string[];
  materials: string[];
}): string => {
  // Define the uploads folder path
  const uploadsDir = path.join(__dirname, "../../uploads");

  // Ensure the uploads folder exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Generate a valid filename
  const sanitizedProductName = productName.replace(/\s+/g, "_"); // Replace spaces with underscores
  const filePath = path.join(
    uploadsDir,
    `${sanitizedProductName}_quotation.pdf`
  );

  // Create PDF document
  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc
    .fontSize(24)
    .text("Product Quotation", { align: "center", underline: false });
  doc.moveDown(1);

  // Add a border for a professional look
  doc.rect(50, 100, 500, 40).stroke(); // Rectangle border for the header
  doc.moveTo(50, 140).lineTo(550, 140).stroke(); // Line below header

  // Define a header style
  doc.fontSize(16).fillColor("blue");
  doc.text("Quotation Details", { align: "left" });
  doc.moveDown();

  // Reset text style for details
  doc.fontSize(12).fillColor("black");
  doc.text(`Product Name: ${productName}`);
  doc.text(`Base Price: $${price.toFixed(2)}`);
  doc.text(`Colors: ${colors.join(", ")}`);
  doc.text(`Mount: ${mount.join(", ")}`);
  doc.text(`Materials: ${materials.join(", ")}`);
  doc.text(`Final Price: $${finalPrice.toFixed(2)}`);

  // Add a footer
  doc.moveDown(2);
  doc.fillColor("gray");
  doc.text("Thank you for your business!", { align: "center" });
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Line above footer

  // Finalize and save the PDF
  doc.end();
  return filePath;
};
