import { type ReactNode } from 'react'
import { useState } from 'react'
import type { User } from '../types/user'
import UserContext from './UserContext'



const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider