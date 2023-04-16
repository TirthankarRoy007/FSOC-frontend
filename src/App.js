import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Component/Login/login"
import Home from "./Component/Home/Home"
import { useEffect } from "react"
import { loadUser, logoutUser } from "./Actions/User"
import Register from "./Component/Register/register"
import ForgotPassword from './Component/ForgotPassword/ForgotPassword';
import ResetPasswordForm from './Component/ResetPassword/resetPassword';
import { useSelector, useDispatch } from "react-redux"
import ProjectForm from './Component/createProject/createProject';
import ProjectsList from './Component/getProject/getProject'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  const { isAuthenticated } = useSelector((state) => state.user)
  const { isRegistered } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
  
    // Clear the 'myCookie' cookie
    document.cookie = 'myCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=;';
  
    return <Navigate to="/login" />
  }
  


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={isRegistered || isAuthenticated ? <Navigate to="/home" /> : <Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={(<ResetPasswordForm />)} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/createProject" element={isAuthenticated ? <ProjectForm /> : <Navigate to="/login" />} />
        <Route path="/getProject" element={isAuthenticated ? <ProjectsList /> : <Navigate to="/login" />} />
        <Route path="/logout" element={isAuthenticated ? <button onClick={handleLogout}>Logout</button> : <Navigate to = "/login"/>} />
      </Routes>
    </Router>
  )
}

export default App;
