import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"

const Signin = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        email: '',
        password: ''
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
    const handleSubmit = async () => {
        const newErrors = {
            email: '',
            password: ''
        };
        if (!formData.email.trim())
            newErrors.email = 'email is required'
        if (!formData.password)
            newErrors.password = 'password is required';

        setErrors(newErrors)

        const user = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/signin`, { ...formData })
        if (user) {
            localStorage.setItem('accessToken', user.data.accessToken)
            localStorage.setItem('refreshToken', user.data.refreshToken)
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Sign In
                </h2>

                <div className="space-y-4">
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

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
                    >
                        Sign In
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?
                        <button
                            onClick={() => {
                                navigate('/register')
                            }}
                            className="text-blue-600 font-semibold ml-1 hover:underline"
                        >
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signin