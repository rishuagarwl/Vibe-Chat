import mongoose from "mongoose";
const connectToMongoDb = async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected successfully");   
    }
    catch(err){
        console.log("error in connecting Db", err.message);
    }
}
export default connectToMongoDb