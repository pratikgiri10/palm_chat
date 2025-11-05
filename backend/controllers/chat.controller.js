import Room from "../models/room.model.js"
import { ApiError } from "../utils/ApiError.js"

export const createRoom = async (req, res) => {
    try {
        const { name, createdBy, members } = req.body
        console.log(req.body);

        if ([name, createdBy, members].some((field) => field?.trim() === ''))
            throw new ApiError(400, "this field is required")

        const room = await Room.findOne({ name })
        if (room)
            throw new ApiError(400, 'this group name already exists')


        const userId = req.user._id
        console.log(userId);


        const allMembers = members.includes(userId) ? members : [...members, userId]

        // const room = await Room.create({
        //     name,
        //     createdBy,
        //     members: allMembers
        // })

        // res.status(201).json({
        //     room,
        //     message: 'room created successfully'
        // })
    } catch (error) {
        next(error)
    }
}