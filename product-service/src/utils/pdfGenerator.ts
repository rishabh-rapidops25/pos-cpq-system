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

  // Add content to PDF
  doc.fontSize(18).text("Product Quotation", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Product Name: ${productName}`);
  doc.text(`Base Price: $${price}`);
  doc.text(`Final Price: $${finalPrice}`);
  doc.text(`Colors: ${colors.join(", ")}`);
  doc.text(`Mount: ${mount.join(", ")}`);
  doc.text(`Materials: ${materials.join(", ")}`);

  // Finalize and save the PDF
  doc.end();

  return filePath;
};
