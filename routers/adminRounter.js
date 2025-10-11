import express from 'express'
import {postAdminlog,getUsers,getProduct,postProduct,getCategory,postCategory,putCategory,deleteCategory,putProduct,deleteProduct,getAdminOrders,putOrders,deleteOrder} from '../controller/adminController.js'
import { isAdmin } from '../middleware/auth.js'
const adminrouter = express.Router()

adminrouter.post('/login',postAdminlog)
adminrouter.use(isAdmin)
adminrouter.get('/users',getUsers)

adminrouter.get('/products',getProduct)
adminrouter.post('/products',postProduct)
adminrouter.put('/products/:id',putProduct)
adminrouter.delete('/products/:id',deleteProduct)

adminrouter.get('/categories',getCategory)
adminrouter.post('/categories',postCategory)
adminrouter.put('/categories/:id',putCategory)
adminrouter.delete('/categories/:id',deleteCategory)

adminrouter.get('/orders',getAdminOrders)
adminrouter.put('/orders/:id',putOrders)
adminrouter.delete('/orders/:id',deleteOrder)




export default adminrouter;