import express from 'express'
import { getUsers } from '../controllers/userController.js'
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

router.get('/getUsers',protectRoute, getUsers)


export default router