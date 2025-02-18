import PDFDocument from "pdfkit";
import fs from "fs";

export const generatePDF = ({
  productName,
  basePrice,
  finalPrice,
  colors,
  mount,
  materials,
}: {
  productName: string;
  basePrice: number;
  finalPrice: number;
  colors: string[];
  mount: string[];
  materials: string[];
}): string => {
  const doc = new PDFDocument();

  // Create the document in a memory stream (e.g., base64 or file path)
  const filePath = `./quotations/${productName.replace(
    /\s/g,
    "_"
  )}_quotation.pdf`;
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Add content to PDF
  doc.fontSize(18).text("Product Quotation", { align: "center" });
  doc.fontSize(12).text(`Product Name: ${productName}`);
  doc.text(`Base Price: $${basePrice}`);
  doc.text(`Final Price: $${finalPrice}`);
  doc.text(`Colors: ${colors.join(", ")}`);
  doc.text(`Mount: ${mount.join(", ")}`);
  doc.text(`Materials: ${materials.join(", ")}`);

  // End the PDF and close the stream
  doc.end();

  // Return file path (can be returned as base64 or other formats if needed)
  return filePath;
};
