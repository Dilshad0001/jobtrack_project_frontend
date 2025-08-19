







import React from "react";

const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;


function GitHubLoginButton() {
  const redirectToGitHub = () => {
    // Construct the GitHub OAuth URL
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`;
    // Redirect the user's browser to the GitHub authorization URL
    window.location.href = githubAuthUrl;
  };

  return (
    // Button element with Tailwind CSS classes for styling
    <button
      onClick={redirectToGitHub}
      className="
        flex items-center justify-center space-x-3
        bg-gray-800 text-white font-semibold
        py-3 px-6 rounded-lg shadow-md
        transition-all duration-300 ease-in-out
        hover:bg-gray-700 hover:shadow-lg
        transform hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75
        w-full
      "
      aria-label="Continue with GitHub" // Accessibility improvement
    >
      {/* GitHub Icon (inline SVG for optimal performance and styling) */}
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 0C5.372 0 0 5.372 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.82-.26.82-.58V20.1c-3.337.726-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.758-1.332-1.758-1.087-.745.084-.73.084-.73 1.2.084 1.834 1.234 1.834 1.234 1.07 1.833 2.807 1.3 3.49.992.108-.775.42-1.3.76-1.597-2.66-.3-5.46-1.33-5.46-5.92 0-1.3.465-2.36 1.233-3.2-.12-.3-.53-1.51.115-3.15 0 0 1-.32 3.3 1.23.96-.267 1.98-.4 3-.404 1.02.004 2.04.137 3 .404 2.3-1.55 3.3-1.23 3.3-1.23.645 1.64.234 2.85.115 3.15.77.84 1.233 1.9 1.233 3.2 0 4.59-2.8 5.6-5.47 5.9.42.36.81 1.096.81 2.22v3.136c0 .33.22.69.82.58C20.562 21.8 24 17.302 24 12c0-6.628-5.372-12-12-12z"
        />
      </svg>
      <span>Continue with GitHub</span>
    </button>
  );
}

export default GitHubLoginButton;