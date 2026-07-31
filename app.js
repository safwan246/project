import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
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
const port =process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'
const frontendUrl = process.env.FRONTEND_URL

if (!process.env.MONGO_URI || !process.env.SECRET_KEY) {
  throw new Error('MONGO_URI and SECRET_KEY must be configured')
}

await connectDBS()

if (isProduction) {
  app.set('trust proxy', 1)
}

app.use(session({
    secret : process.env.SECRET_KEY,
    resave : false ,
    saveUninitialized : false ,
    store : MongoStore.create({
        mongoUrl : process.env.MONGO_URI,
        collectionName : "sessions",
    }),
       cookie :{
        secure : isProduction,
        httpOnly : true,
        sameSite : isProduction ? 'none' : 'lax',
        maxAge : 1000 * 60 * 60 * 24 
    }
  }))



app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(cors({
  origin(origin, callback) {
    if (!origin || !isProduction || origin === frontendUrl) {
      return callback(null, true)
    }
    return callback(new Error(`Origin ${origin} is not allowed by CORS`))
  },
  credentials: true,
}));

   

app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }))

app.use('/admin',adminRouters)
app.use('/',publicRouters)
app.use('/',userRouters)







app.listen(port,()=>console.log(`server running on port ${port}`))
