import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true,

    },
    description:{
        type:String,
        require:true
    }
})

const categories = mongoose.model("categories",categorySchema)
export default categories
