import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const uri = process.env.MONGO_URI;

export async function connectDBS(){

    try{

        await mongoose.connect(uri)
        console.log("db connected");

    }catch(err){
        console.log(err);
        
    }
}
    






