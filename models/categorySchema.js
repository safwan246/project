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
    },
    image:{
        type:String,
        require:true
    }
})

const Categories = mongoose.model("Categories",categorySchema)
export default Categories
