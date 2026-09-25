import express from 'express'
import expenseModel from '../model/expenseModel.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const expenseRoute = express.Router();

expenseRoute.post('/', async (req, res)=>{
    
    const  { title,  amount } = req.body;
    
    if(!title){
        return res.status(400).json({
            success: false,
            message: "Title is required"
        })
    }

    if(amount === undefined || amount === null){
        return res.status(400).json({
            success: false,
            message: "Amount is required"
        });
    }

    if(amount <=  0){
        return res.status(400).json({
            success: false,
            message: "Amount must be greater than 0"
        });
    }
    
    const userId = req.user.id
    console.log(title, amount, userId);

    const expense = await  expenseModel.create({
        title,
        amount,
        userId
    });

    res.status(201).json({
        success: true,
        message: "Expense created successfully",
        data: expense
    });

});

expenseRoute.get('/all', adminMiddleware, async (req, res) => {

    const expenses = await expenseModel.find();

    res.status(200).json({
        success: true,
        message: "All expenses fetched successfully",
        data: expenses
    });

});

expenseRoute.delete('/:id', async (req, res)=>{
     const expenseId = req.params.id;
    const userId = req.user.id;

    const expense = await expenseModel.findOneAndDelete({
        _id: expenseId,
        userId: userId
    });

    if (!expense) {
        return res.status(404).json({
            success: false,
            message: "Expense not found or you are not authorized to delete it"
        });
    }

    res.status(200).json({
        success: true,
        message: "Expense deleted successfully",
        data: expense
    });

});

expenseRoute.put('/:id', async (req, res) => {

    const expenseId = req.params.id;
    const userId = req.user.id;

    const { title, amount } = req.body;

    const expense = await expenseModel.findOneAndUpdate(
        {
            _id: expenseId,
            userId: userId
        },
        {
            title,
            amount
        },
        {
            new: true
        }
    );

    if (!expense) {
        return res.status(404).json({
            success: false,
            message: "Expense not found or you are not authorized to update it"
        });
    }

    res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: expense
    });
});

export default expenseRoute;