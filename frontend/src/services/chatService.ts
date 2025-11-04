
import type { Chat } from "../types/chat"
import { socket } from "../utils/socketConnection"

export const sendMessage = (chat: Chat) => {
    console.log(socket);
    console.log(chat);
    socket.emit('sendMessage', () => {

    })

}
export const receiveMessage = () => {
    socket.on('receiveMessage', () => {

    })
}