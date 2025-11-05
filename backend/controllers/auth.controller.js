import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from 'jsonwebtoken'
const generateToken = async (userId) => {
    try {
        const user = await User.findOne({ _id: userId })
        const accessToken = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })

        const refreshToken = jwt.sign({
            id: user._id,
        },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )

        return { accessToken, refreshToken }
    } catch (error) {
        next(error)
    }
}

export const register = async (req, res) => {

    const { name, email, password } = req.body


    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, 'please fill all the fields')

    }

    try {
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

    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password)
        throw new ApiError(400, "please fill all the fields")

    try {
        const user = await User.findOne({ email })

        if (!user)
            throw new ApiError(404, 'user not found')

        const isMatch = user.comparePassword(password)

        if (!isMatch)
            throw new ApiError(401, "invalid user credentials")
        const { accessToken, refreshToken } = await generateToken(user._id)

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        }

        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json({
            user,
            accessToken,
            refreshToken,
            message: 'user logged in successfully'
        })
    } catch (error) {
        next(error)
    }
}
export const logOut = async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    }
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json({
        message: 'User logged out successfully'
    })
}