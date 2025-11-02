import { Route, Routes } from "react-router"
import LandingPage from "./components/LandingPage"
import Chat from "./components/Chat"
import Register from "./components/Register"
import Signin from "./components/Signin"

function App() {


  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>

  )
}

export default App
