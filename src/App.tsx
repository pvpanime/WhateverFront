import './styles/bootstrap.css'
import { BoardList } from './component/BoardList'
import { useCallback, useState } from 'react'
import { BoardContext } from './context/BoardContext'
import { BoardView } from './component/BoardView'
import { BoardEdit } from './component/BoardEdit'

function App() {
  const [boardId, setBoardId] = useState<number | null>(null)
  const [title, setTitle] = useState('Board')
  const [page, setPage] = useState(1)
  const [edit, setEdit] = useState(false)
  const openBoard = useCallback((i: number | null) => {
    setEdit(false)
    setBoardId(i)
  }, [])
  const openEdit = useCallback((b: boolean = true) => {
    setEdit(b)
    setBoardId(null)
  }, [])
  return (
    <BoardContext.Provider
      value={{
        boardId,
        openBoard,
        openEdit,
        page,
        setPage,
        setTitle,
      }}
    >
      <h1 className="display-1 text-center py-4 my-0">{title}</h1>
      {boardId != null ? <BoardView /> : null}
      {edit ? <BoardEdit /> : null}
      <BoardList page={page} />
      <div className="my-4 text-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => openEdit()}
        >
          Write
        </button>
      </div>
    </BoardContext.Provider>
  )
}

export default App
