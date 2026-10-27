import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log("Server Started on port ", PORT));
};

startServer();
