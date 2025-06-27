// // src/pages/account/GoogleLoginBtn.jsx
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// const clientId = "1076648449863-u2aiascjjjko1jmd6c1hpp01j1u9n7nc.apps.googleusercontent.com";

// function GoogleLoginBtn() {
//   const handleSuccess = async (credentialResponse) => {
//     const token = credentialResponse.credential;

//     try {
//         console.log('**************',token);
        
//     //   const response = await axios.post("http://localhost:8000/auth/google/login/", {
//     //     access_token: token,
        
        
//     //   });
//      const response = await axios.post("http://localhost:8000/account/google/", {
//   id_token: token  // not "access_token"
// });


//       console.log('response==',response);

//       const { access, refresh } = response.data;
//       localStorage.setItem('access_token', access);
//       localStorage.setItem('refresh_token', refresh);
//       alert("Logged in successfully!");
//     } catch (err) {
//         console.log('faileeeeeed');
        
//       console.error("Backend login failed", err);
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <div>
//         <h2>Login with Google</h2>
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={() => console.log("Google Login Failed")}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// }

// export default GoogleLoginBtn;



// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// const clientId = "1076648449863-u2aiascjjjko1jmd6c1hpp01j1u9n7nc.apps.googleusercontent.com";

// function GoogleLoginBtn() {
//   const handleSuccess = async (credentialResponse) => {
//     const token = credentialResponse.credential;
//     // const k=credentialResponse.access_token
//     console.log("🔐 Google ID Token received:", token);
//     // console.log(' access tokennnnn==',k);
    

//     try {
//         console.log('enterrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
//         console.log(window.location.origin);

        
//       const response = await axios.post("http://localhost:8000/account/google/", {
//         id_token: token,
//       });

//       console.log("✅ Backend response:", response.data);
//       console.log('********************************************************************************************');
      
//       const { access, refresh } = response.data;

//       localStorage.setItem('access_token', access);
//       localStorage.setItem('refresh_token', refresh);

//       alert("Logged in successfully!");
//     } catch (err) {
//       console.error("❌ Backend login failed:", err.response?.data || err.message);
//       alert("Google login failed. Check console for error.");
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <div>
//         <h2>Login with Google</h2>
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={() => console.log("❌ Google Login Failed")}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// }

// export default GoogleLoginBtn;










import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const clientId = "1076648449863-u2aiascjjjko1jmd6c1hpp01j1u9n7nc.apps.googleusercontent.com";

function GoogleLoginBtn() {
  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    try {
      const res = await axios.post("http://localhost:8000/account/google/", {
        id_token: idToken,
      });

      const { access, refresh } = res.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      alert("✅ Logged in!");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.error("❌ Login Failed")}
        useOneTap={false} // disable One Tap for now
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginBtn;
