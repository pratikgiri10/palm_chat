import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    }
    const handleSubmit = () => {
        const newErrors = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

        if (!formData.name.trim())
            newErrors.name = 'name is required'

        if (!formData.email.trim())
            newErrors.email = 'email is required'

        if (!formData.password)
            newErrors.password = 'password is required'
        else if (formData.password.length < 8)
            newErrors.password = 'password must be atleast 8 character long'

        if (!formData.confirmPassword)
            newErrors.confirmPassword = 'please confirm your password'
        else if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'passwords do not match'

        setErrors(newErrors)


        const registerUser = async () => {
            const user = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`, { ...formData })
            console.log(user);

        }
        registerUser()

    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="John Doe"
                        />
                        {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} `}
                            placeholder="••••••••"
                        />
                        {errors.confirmPassword && <span className="text-sm text-red-500">{errors.confirmPassword}</span>}
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
                    >
                        Register
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Already have an account?
                        <button
                            onClick={() => {
                                navigate('/signin')
                            }}
                            className="text-blue-600 font-semibold ml-1 hover:underline"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register