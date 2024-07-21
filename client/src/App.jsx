import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/Register/Register"
import './App.css'
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useAuthContext } from "./context/authContext"

function App() {
  const {authUser} = useAuthContext();
  return (
    <div>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login'  element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Register />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
