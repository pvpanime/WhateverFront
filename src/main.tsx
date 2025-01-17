import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BoardApp from './board/Board.tsx'
import { BrowserRouter } from 'react-router'
import { Navbar } from './top/Navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <BoardApp />
    </BrowserRouter>
  </StrictMode>,
)
