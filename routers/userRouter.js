import express from 'express'
import {userGetProduct,userGetProductDetail,userGetCategory,postCart, putCart,deleteCart,getCart,postOrders,getOrder,specificOrder} from '../controller/userController.js'
import { isUser } from '../middleware/auth.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'
import { logoutUser } from '../controller/mainController.js'
dotenv.config()

const userRouter = express.Router()


userRouter.use(session({
    secret : process.env.SECRET_KEY,
    resave : false ,
    saveUninitialized : false ,
    store : MongoStore.create({
        mongoUrl : process.env.MONGO_URI,
        collectionName : "sessions",
    })
  }))


userRouter.use(isUser)
// userRouter.get('/products',userGetProduct)
// userRouter.get('/products/:id',userGetProductDetail)

// userRouter.get('/category',userGetCategory)
// userRouter.delete('/logout',logoutUser)
userRouter.get('/cart',getCart)
userRouter.post('/user/cart',postCart)
userRouter.put('/cart/:id',putCart)
userRouter.delete('/cart/:id',deleteCart)

userRouter.post('/orders',postOrders)
userRouter.get('/orders',getOrder)
userRouter.get('/orders/:id',specificOrder)

export default userRouter
