import React from "react"
import type { User } from "../types/user";

type UserContextType = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = React.createContext<UserContextType | undefined>(undefined)

export default UserContext;