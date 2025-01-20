import '@styles/bootstrap.css'

import { Route, Routes } from 'react-router'

import { BoardEdit } from './board/BoardEdit'
import { BoardList } from './board/BoardList'
import { BoardView } from './board/BoardView'
import { IndexApp } from './IndexApp'

// export default
function App() {
  return (
    <Routes>
      <Route index element={<IndexApp />}></Route>
      <Route path="/board">
        <Route index element={<BoardList />} />
        <Route path="view/:boardId" element={<BoardView />} />
        <Route path="write" element={<BoardEdit />} />
        <Route path="edit/:boardId" element={<BoardEdit />} />
      </Route>
    </Routes>
  )
}

export default App
