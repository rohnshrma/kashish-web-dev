import mongoose from "mongoose";

// schema
const taskSchema = new mongoose.Schema({
    name : {type : String , required : true, minlength : 3}
}, {
    timestamps : true
})

// model / collection

const Task = mongoose.model("Task" , taskSchema)

export default Task