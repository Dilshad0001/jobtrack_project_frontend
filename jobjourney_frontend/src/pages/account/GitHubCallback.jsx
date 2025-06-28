// // GitHubCallback.js
// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const clientId = "Ov23lipGKPLQGbDajORt";
// const clientSecret = "53333b4f8d9cc5c1380bbd4407590c8d2085b78e";

// function GitHubCallback() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log('in ==1');
    
//     const fetchAccessTokenAndLogin = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const code = urlParams.get("code");

//       if (!code) {
//         console.log('in ==2');
//         console.error("No code found in URL");
//         return;
//       }

//       try {
//         console.log('in ==3');
//         // 1. Exchange code for access_token
//         const githubResponse = await axios.post(
//           "https://github.com/login/oauth/access_token",
//           {
//             client_id: clientId,
//             client_secret: clientSecret,
//             code: code
//           },
//           {
//             headers: {
//               Accept: "application/json"
//             }
//           }
//         );
//         console.log('in ==4',githubResponse);

//         const accessToken = githubResponse.data.access_token;
//         console.log("GitHub access_token:", accessToken);

//         // 2. Send access_token to Django
//         const backendResponse = await axios.post(
//           "http://localhost:8000/auth/social/login/",
//           {
//             provider: "github",
//             access_token: accessToken
//           }
//         );
//         console.log('in ==5');

//         const djangoToken = backendResponse.data.key;
//         console.log("Django token:", djangoToken);

//         // 3. Store token locally
//         localStorage.setItem("authToken", djangoToken);

//         // 4. Redirect to your app home
//         navigate("/");
//       } catch (error) {
//         console.log('in ==6');
//         console.error("Error during GitHub login:", error.response?.data || error);
//       }
//     };

//     fetchAccessTokenAndLogin();
//   }, [navigate]);

//   return <div>Logging you in via GitHub...</div>;
// }

// export default GitHubCallback;




// ===========================================================================
// src/pages/account/GitHubCallback.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GitHubCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginViaBackend = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        console.error("[GitHubCallback] No code found in URL");
        return;
      }

      console.log("[GitHubCallback] Code received:", code);

      try {
        // ✅ Call your Django backend, not GitHub:
        const response = await axios.post("http://localhost:8000/auth/github/", {
          code: code,
        });

        console.log("[GitHubCallback] Django response:", response.data);

        const djangoToken = response.data.token;
        if (djangoToken) {
        //   localStorage.setItem("authToken", djangoToken);
        localStorage.setItem("access_token", djangoToken);
          navigate("/home");
        } else {
          console.error("[GitHubCallback] No token returned by backend.");
        }
      } catch (error) {
        console.error(
          "[GitHubCallback] Error:",
          error.response?.data || error.message
        );
      }
    };

    loginViaBackend();
  }, [navigate]);

  return <div>Logging you in via GitHub...</div>;
}

export default GitHubCallback;

// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function GitHubCallback() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("in useeffect 1");
    
//     const loginWithCode = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const code = urlParams.get("code");

//       if (!code) {
//         console.log("in useeffect 2");
//         console.error("No code found in URL");
//         return;
//       }

//       try {
//         console.log("in useeffect 3");
//         // Send the code to Django
//         const response = await axios.post(
//           "http://localhost:8000/auth/social/github/",
//           { code: code }
//         );

//         console.log("Backend response:", response.data);
//         console.log("in useeffect 4");

//         const djangoToken = response.data.key;
//         localStorage.setItem("authToken", djangoToken);

//         navigate("/");
//       } catch (error) {
//         console.log("in useeffect 5");
//         console.error(
//           "Error during GitHub login:",
//           error.response?.data || error
//         );
//       }
//     };

//     loginWithCode();
//   }, [navigate]);

//   return <div>Logging you in via GitHub...</div>;
// }

// export default GitHubCallback;
