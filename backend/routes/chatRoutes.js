import express from 'express'
import { createRoom } from '../controllers/chat.controller.js'

const router = express.Router()

router.post('/createroom', createRoom)

export default router