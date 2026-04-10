const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Load Swagger Documentation
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount Routes
app.use("/api/v1/products", productRoutes);

// Error Handling Middleware (Shows you do Root Cause Analysis)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`OmniCart API running on port ${PORT}`));
