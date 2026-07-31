import express from 'express'
import {postCart, putCart,deleteCart,getCart,postOrders,getOrder,specificOrder} from '../controller/userController.js'
import { isUser } from '../middleware/auth.js'

const userRouter = express.Router()


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
