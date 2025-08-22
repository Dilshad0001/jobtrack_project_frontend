
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  {  publicAxios } from "../../store/AxioInstance";

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
        const response = await publicAxios.post("auth/auth/github/", {
          code: code,
        });

        console.log("[GitHubCallback] Django response:", response.data);

        const djangoToken = response.data.token;

        if (djangoToken) {
        //   localStorage.setItem("authToken", djangoToken);
        localStorage.setItem("accessToken", response.data.access_token);
        console.log("acesstokennn===",response.data.access_token);
        
          navigate("/user");
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
