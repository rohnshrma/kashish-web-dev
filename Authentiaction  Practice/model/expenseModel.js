import mongoose from 'mongoose'

const expenseSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "enter your expense tile"]
    },
    amount: {
        type: Number,
        required: [true, "enter your expense amount"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const expenseModel = mongoose.model('expense', expenseSchema);
export default expenseModel;