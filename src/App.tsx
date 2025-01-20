import '@styles/bootstrap.css'

import { Route, Routes } from 'react-router'

import { BoardEdit } from './board/BoardEdit'
import { BoardList } from './board/BoardList'
import { BoardView } from './board/BoardView'
import { IndexApp } from './IndexApp'
import { FoodList } from './food/FoodList'
import { BucketList } from './bucket/BucketList'

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
      <Route path="/food">
        <Route index element={<FoodList />} />
      </Route>
      <Route path="/bucket">
        <Route index element={<BucketList />} />
      </Route>
    </Routes>
  )
}

export default App
