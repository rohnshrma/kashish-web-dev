import { Router } from "express";
import Expense from "../model/Expense.js";

const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const expenses = await Expense.find({});
      console.log(expenses);
      res.render("Home", {
        expenses: expenses,
      });
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  })
  .post(async (req, res) => {
    try {
      const { name } = req.body;

      const newExpense = new Expense({
        name: name,
      });

      await newExpense.save();
      console.log("New Expense Added", newExpense);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  });

export default router;
