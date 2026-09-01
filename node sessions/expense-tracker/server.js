import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import expenseRouter from "./routes/expense.js";

config();

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// routes
app.use("/", expenseRouter);

app.listen(PORT, () => console.log("Server started on PORT:", PORT));
