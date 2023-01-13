const express = require("express");
const path = require("path");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const adminRoutes = require("./routes/admin/adminAuth");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

// Environment variables
env.config();
const port = process.env.PORT || 5000;
const user = process.env.MONGO_DB_USER;
const password = process.env.MONGO_DB_PASSWORD;

// MongoDB Connection
mongoose.set("strictQuery", false);

const url = `mongodb://${user}:${password}@ac-y3i3wez-shard-00-00.lmiozka.mongodb.net:27017,ac-y3i3wez-shard-00-01.lmiozka.mongodb.net:27017,ac-y3i3wez-shard-00-02.lmiozka.mongodb.net:27017/?ssl=true&replicaSet=atlas-8su3xh-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"));

app.use(cors());
app.use(express.json());
// Static files
app.use("/public", express.static(path.join(__dirname, "uploads")));

// User routes
app.use("/api", authRoutes);
// Admin routes
app.use("/api", adminRoutes);
// Category routes
app.use("/api/category", categoryRoutes);
// Product routes
app.use("/api/product", productRoutes);
// Cart routes
app.use("/api/user/cart", cartRoutes);

// Starting Server
app.listen(port, console.log(`Server listening on http://localhost:${port}`));
