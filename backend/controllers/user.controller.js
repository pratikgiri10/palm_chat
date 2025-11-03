import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"

export const getAllUsers = async (req, res) => {
    const users = await User.find({}).select({ password: 0 })

    if (!users || (Array.isArray(users) && users.length < 1))
        throw new ApiError(404, 'users not found')

    res.status(200).json({
        users,
        message: 'users found successfully'
    })
}
export const getUserById = async (req, res) => {
    const id = req.user._id
    const user = await User.findOne({ _id: id }, { password: 0 })

    if (!user)
        return new ApiError(401, 'user not found')

    res.status(200).json({
        user,
        message: 'user was found'
    })

}
export const updateUser = async (req, res) => {
    const id = req.params

    const user = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    res.status(200).json({
        user,
        message: 'user updated successfully'
    })

}
export const deleteUser = async (req, res) => {
    await User.deleteOne({ _id: req.params.id })

}