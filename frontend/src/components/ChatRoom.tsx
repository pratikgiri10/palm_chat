import { useEffect, useState } from "react"
import { socket } from "../utils/socketConnection"
import { sendMessage } from "../services/chatService"


const ChatRoom = () => {

    const [input, setInput] = useState('')

    const handleSendMsg = () => {
        const time = new Date()
        const chat = {
            from: 'user1',
            to: 'user2',
            message: input,
            time: time
        }
        sendMessage(chat)
    }

    useEffect(() => {
        socket.connect()
    })
    return (
        <div className="flex-1 flex flex-col justify-end px-4 py-8 gap-6">

            <div>
                <p className="text-white">hi</p>
            </div>

            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full outline-none bg-transparent border border-gray-500 text-md text-white px-4 py-2 rounded-xl"
                    type="text"
                    placeholder="Write a message..."
                />
                <button onClick={handleSendMsg} className="text-md bg-[#044c69] text-white px-4 py-2 rounded-xl">Send</button>
            </div>


        </div>
    )
}

export default ChatRoom