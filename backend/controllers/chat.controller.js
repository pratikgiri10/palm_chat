import Room from "../models/room.model"
import { ApiError } from "../utils/ApiError"

export const createRoom = async (req, res) => {
    try {
        const { name, createdBy, members } = req.body
        if ([name, createdBy, members].some((field) => field?.trim() === ''))
            throw new ApiError(400, "this field is required")

        const userId = req.user._id

        const allMembers = members.includes(userId) ? members : [...members, userId]

        const room = await Room.create({
            name,
            createdBy,
            members: allMembers
        })

        res.status(201).json({
            room,
            message: 'room created successfully'
        })
    } catch (error) {
        next(error)
    }
}