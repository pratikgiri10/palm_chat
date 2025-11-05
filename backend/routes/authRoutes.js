import express from 'express'
import { logOut, register, signin } from '../controllers/auth.controller.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

const router = express.Router()

router.post('/register', register)
router.post('/signin', signin)
router.get('/logout', isAuthenticated, logOut)

export default router