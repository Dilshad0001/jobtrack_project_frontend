// import React, { useState } from 'react'
// import axios from 'axios'
// import GoogleLoginComponent from './GoogleLoginComponent'
// import GitHubLoginButton from './GitHubLoginButton'
// // import GoogleLoginButton from './GoogleLoginButton'

// function Login() {
//     const [email,setEmail]=useState('')
//     const [otp,setOtp]=useState('')

//     const handleEmail=async()=>{
//         console.log("emaill==",email);
//         try{
//             const response=await axios.post('http://127.0.0.1:8000/api/auth/request-otp/',
//             { email:email},
//             {headers:{'Content-Type':'application/json'}}
//             )
//         }catch(error){
//             console.log("post error");
            
//         }
//     }
//     const handleOtp=async()=>{
//         console.log('otp==',otp);
//         try {
//             const response=await axios.post('http://127.0.0.1:8000/api/auth/verify-otp/',
//                 {email:email,
//                 otp:otp},
//                 { headers: { 'Content-Type': 'application/json' } }
//             )
//             const {access,refresh}=response.data
//             localStorage.setItem('accessToken',access)
//             localStorage.setItem('refreshToken',refresh)
//             console.log('response==',response);
            
//         } catch (error) {
//             console.log('invalid otp');
            
//         }
        
//     }
//   return (
//     <div>
//       <h1>login page</h1>
//       <input value={email} onChange={(e)=>setEmail(e.target.value)}></input>
//       <button onClick={handleEmail}>send otp</button>
//       <input value={otp} onChange={(e)=>setOtp(e.target.value)}></input>
//       <button onClick={handleOtp}>verifyotp</button>


//      <div style={{ textAlign: "center", marginTop: "100px" }}>
//       {/* <GoogleLoginButton /> */}
//       <GoogleLoginComponent/>
//       <GitHubLoginButton/>
//     </div>
//     </div>


//   )
// }

// export default Login



import React, { useState } from 'react'
import axios from 'axios'
import GoogleLoginComponent from './GoogleLoginComponent'
import GitHubLoginButton from './GitHubLoginButton'
import { useNavigate } from 'react-router-dom'
// import GoogleLoginButton from './GoogleLoginButton'

function Login() {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [showOtpField, setShowOtpField] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otpLoading, setOtpLoading] = useState(false)
    const navigate=useNavigate()

    const handleEmail = async () => {
        console.log("emaill==", email);
        setLoading(true)
        try {
            console.log('11');
            
            const response = await axios.post('http://127.0.0.1:8000/api/auth/request-otp/',
                { email: email },
                { headers: { 'Content-Type': 'application/json' } }
            )
            setShowOtpField(true)
            console.log('222==',response);
            
            // navigate('/home')
        } catch (error) {
            console.log("post error");
        } finally {
            setLoading(false)
            
        }
    }

    const handleOtp = async () => {
        console.log('otp==', otp);
        setOtpLoading(true)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/verify-otp/',
                {
                    email: email,
                    otp: otp
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            const { access, refresh } = response.data
            localStorage.setItem('accessToken', access)
            localStorage.setItem('refreshToken', refresh)
            console.log('response==', response);
            navigate('/profile')
        } catch (error) {
            console.log('invalid otp');
        } finally {
            setOtpLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 rounded-4xl">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">

                {/* Login Header */}
                <h2 className="text-2xl tracking-tight text-gray-900 mb-8">
                    Let’s make your job hunt effortless...
                </h2>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
                    {/* Email/OTP Form */}
                    <div className="space-y-6">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                                disabled={showOtpField}
                            />
                        </div>

                        {!showOtpField ? (
                            <button
                                onClick={handleEmail}
                                disabled={!email || loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-black  bg-amber-400 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors "
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Sending OTP...
                                    </div>
                                ) : (
                                    'Send OTP'
                                )}
                            </button>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
                                    />
                                </div>
                                <button
                                    onClick={handleOtp}
                                    disabled={!otp || otpLoading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                                >
                                    {otpLoading ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Verifying...
                                        </div>
                                    ) : (
                                        'Verify OTP'
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowOtpField(false)
                                        setOtp('')
                                    }}
                                    className="w-full text-sm text-teal-600 hover:text-teal-700 text-center"
                                >
                                    Change Email
                                </button>
                            </div>
                        )}

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">or sign in with these providers</span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div>
                            <GoogleLoginComponent />
                        </div>
                        <div>    
                            <GitHubLoginButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login