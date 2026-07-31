import express from 'express'
import {postRegister,postLogin,logoutUser, isLogin} from '../controller/mainController.js'

import { userGetCategory, userGetProduct, userGetProductDetail } from '../controller/userController.js'
import { getProductsByCategory } from '../controller/adminController.js'

const router = express.Router()

////////////// main register & login //////////////
router.delete('/logout',logoutUser)
router.get('/isLogin',isLogin)
router.get('/products',userGetProduct)
router.get('/products/:id',userGetProductDetail)
router.get('/category',userGetCategory)
router.get("/category/:id" , getProductsByCategory );
router.post('/signup',postRegister)
router.post('/login',postLogin)
// router.post('/logout',logoutUser)
router.get("/test",(req,res) =>{
    res.json("working   ")
})





export default router;
