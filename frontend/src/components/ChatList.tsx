import axios from "axios"
import { useEffect } from "react"

const ChatList = () => {
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users`)
            console.log(users);

        }
        fetchUsers()
    }, [])
    return (
        <div className="h-screen w-1/4 border-r border-gray-500">

        </div>
    )
}

export default ChatList