// import React from 'react';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { redirect, useNavigate } from 'react-router-dom';

// const clientId = "561978927912-09o9htkmpdnnle9nimgv4e16qserm439.apps.googleusercontent.com";

// export default function GoogleLoginComponent() {
//     const navigate=useNavigate()
//   const handleSuccess = async (credentialResponse) => {
//     const { credential } = credentialResponse;

//     try {
//       const res = await axios.post('http://127.0.0.1:8000/api/auth/google-login/', {
//         credential: credential,
//       });

//       const data = res.data;

//       // Store tokens in localStorage
//       localStorage.setItem('access_token', credential);
//       localStorage.setItem('user_info', JSON.stringify(data));
//       console.log('credenetials==',credential);
//     //   console.log('acess toke',credential.access_token);
      
      
//       alert('Login successful!');
//       console.log('tokens===',res.data);
//       navigate('/home')
      
//     } catch (err) {
//       console.error(err);
//       alert('Login failed.');
//     }
//   };

//   const handleError = () => {
//     alert('Google login failed');
//   };

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <div style={{ marginTop: '50px', textAlign: 'center' }}>
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={handleError}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// }

// ===========================================================================================

import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const clientId = "561978927912-09o9htkmpdnnle9nimgv4e16qserm439.apps.googleusercontent.com";

export default function GoogleLoginComponent() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/google-login/', {
        credential: credential,
      });

      const data = res.data;

      // Store tokens in localStorage
      localStorage.setItem('access_token', credential);
      localStorage.setItem('user_info', JSON.stringify(data));
      console.log('credenetials==', credential);
      
      // Changed alert to console.log as alerts are not good practice in production and also conflict with Canvas
      console.log('Login successful!'); 
      console.log('tokens===', res.data);
      navigate('/home');

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
          <div className="bg-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 text-center max-w-sm w-full  border border-gray-200">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
          
    </GoogleOAuthProvider>
  );
}


// p-5 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 text-center max-w-sm w-full h-0 border border-gray-200 