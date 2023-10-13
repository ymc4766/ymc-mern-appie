import path from "path";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./config/db.js";
import cors from "cors";
dotenv.config();

import cookieParser from "cookie-parser";

import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import { errorHandler, handleNotFound } from "./middleware/errorHandler.js";
// import globalErrorController from "./middleware/glopalErrorHandler.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const port = process.env.PORT || 5000;

db();
const app = express();

// app.use(express.json());
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

// app.use("/api", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));

  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    // res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use("/*", handleNotFound);
app.use(errorHandler);
// app.use(globalErrorController);

app.listen(port, console.log(`app is running on ${port} port`));
