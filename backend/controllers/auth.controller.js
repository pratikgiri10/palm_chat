import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"

export const register = async (req, res) => {
    const { name, email, password } = req.body

    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, 'please fill all the fields')

    }

    const existingUser = await User.findOne({ email })

    if (existingUser)
        throw new ApiError(409, 'user already exists')
    const user = await User.create({
        name,
        email,
        password
    })

    return res.status(201).json({
        message: 'user created successfully',
        user
    })
}

export const signin = async (req, res) => {

}