import { Link } from 'react-router'

import { Pagination } from '../Pagination'

import styled from 'styled-components'
import { usePageAndMore } from '../hooks/pagination'
import classnames from 'classnames'

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

function BoardListUno() {
  const { pending, start, end, last, list } =
    usePageAndMore<BoardListViewDTO>('/api/board/list')
  return (
    <div className="container">
      <h1 className="display-1 text-center py-4 my-0">Board</h1>
      <div className={classnames({ pending })}>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Writer</th>
              <th scope="col">Created</th>
            </tr>
          </thead>
          <tbody>
            {list.map((b) => (
              <BoardListItem board={b} key={b.bid} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination start={start} end={end} last={last} pathname={'/board'} />
      <div className="py-4 text-center">
        <Link className="btn btn-primary" to="/board/write">
          Write
        </Link>
      </div>
    </div>
  )
}

export const BoardList = styled(BoardListUno)`
  display: block;
`
