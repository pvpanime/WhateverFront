import '../styles/bootstrap.css'

import { Route, Routes } from 'react-router'

import { BoardEdit } from './BoardEdit'
import { BoardList } from './BoardList'
import { BoardView } from './BoardView'

export default function BoardApp() {
  return (
    <Routes>
      <Route path="/board" element={<BoardList />} />
      <Route path="/board/view/:boardId" element={<BoardView />} />
      <Route path="/board/write" element={<BoardEdit />} />
      <Route path="/board/edit/:boardId" element={<BoardEdit />} />
    </Routes>
  )
}
