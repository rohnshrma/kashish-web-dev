import mongoose from 'mongoose'

const connectDB = async ()=>{
    try{
        const mongoUri = process.env.MONGO_URI;
        const conn = await mongoose.connect(mongoUri)
        console.log("Connect to bd", conn.connection.host);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;
