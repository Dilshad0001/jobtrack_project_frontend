import React from "react";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/oauth/login/google/";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      style={{
        padding: "10px 20px",
        borderRadius: "8px",
        backgroundColor: "#4285F4",
        color: "white",
        fontSize: "16px",
        border: "none",
        cursor: "pointer"
      }}
    >
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
