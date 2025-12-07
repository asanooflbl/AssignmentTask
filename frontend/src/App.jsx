import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import { useAppContext } from './Context/Authcontext';

function App() {
const { token } = useAppContext();
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={token ? <Navigate to="/dashboard"/> : <Navigate to="/login"/>}/>
        <Route path='/login' element={!token ? <Login/> : <Navigate to="/dashboard"/>}/>
        <Route path='/signup' element={!token ? <Signup/> : <Navigate to="/dashboard"/>}/>
        <Route path='/dashboard' element={token ? <Dashboard/> : <Navigate to ="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App