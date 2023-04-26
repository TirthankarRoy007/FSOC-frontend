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
import UpdateProjectForm from './Component/updateProject/updateProject';
import DeleteProject from './Component/deleteProject/deleteProject';
import AddMemberForm from './Component/addMember/addMember';
import RemoveMemberForm from './Component/removeMember/removeMember';
import TicketForm from './Component/createTicket/createTicket';
import TicketList from './Component/getTickets/getTickets';
import UpdateTicket from './Component/updateTicket/updateTicket';
import DeleteTicket from './Component/deleteTicket/deleteTicket';

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
        <Route path = "/me" element = {<Navigate to ="/home"/>}/>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={isRegistered || isAuthenticated ? <Navigate to="/home" /> : <Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={(<ResetPasswordForm />)} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/createProject" element={isAuthenticated ? <ProjectForm /> : <Navigate to="/home" />} />
        <Route path="/getProject" element={isAuthenticated ? <ProjectsList /> : <Navigate to="/home" />} />
        <Route path="/updateProject/:projectId" element={isAuthenticated ? <UpdateProjectForm/> : <Navigate to = "/login"/>} />
        <Route path="/deleteProject/:projectId" element={isAuthenticated ? <DeleteProject/> : <Navigate to = "/login"/>} />
        <Route path="/addMember/:projectId" element={isAuthenticated ? <AddMemberForm/> : <Navigate to = "/login"/>} />
        <Route path="/removeMember/:projectId" element={isAuthenticated ? <RemoveMemberForm/> : <Navigate to = "/login"/>} />
        <Route path = "/createTicket/:projectId" element={isAuthenticated ? <TicketForm/> : <Navigate to ="/login"/>}/>
        <Route path = "/getTickets/:projectId" element={isAuthenticated ? <TicketList/> : <Navigate to ="/login"/>}/>
        <Route path = "/updateTicket/:ticketId/:projectId" element = {isAuthenticated ? <UpdateTicket/> : <Navigate to = "/login"/>} />
        <Route path = "/deleteTicket/:projectId/:ticketId" element = {isAuthenticated ? <DeleteTicket/> : <Navigate to = "/login" />} />
        <Route path="/logout" element={isAuthenticated ? <button onClick={handleLogout}>Logout</button> : <Navigate to = "/login"/>} />
      </Routes>
    </Router>
  )
}

export default App;
