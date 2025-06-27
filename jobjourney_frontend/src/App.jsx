import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/account/Login'
import GoogleLoginButton from './pages/account/GoogleLoginButton'
import Dashboard from './pages/account/Dashboard'
import GoogleLoginBtn from './pages/account/GoogleLoginBtn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="k" element={<Login/>}/>
        <Route path="" element={<GoogleLoginBtn/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
