import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BoardApp from './Board.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BoardApp />
  </StrictMode>,
)
