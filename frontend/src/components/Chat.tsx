import { useEffect, useState } from 'react'
import ChatList from './ChatList'
import ChatRoom from './ChatRoom'
import CreateRoom from './CreateRoom'
import axios from 'axios'

export type User = {
    _id: string;
    name: string;
    email: string;
};

const Chat = () => {
    const [user, setUser] = useState<User[]>([])
    const [showCreateRoom, setShowCreateRoom] = useState<boolean>(false)
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users`)
            console.log(users);
            setUser(users.data.users)

        }
        fetchUsers()
    }, [])
    return (
        <div className='w-full h-screen flex bg-zinc-950'
            onClick={() => setShowCreateRoom(false)}
        >
            <ChatList
                setShowCreateRoom={setShowCreateRoom}
                users={user}
            />
            <ChatRoom />
            {showCreateRoom && (
                <CreateRoom
                    users={user}
                />
            )}
        </div>
    )
}

export default Chat