import { createRoot } from 'react-dom/client'
import { Login } from './Login'
import { StrictMode } from 'react'

createRoot(document.getElementById('LoginApp')!).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
