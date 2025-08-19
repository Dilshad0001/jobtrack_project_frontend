



import React, { useState } from 'react'
import axios from 'axios'
import GoogleLoginComponent from './GoogleLoginComponent'
import GitHubLoginButton from './GitHubLoginButton'
import { useNavigate } from 'react-router-dom'
import { publicAxios } from '../../store/AxioInstance'

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
            
            const response = await publicAxios.post('auth/api/auth/request-otp/',

            // const response = await axios.post('http://localhost/auth/api/auth/request-otp/',
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
            // const response = await axios.post('http://127.0.0.1:8000/api/auth/verify-otp/',
                 const response = await publicAxios.post('auth/api/auth/verify-otp/',
       
                {
                    email: email,
                    otp: otp
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            const { access, refresh } = response.data
            localStorage.setItem('accessToken', access)
            localStorage.setItem('refreshToken', refresh)
            console.log('response DATA==', response);
if (response.data.is_admin === true) {
    navigate('/admin');
    return;
}
navigate('/user');

        } catch (error) {
            console.log('invalid otp');
        } finally {
            setOtpLoading(false)
        }
    }




    return (
        <div className=' lg:flex md:flex xl:flex '>
<div className="hidden lg:flex items-center justify-center min-h-screen w-full h-full border-0">
  <div className="bg-white shadow-lg rounded-lg p-6 text-center w-3/4 h-full border-0">
    <h2 className="text-5xl font-bold text-blue-600 mb-12 -mt-10">JobJourney</h2>
    <p className="text-sm text-gray-500 mb-4 italic">
      “Success doesn't come from what you do occasionally, it comes from what you do consistently.”
    </p>
    <p className="text-gray-700 mb-3">
      Welcome to <span className="font-semibold">JobJourney</span> — your personal job application tracker and messaging platform.
    </p>
    <p className="text-gray-700 mb-3 justify-self-center w-60 mx-auto">
      🚀 Keep track of every job you've applied to with detailed logs, notes, and statuses.  
      📅 Stay on top of your interviews with reminders and a built-in calendar.  
      💬 Chat with recruiters or mentors in real-time to get the support you need.
    </p>
    <p className="text-gray-600 text-sm">
      Take control of your career journey — one application at a time.
    </p>
  </div>
</div>




        <div className=" w-full min-h-screen bg- flex flex-col justify-center py-12 sm:px-6 lg:px-8 rounded-4xl sm:w-full   lg:w-1/2 ">
<div className="sm:mx-auto sm:w-full sm:max-w-md">

  {/* JobJourney heading - shown only below lg */}
  <h1 className="text-3xl text-center relative bottom-[70px] font-bold text-blue-600 mb-4 block lg:hidden">
    JobJourney
  </h1>

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
        </div>
    )
}

export default Login