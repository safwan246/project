import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                require: true
            },


            quantity: {
                type: Number,
                min: 0,
                default: 0,
                require: true
            },
            price: {
                type: Number,
                require: true,
                min: 0,
                default: 0
            },
        }
    ],
    totalAmount: {
        type: Number,
        require: true,
        default: 0,
        min: 0

    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, { timestamps: true })

const cart = mongoose.model("cart", cartSchema)
export default cart