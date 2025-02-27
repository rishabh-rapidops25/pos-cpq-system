import express from "express";

import productRoutes from "./productRoutes";
import categoryRoutes from "./categoryRoutes";
import componentRoutes from "./componentGroupRoutes";
const app = express();

app.use("/products", productRoutes);
app.use("/category", categoryRoutes);
app.use("/component", componentRoutes);

export default app;
