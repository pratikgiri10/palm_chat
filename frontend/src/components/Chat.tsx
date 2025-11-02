import ChatList from './ChatList'
import ChatRoom from './ChatRoom'

const Chat = () => {
    return (
        <div className='w-full h-screen flex bg-zinc-950'>
            <ChatList />
            <ChatRoom />
        </div>
    )
}

export default Chat