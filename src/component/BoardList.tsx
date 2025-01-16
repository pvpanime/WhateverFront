import { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Pagination } from './Pagination'
import { BoardContext } from '../context/BoardContext'

function BoardListItem({
  board: { added, bid, commentCount, title, userid },
}: {
  board: BoardListViewDTO
}) {
  const { openBoard } = useContext(BoardContext)
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      openBoard(bid)
    },
    [bid, openBoard],
  )
  return (
    <tr>
      <td>
        <a href={`/board/view/${bid}`} onClick={onClick}>
          <span>{title}</span>
          {commentCount > 0 ? (
            <span className="comment-count badge text-bg-primary">
              {commentCount}
            </span>
          ) : null}
        </a>
      </td>
      <td>{userid}</td>
      <td>{added}</td>
    </tr>
  )
}

export function BoardList({ page }: { page: number }) {
  const [boardList, setBoardList] = useState<BoardListViewDTO[]>([])
  const [{ start, end, last }, setPaginationComponent] = useState({
    start: 1,
    end: 1,
    last: 1,
  })
  const [loading, setLoading] = useState(false)
  const { setPage } = useContext(BoardContext)

  useEffect(() => {
    const query = `?page=${page}`
    setLoading(true)
    axios.get('/api/board/list' + query).then((response) => {
      const data = response.data
      setBoardList(data.dtoList)
      setPaginationComponent(data)
      setLoading(false)
    })
  }, [page])

  return (
    <div className="container">
      <div className={loading ? 'loading' : ''}>
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
  )
}
