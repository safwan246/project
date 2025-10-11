import express from 'express'
import dotenv from 'dotenv'
import {connectDBS} from './db/mongoos.js'
import publicRouters from './routers/mainRouter.js'
import adminRouters from './routers/adminRounter.js'
import userRouters from './routers/userRouter.js'
import session from 'express-session'
import MongoStore from "connect-mongo";

const app = express()
const port =process.env.PORT || 3000


app.use(session({
    secret : process.env.SECRET_KEY,
    resave : false ,
    saveUninitialized : false ,
    store : MongoStore.create({
        mongoUrl : process.env.MONGO_URI,
        collectionName : "sessions",
    })
  }))



app.use(express.json())
app.use(express.urlencoded({extended:true}))
dotenv.config();
await connectDBS()

   



app.use('/admin',adminRouters)
app.use('/',publicRouters)
app.use('/',userRouters)







app.listen(port,()=>console.log(`server running on port ${port}`))