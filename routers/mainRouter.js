import express from 'express'
import {postRegister,postLogin,logoutUser} from '../controller/mainController.js'
const router = express.Router()

////////////// main register & login //////////////

router.post('/signup',postRegister)
router.post('/login',postLogin)
router.post('/logout',logoutUser)





export default router;