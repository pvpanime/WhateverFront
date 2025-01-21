import Markdown from 'marked-react'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { BoardComments } from './BoardComments'
import { Link, useNavigate, useParams } from 'react-router'
import { useLocalAuth } from '../hooks/localAuth'

export function BoardView() {
  const navigate = useNavigate()
  const { boardId } = useParams()
  const { user } = useLocalAuth()
  const [board, setBoard] = useState<BoardViewDTO>(null)
  const { bid, added, content, updated, userid, title } = board ?? {}

  const confirmDelete = useCallback(() => {
    if (
      boardId != undefined &&
      window.confirm('Are you sure you want to delete this board?')
    ) {
      axios.delete(`/api/board/delete/${bid}`).then(() => {
        navigate('/board')
      })
    }
  }, [boardId])

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
          <Markdown value={content} openLinksInNewTab gfm breaks></Markdown>
        </div>
      </main>
      <nav className="mb-4">
        <div className="d-flex justify-content-between">
          <div>
            <Link className="btn btn-secondary" to={'/board'}>
              Back to List
            </Link>
          </div>
          {userid && user?.sub === userid && (
            <div className="d-flex gap-2">
              <Link to={`/board/edit/${bid}`} className="btn btn-warning">
                Edit
              </Link>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </nav>
      <BoardComments boardId={boardId} />
    </div>
  )
}
