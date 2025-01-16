import { useCallback, useContext } from 'react'
import { BoardContext } from '../context/BoardContext'

export function BoardListItem({
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
