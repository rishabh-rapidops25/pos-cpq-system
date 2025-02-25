import express from "express";

import productRoutes from "./productRoutes";
import categoryRoutes from "./categoryRoutes";

const app = express();

app.use("/products", productRoutes);
app.use("/category", categoryRoutes);

export default app;
