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

  // // Add content to PDF
  // doc.fontSize(18).text("Product Quotation", { align: "center" });
  // doc.moveDown();
  // doc.fontSize(12).text(`Product Name: ${productName}`);
  // doc.text(`Base Price: $${price}`);
  // doc.text(`Final Price: $${finalPrice}`);
  // doc.text(`Colors: ${colors.join(", ")}`);
  // doc.text(`Mount: ${mount.join(", ")}`);
  // doc.text(`Materials: ${materials.join(", ")}`);

  // // Finalize and save the PDF
  // doc.end();
  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .fillColor("blue")
    .text("Product Quotation", { align: "center" });
  doc.moveDown(20);

  doc
    .fontSize(18)
    .font("Helvetica-Bold")
    .text("Product Details", { align: "left" });
  doc.moveDown(10);

  doc
    .fontSize(12)
    .font("Helvetica")
    .text(`Product Name: ${productName}`, 50, 150, { width: 500, height: 20 });
  doc.moveDown();
  doc.text(`Base Price: $${price}`, 50, 170, { width: 500, height: 20 });
  doc.moveDown();
  doc.text(`Colors: ${colors.join(", ")}`, 50, 190, { width: 500, height: 20 });
  doc.moveDown();
  doc.text(`Mount: ${mount.join(", ")}`, 50, 210, { width: 500, height: 20 });
  doc.moveDown();
  doc.text(`Materials: ${materials.join(", ")}`, 50, 230, {
    width: 500,
    height: 20,
  });
  doc.moveDown();
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .fillColor("red")
    .text(`Final Price: $${finalPrice}`, 50, 250, { width: 500, height: 25 });

  // Finalize and save the PDF
  doc.end();

  return filePath;
};
