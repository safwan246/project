import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors' // FE
import {connectDBS} from './db/mongoos.js'
import publicRouters from './routers/mainRouter.js'
import adminRouters from './routers/adminRounter.js'
import userRouters from './routers/userRouter.js'
import session from 'express-session'
import MongoStore from "connect-mongo";
import path from 'path'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express()
const FRONTEND_ORIGIN =  'http://localhost:5173';
const port =process.env.PORT || 3000


app.use(session({
    secret : process.env.SECRET_KEY,
    resave : false ,
    saveUninitialized : false ,
    store : MongoStore.create({
        mongoUrl : process.env.MONGO_URI,
        collectionName : "sessions",
    }),
       cookie :{
        secure : false,
        httpOnly : true,
        maxAge : 1000 * 60 * 60 * 24 
    }
  }))



app.use(express.json())
app.use(express.urlencoded({extended:true}))
dotenv.config();
await connectDBS()


// Enable CORS for frontend during development
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
}));

   

app.use('/uploads',express.static(path.join(__dirname,'/uploads')));


app.use('/admin',adminRouters)
app.use('/',publicRouters)
app.use('/',userRouters)







app.listen(port,()=>console.log(`server running on port ${port}`))