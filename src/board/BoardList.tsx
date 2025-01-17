import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'

import { Pagination } from './Pagination'

function BoardListItem({
  board: { added, bid, commentCount, title, userid },
}: {
  board: BoardListViewDTO
}) {
  return (
    <tr>
      <td>
        <Link to={`/board/view/${bid}`}>
          <span>{title}</span>
          {commentCount > 0 ? (
            <span className="comment-count badge text-bg-primary">
              {commentCount}
            </span>
          ) : null}
        </Link>
      </td>
      <td>{userid}</td>
      <td>{added}</td>
    </tr>
  )
}

export function BoardList() {
  const [searchParams] = useSearchParams()

  const page = parseInt(searchParams.get('page') ?? '1')
  const size = parseInt(searchParams.get('size') ?? '20')
  const [boardList, setBoardList] = useState<BoardListViewDTO[]>([])
  const [{ start, end, last }, setPaginationComponent] = useState({
    start: 1,
    end: 1,
    last: 1,
  })
  const [pending, setPending] = useState(false)
  const fetchList = useCallback(async (page: number, size: number) => {
    const query = `?page=${page}&size=${size}`
    setPending(true)
    const response = await axios.get('/api/board/list' + query)
    const data = response.data
    setBoardList(data.dtoList)
    setPaginationComponent(data)
    setPending(false)
  }, [])

  useEffect(() => {
    fetchList(page, size)
  }, [page, size])

  return (
    <>
      <div className="container">
        <h1 className="display-1 text-center py-4 my-0">Board</h1>
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
        <Pagination start={start} end={end} last={last} pathname={'/board'} />
      </div>
      <div className="my-4 text-center">
        <Link className="btn btn-primary" to="/board/write">
          Write
        </Link>
      </div>
    </>
  )
}
