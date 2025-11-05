import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true

    },
    description:{
       type:String,
       require:true
    },
    price:{
        type:Number,
        require:true,
        min:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"categories",
        require:true

    },
     image:{
        type:String,
        require:true
    }
},{timestamps:true})
   


const products = mongoose.model("products",productSchema)
export default products