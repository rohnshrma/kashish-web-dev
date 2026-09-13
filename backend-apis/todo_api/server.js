import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import morgan from "morgan";

config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3003;

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => console.log("Server started on PORT :", PORT));
