
// import React from "react";
// import GoogleLoginComponent from "./pages/account/GoogleLoginComponent";
// import GitHubLoginButton from "./pages/account/GitHubLoginButton";
// import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

// function App() {
//   return (
//     <Router>
//       <Routes>
//     <div>
//       <h2 style={{textAlign: 'center'}}>Google OAuth Login Demo</h2>
//       <GoogleLoginComponent/>
//       <h1>github login</h1>
//       <GitHubLoginButton/>
//       <Route path="/github-callback" element={<GitHubCallback />} />
//     </div>
//       </Routes>
//     </Router>
//   );
// }

// export default App;







import React from "react";
// import './style.css'
import GoogleLoginComponent from "./pages/account/GoogleLoginComponent";
import GitHubLoginButton from "./pages/account/GitHubLoginButton";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import GitHubCallback from "./pages/account/GitHubCallback";
import Homepage from "./pages/users/Homepage";
import Login from "./pages/account/Login";
import UserProfile from "./pages/users/UserProfile";


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path=""
          element={
            <div>
              <h2 style={{textAlign: 'center'}}>Google OAuth Login Demo</h2>
              <GoogleLoginComponent/>
            </div>
        }
       />
        <Route
        path="git"
        element={
           <div>  
              <h1>github login</h1>
              <GitHubLoginButton/>
              
            </div>
        }
        />    
        <Route path="/github-callback" element={<GitHubCallback />} />
        <Route path="/home" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;








// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import Login from './pages/account/Login'
// import GoogleLoginButton from './pages/account/GoogleLoginButton'
// import Dashboard from './pages/account/Dashboard'
// import GoogleLoginBtn from './pages/account/GoogleLoginBtn'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <BrowserRouter>
//       <Routes>
//         <Route path="k" element={<Login/>}/>
//         <Route path="" element={<GoogleLoginButton/>}/>
//         <Route path="dashboard" element={<Dashboard/>}/>
//       </Routes>
//     </BrowserRouter>
    
//     </>
//   )
// }

// export default App
