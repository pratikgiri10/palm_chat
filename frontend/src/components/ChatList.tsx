import { type Dispatch, type SetStateAction } from "react"
import type { User } from "./Chat"


const ChatList = ({
    setShowCreateRoom,
    users
}: {
    setShowCreateRoom: Dispatch<SetStateAction<boolean>>,
    users: User[]
}) => {

    return (
        <div className="h-screen w-1/4 border-r border-gray-500 p-2 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl text-white font-medium">Messages</h1>
                <button
                    className="text-md bg-[#044c69] text-white px-2 py-1 rounded-xl hover:border hover:bg-transparent"
                    onClick={(e) => {
                        setShowCreateRoom(true)
                        e.stopPropagation()
                    }}
                >Create Group</button>
            </div>
            <div>
                {users.length > 0 && users.map(({ _id, name }) => (
                    <div key={_id}
                        className="bg-[#044c69] text-white rounded-xl px-4 py-2 hover:border hover:bg-transparent"
                    >{name}</div>
                ))
                }
            </div>

        </div>
    )
}

export default ChatList