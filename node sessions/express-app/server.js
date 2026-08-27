import express from "express";
import connectDB from "./config/db.js";

const app = express()
const PORT = 3001

connectDB()


app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))


// routes
// root /  route  home

app.get("/" , (req,res)=>{
    res.sendFile(process.cwd() + "/pages/home.html")
})
app.route("/contact") .get((req,res)=>{
    res.sendFile(process.cwd() + "/pages/contact.html")
}).post((req,res)=>{
    console.log(req.body)
    res.send("form submitted " + req.body.name)
})



app.listen(PORT ,  ()=> console.log("Server started on port ", PORT))
