import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { store } from './store/index.js'
import {Provider} from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="260508963314-dvspa47rliovpemmljle7unqk9ts5s8q.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)



// import { GoogleOAuthProvider } from '@react-oauth/google';

// <GoogleOAuthProvider clientId="1076648449863-u2aiascjjjko1jmd6c1hpp01j1u9n7nc.apps.googleusercontent.com">
//   <App />
// </GoogleOAuthProvider>
