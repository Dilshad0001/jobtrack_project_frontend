import React from "react";
import GoogleLoginComponent from "./pages/account/GoogleLoginComponent";
import GitHubLoginButton from "./pages/account/GitHubLoginButton";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import GitHubCallback from "./pages/account/GitHubCallback";
import Homepage from "./pages/users/Homepage";
import Login from "./pages/account/Login";
import UserProfile from "./pages/users/UserProfile";
import UserJobList from "./pages/users/UserJobList";
import UserJobFilter from "./pages/users/UserJobFilter";
import UserJobCreate from "./pages/users/UserJobCreate";
import { Layout } from "lucide-react";
import UserSidebar from "./pages/users/UserSidebar";
import UserLayout from "./pages/users/UserLayout";
import UserChat from "./pages/message/UserChat";
import NumberInput from "./pages/message/NumberInput";
import ProfileList from "./pages/message/ProfileList";
import ContactList from "./pages/message/ContactList";
import ChatHomePage from "./pages/message/ChatHomePage";
import Navbar from "./pages/users/Navbar";
import JobDashboard from "./pages/users/JobDashboard";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminUserList from "./pages/Admin/AdminUserList";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ContactListDelete from "./pages/message/ContactListDelete";







function App() {
  return (
    <Router>
      <Routes>
        <Route path="/google" element={
            <div>
              <h2 style={{textAlign: 'center'}}>Google OAuth Login Demo</h2>
              <GoogleLoginComponent/>
            </div>
        }
       />
        <Route path="git" element={
           <div>  
              <h1>github login</h1>
              <GitHubLoginButton/>
              
            </div>
        }
        />    
        
        <Route path="" element={<Login/>}/>

        <Route path="/github-callback" element={<GitHubCallback />} />
        <Route path="/home" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* <Route path="/profile" element={<UserProfile/>}/> */}
        {/* <Route path="/app" element={<UserJobList/>}/> */}
        {/* <Route path="/a" element={<UserJobFilter/>}/> */}
        {/* <Route path="/c" element={<UserJobCreate/>}/> */}
        {/* <Route path="/s" element={<UserSidebar/>}/> */}
   
      <Route path="/user" element={<UserLayout/>}>
        {/* <Route path="" element={<UserJobFilter/>}/> */}
        <Route path="messages" element={<ChatHomePage />} />
        <Route path="track" element={<JobDashboard />} />
        <Route path="" element={<Homepage/>}/>
        <Route path="profile" element={<UserProfile/>}/>

      </Route>

      <Route path="/admin" element={<AdminLayout/>}>
        <Route path="profiles" element={<AdminUserList/>}/>
        <Route path="" element={<AdminDashboard/>}/>
        <Route path="hh" element={<Homepage/>}/>
        <Route path="profile" element={<UserProfile/>}/>

      </Route>


   <Route path="/chat/:id" element={<UserChat />} />
   {/* <Route path="/n" element={<NumberInput />} />
   <Route path="/p" element={<ProfileList />} />
   <Route path="/con" element={<ContactList />} />
   <Route path="/ch" element={<ChatHomePage />} />

   <Route path="/na" element={<Navbar/>}/>

   <Route path="/j" element={<JobDashboard/>}/>
   <Route path="/u" element={<AdminDashboard/>}/>
   <Route path="/d" element={<ContactListDelete/>}/> */}

      </Routes>
    </Router>
  );
}

export default App;


