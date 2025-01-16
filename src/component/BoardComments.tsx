import { useCallback, useContext, useEffect, useState } from 'react'
import { BoardContext } from '../context/BoardContext'
import { Pagination } from './Pagination'
import axios from 'axios'

function BoardCommentView({ comment }: { comment: BoardCommentViewDTO }) {
  const { added, cid, content, userid } = comment
  const onClick = useCallback(() => {
    console.log(cid)
  }, [cid])
  return (
    <li
      className="list-group-item list-group-item-action comment"
      onClick={onClick}
    >
      <span className="fw-bold text-info-emphasis pe-1">{userid}</span>
      <span>{content}</span>
      <span className="text-body-secondary fw-light">{added}</span>
    </li>
  )
}

export function BoardComments() {
  const { boardId } = useContext(BoardContext)
  const [commentPage, setCommentPage] = useState(1)
  const [comments, setComments] = useState<BoardCommentViewDTO[]>([])
  const [writeCommentValue, setWriteCommentValue] = useState('')
  const [{ start, end, last }, setPaginationComponent] = useState({
    start: 1,
    end: 1,
    last: 1,
  })

  useEffect(() => {
    axios
      .get(`/api/boardComment/list/${boardId}?page=${commentPage}`)
      .then((response) => {
        const data = response.data
        setComments(data.dtoList ?? [])
        setPaginationComponent(data)
      })
  }, [boardId, commentPage])

  return (
    <section className="mb-4">
      <div className="card">
        <div className="card-header">Comments</div>
        <ul id="comments-here" className="list-group list-group-flush">
          {comments.map((comment) => (
            <BoardCommentView key={comment.cid} comment={comment} />
          ))}
        </ul>
        <div className="card-body">
          <Pagination
            start={start}
            end={end}
            current={commentPage}
            last={last}
            onPage={setCommentPage}
          />
        </div>
        <div className="card-body">
          <div className="form-floating">
            <textarea
              className="form-control UseTaHeight"
              placeholder="Write Comment"
              id="commentTA"
              value={writeCommentValue}
              onChange={(e) => setWriteCommentValue(e.target.value)}
            ></textarea>
            <label htmlFor="commentTA">Write Comment</label>
          </div>
        </div>
        <div className="card-footer">
          <button id="commentButton" className="btn btn-primary">
            Comment
          </button>
        </div>
      </div>
    </section>
  )
}
