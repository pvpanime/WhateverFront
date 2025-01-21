import { createRoot } from 'react-dom/client'
import { Login } from './Login'
import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Signup } from './Signup'

import '../styles/bootstrap.css'

createRoot(document.getElementById('App')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
