import React, { useState } from 'react'
import axios from 'axios'
import GoogleLoginButton from './GoogleLoginButton'

function Login() {
    const [email,setEmail]=useState('')
    const [otp,setOtp]=useState('')

    const handleEmail=async()=>{
        console.log("emaill==",email);
        try{
            const response=await axios.post('http://127.0.0.1:8000/account/request-otp/',
            { email:email},
            {headers:{'Content-Type':'application/json'}}
            )
        }catch(error){
            console.log("post error");
            
        }
    }
    const handleOtp=async()=>{
        console.log('otp==',otp);
        try {
            const response=await axios.post('http://127.0.0.1:8000/account/verify-otp/',
                {email:email,
                otp:otp},
                { headers: { 'Content-Type': 'application/json' } }
            )
            const {access,refresh}=response.data
            localStorage.setItem('accessToken',access)
            localStorage.setItem('refreshToken',refresh)
            console.log('response==',response);
            
        } catch (error) {
            console.log('invalid otp');
            
        }
        
    }
  return (
    <div>
      <h1>login page</h1>
      <input value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      <button onClick={handleEmail}>send otp</button>
      <input value={otp} onChange={(e)=>setOtp(e.target.value)}></input>
      <button onClick={handleOtp}>verifyotp</button>


     <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Sign In</h2>
      <GoogleLoginButton />
    </div>
    </div>


  )
}

export default Login
