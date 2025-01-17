import Markdown from 'marked-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BoardComments } from './BoardComments'
import { Link, useParams } from 'react-router'

export function BoardView() {
  const { boardId } = useParams()
  const [board, setBoard] = useState<BoardViewDTO | null>(null)
  const { added, content, updated, userid, title } = board ?? {}

  useEffect(() => {
    axios.get(`/api/board/view/${boardId}`).then((response) => {
      const data = response.data
      const boardDTO = data.data
      setBoard(boardDTO)
    })
  }, [boardId])

  return (
    <div className="container">
      <main className="mb-4">
        <div className="text-center py-2">
          <div className="display-5 text-center py-4 my-0">{title}</div>
          <div className="text-body-secondary">
            by <span>{userid}</span>
          </div>
          <div className="text-body-secondary">
            Added at <span>{added}</span>
          </div>
          {added != updated ? (
            <div className="text-body-secondary">
              *Updated at <span>{updated}</span>
            </div>
          ) : null}
        </div>
        <div className="p-3 rounded card mb-3">
          <Markdown value={content} openLinksInNewTab gfm></Markdown>
        </div>
      </main>
      <nav className="mb-4">
        <div className="d-flex justify-content-between">
          <div>
            <Link className="btn btn-secondary" to={'/board'}>
              Back to List
            </Link>
            {/* <a
              th:if="${owner}"
              th:href="@{'/board/edit/' + ${board.getBid()} + ${requestDTO.useQuery()}}"
              className="btn btn-warning"
            >
              Edit
            </a> */}
          </div>
          {/* <button th:if="${owner}" id="DeleteButton" className="btn btn-danger">
            Delete
          </button> */}
        </div>
      </nav>
      <BoardComments boardId={boardId} />
    </div>
  )
}
