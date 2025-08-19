
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { publicAxios } from '../../store/AxioInstance';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


export default function GoogleLoginComponent() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;

    try {
      const res = await publicAxios.post('auth/api/auth/google-login/', {
        credential: credential,
      });

      const data = res.data;

      console.log("token data==",res.data.access_token);
      

      // Store tokens in localStorage
      localStorage.setItem('accessToken', res.data.access_token);
      localStorage.setItem('user_info', JSON.stringify(data));
      console.log('credenetials==', credential);
      
      // Changed alert to console.log as alerts are not good practice in production and also conflict with Canvas
      console.log('Login successful!'); 
      console.log('tokens===', res.data);
      navigate('/user');

    } catch (err) {
      console.error(err);
      // Changed alert to console.log
      console.log('Login failed.');
    }
  };

  const handleError = () => {
    // Changed alert to console.log
    console.log('Google login failed');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>          
          <div className="bg-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 text-center  w-full  border border-gray-200">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
          
    </GoogleOAuthProvider>
  );
}


