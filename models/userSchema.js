import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type:String, 
        required:true
    },
    role: {
        type: String,
        eNum: ['user','admin'],
        default :'user'
    },
    status: {
        type: String,
        eNum:['active','inactive'],
        default :'active'
    }


})

const User = mongoose.model("User", userSchema)
export default User; 