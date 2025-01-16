import { createRoot } from 'react-dom/client'

import { StrictMode } from 'react'
import { Signup } from './Signup'

createRoot(document.getElementById('SignupApp')!).render(
  <StrictMode>
    <Signup />
  </StrictMode>,
)
