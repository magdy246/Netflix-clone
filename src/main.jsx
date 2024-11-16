import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TokenContextProvider from './Context/TokenContext.jsx'

createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </TokenContextProvider>
)
