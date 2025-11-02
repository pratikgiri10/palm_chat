import { useNavigate } from "react-router";

const LandingPage = () => {
    const navigate = useNavigate()
    const handleEnterChat = () => {
        navigate('/chat')
    };

    const handleSignIn = () => {
        navigate('/signin')
    };

    return (
        <div className="min-h-screen bg-zinc-950">

            <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                <div className="flex items-center space-x-2">
                    <span className="text-white text-2xl font-bold">ChatApp</span>
                </div>
                <button
                    onClick={handleSignIn}
                    className="px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition duration-200 shadow-lg"
                >
                    Sign In
                </button>
            </nav>


            <div className="flex flex-col items-center justify-center px-6 text-center" style={{ height: 'calc(100vh - 72px)' }}>
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Connect with Anyone, Anywhere
                    </h1>
                    <p className="text-xl md:text-2xl text-white text-opacity-90 mb-12 max-w-2xl mx-auto">
                        Experience seamless real-time messaging with friends, family, and teams. Fast, secure, and always connected.
                    </p>

                    <button
                        onClick={handleEnterChat}
                        className="px-8 py-4 bg-white text-black rounded-full text-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition duration-200 shadow-2xl"
                    >
                        Enter Chat Room
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;