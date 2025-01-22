import '@styles/bootstrap.css'

import { Route, Routes } from 'react-router'

import { BoardEdit } from './board/BoardEdit'
import { BoardList } from './board/BoardList'
import { BoardView } from './board/BoardView'
import { IndexApp } from './IndexApp'
import { FoodList } from './food/FoodList'
import { BucketList } from './bucket/BucketList'
import { BucketView } from './bucket/BucketView'
import { BucketEdit } from './bucket/BucketEdit'
import { Reddit } from './reddit/Reddit'
import { FoodEdit } from './food/FoodEdit'
import { FoodView } from './food/FoodView'
import { Newsletter } from './newsletter/Newsletter'
import { UserProfile } from './member/UserProfile'

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
        <Route path="view/:id" element={<FoodView />} />
        <Route path="write" element={<FoodEdit />} />
        <Route path="edit/:id" element={<FoodEdit />} />
      </Route>
      <Route path="/bucket">
        <Route index element={<BucketList />} />
        <Route path="view/:id" element={<BucketView />} />
        <Route path="write" element={<BucketEdit />} />
        <Route path="edit/:id" element={<BucketEdit />} />
      </Route>
      <Route path="/reddit" element={<Reddit />} />
      <Route path="/news" element={<Newsletter />} />
      <Route path="/user/:username" element={<UserProfile />} />
    </Routes>
  )
}

export default App
