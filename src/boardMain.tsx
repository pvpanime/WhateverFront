import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BoardApp from './Board.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <BoardApp />
    </StrictMode>
  </BrowserRouter>,
)
