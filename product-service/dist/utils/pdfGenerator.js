"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generatePDF = ({ productName, price, finalPrice, colors, mount, materials, }) => {
    // Define the uploads folder path
    const uploadsDir = path_1.default.join(__dirname, "../../uploads");
    // Ensure the uploads folder exists
    if (!fs_1.default.existsSync(uploadsDir)) {
        fs_1.default.mkdirSync(uploadsDir, { recursive: true });
    }
    // Generate a valid filename
    const sanitizedProductName = productName.replace(/\s+/g, "_"); // Replace spaces with underscores
    const filePath = path_1.default.join(uploadsDir, `${sanitizedProductName}_quotation.pdf`);
    // Create PDF document
    const doc = new pdfkit_1.default();
    const writeStream = fs_1.default.createWriteStream(filePath);
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
exports.generatePDF = generatePDF;
