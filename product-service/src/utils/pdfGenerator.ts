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
  const sanitizedProductName = productName.replace(/\s+/g, "_");
  const filePath = path.join(
    uploadsDir,
    `${sanitizedProductName}_quotation.pdf`
  );

  // Create PDF document
  const doc = new PDFDocument({ margin: 50 });
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Add a logo (Optional, you can add your logo here if needed)
  // doc.image("", 50, 45, { width: 50 });

  // Header Section
  doc
    .fontSize(24)
    .font("Helvetica-Bold")
    .text("Billing Inc", { align: "center" })
    .fontSize(12)
    .font("Helvetica")
    .text("Times Square", { align: "center" })
    .text("Sindhu Bhawan Road", { align: "center" })
    .moveDown(2);

  // Horizontal Line
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown(1);

  // Quotation Details Section (Centered)
  // Title Section
  doc
    .fontSize(18)
    .font("Helvetica-Bold")
    .text("Quotation Details", { align: "center" });
  // Horizontal Line
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown(1);

  const tableTop = doc.y;

  // Table content
  const table = [
    ["Product Name:", productName],
    ["Base Price:", `$${price.toFixed(2)}`],
    ["Colors:", colors.join(", ")],
    ["Mount:", mount.join(", ")],
    ["Materials:", materials.join(", ")],
    ["Final Price:", `$${finalPrice.toFixed(2)}`],
  ];

  doc.font("Helvetica").fontSize(12);
  table.forEach(([key, value]) => {
    doc
      .font("Helvetica-Bold")
      .text(key, { continued: true })
      .font("Helvetica")
      .text(value, { align: "right" })
      .moveDown(0.5);
  });

  // Add another separator line
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown(1);

  // Footer Section (Centered)
  doc
    .fontSize(14)
    .fillColor("gray")
    .text("Thank you for your business!", { align: "center" })
    .moveDown(1);

  // Footer Contact Information (Centered)
  doc
    .fontSize(10)
    .text("For inquiries, contact: contact@billing.com", { align: "center" })
    .moveDown(0.7)
    .text("Times Square | Sindhu Bhawan Road", {
      align: "center",
    })
    .moveDown(1);

  // Optional Disclaimer in Footer (if needed for professionalism)
  doc
    .fontSize(8)
    .text("This receipt is a formal document. All sales are final.", {
      align: "center",
    });

  // Finalize and save the PDF
  doc.end();

  return filePath;
};
