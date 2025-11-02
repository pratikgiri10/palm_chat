import express from 'express'
import { register, signin } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', register)
router.post('/sigin', signin)

export default router