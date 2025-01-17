import '../styles/bootstrap.css'

import { Route, Routes } from 'react-router'

import { BoardEdit } from './BoardEdit'
import { BoardList } from './BoardList'
import { BoardView } from './BoardView'

export default function BoardApp() {
  return (
    <Routes>
      <Route path="/board">
        <Route index element={<BoardList />} />
        <Route path="view/:boardId" element={<BoardView />} />
        <Route path="write" element={<BoardEdit />} />
        <Route path="edit/:boardId" element={<BoardEdit />} />
      </Route>
    </Routes>
  )
}
