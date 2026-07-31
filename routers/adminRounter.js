import express from 'express'
import {postAdminlog,getUsers,getProduct,postProduct,getCategory,postCategory,putCategory,deleteCategory,putProduct,deleteProduct,getAdminOrders,putOrders,deleteOrder, adminUpdateUser, adminLogin} from '../controller/adminController.js'
import { isAdmin } from '../middleware/auth.js'
import upload from "../middleware/multer.js";
const adminrouter = express.Router()

adminrouter.post('/login',postAdminlog)

adminrouter.use(isAdmin)
adminrouter.get('/',adminLogin)
adminrouter.get('/users',getUsers)
adminrouter.put("/users/:id", adminUpdateUser);

adminrouter.get('/products',getProduct)
adminrouter.post('/products',upload.single('image'),postProduct)
adminrouter.put('/products/:id',upload.single('image'),putProduct)
adminrouter.delete('/products/:id',deleteProduct)

adminrouter.get('/categories',getCategory)
adminrouter.post('/categories',upload.single('image'),postCategory)
adminrouter.put('/categories/:id',upload.single('image'),putCategory)
adminrouter.delete('/categories/:id',deleteCategory)

adminrouter.get('/orders',getAdminOrders)
adminrouter.put('/orders/:id',putOrders)
adminrouter.delete('/orders/:id',deleteOrder)




export default adminrouter;
