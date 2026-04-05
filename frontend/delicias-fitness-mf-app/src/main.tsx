import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import './index.css'
import App from './App.tsx'
import { CartProvider } from './components/Context/CartContext.tsx'
import { AuthProvider } from './components/Context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
     <CartProvider>
       <App />
       <Toaster/>
    </CartProvider>
    </AuthProvider>
    </BrowserRouter>
   
   
  </StrictMode>,
)
