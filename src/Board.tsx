import './styles/bootstrap.css'
import { BoardListItem } from './component/BoardList'
import { useCallback, useEffect, useState } from 'react'
import { BoardContext } from './context/BoardContext'
import { BoardView } from './component/BoardView'
import { BoardEdit } from './component/BoardEdit'
import axios from 'axios'
import { Pagination } from './component/Pagination'

function BoardApp() {
  const [boardId, setBoardId] = useState<number | null>(null)
  const [edit, setEdit] = useState(false)
  const [page, setPage] = useState(1)
  const [boardList, setBoardList] = useState<BoardListViewDTO[]>([])
  const [{ start, end, last }, setPaginationComponent] = useState({
    start: 1,
    end: 1,
    last: 1,
  })
  const [pending, setPending] = useState(false)

  const fetchList = async (pg: number) => {
    const query = `?page=${pg}`
    setPending(true)
    const response = await axios.get('/api/board/list' + query)
    const data = response.data
    setBoardList(data.dtoList)
    setPaginationComponent(data)
    setPending(false)
  }

  const openBoard = useCallback((i: number | null, edit: boolean = false) => {
    setEdit(edit)
    setBoardId(i)
  }, [])

  useEffect(() => {
    fetchList(page)
  }, [page])

  return (
    <BoardContext.Provider
      value={{
        boardId,
        openBoard,
      }}
    >
      <h1 className="display-1 text-center py-4 my-0">Board</h1>
      {edit ? (
        <BoardEdit />
      ) : (
        boardId != null && <BoardView boardId={boardId} />
      )}
      <div className="container">
        <div className={pending ? 'loading' : ''}>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Writer</th>
                <th scope="col">Created</th>
              </tr>
            </thead>
            <tbody>
              {boardList.map((b) => (
                <BoardListItem board={b} key={b.bid} />
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          start={start}
          end={end}
          current={page}
          last={last}
          onPage={setPage}
        />
      </div>
      <div className="my-4 text-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => openBoard(null)}
        >
          Write
        </button>
      </div>
    </BoardContext.Provider>
  )
}

export default BoardApp
