import express from 'express'
import { login, logout, signUp } from '../controllers/authController.js'

const router = express.Router()

router.post('/signUp', signUp)
router.post('/login', login)
router.post('/logOut', logout)


export default router