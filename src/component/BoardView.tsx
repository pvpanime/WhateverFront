import Markdown from 'marked-react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { BoardContext } from '../context/BoardContext'
import axios from 'axios'
import { BoardComments } from './BoardComments'

export function BoardView() {
  const { boardId, openBoard: setBoardId, setTitle } = useContext(BoardContext)
  const [board, setBoard] = useState<BoardViewDTO | null>(null)
  const { added, content, updated, userid } = board ?? {}

  useEffect(() => {
    axios.get(`/api/board/view/${boardId}`).then((response) => {
      const data = response.data
      const boardDTO = data.data
      setBoard(boardDTO)
      setTitle(boardDTO.title)
    })
  }, [boardId, setTitle])

  const closeBoard = useCallback(() => {
    setBoardId(null)
    setTitle('Board')
  }, [setBoardId, setTitle])

  return (
    <div className="container">
      <main className="mb-4">
        <div className="text-center py-2">
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
            <a href="#" className="btn btn-secondary" onClick={closeBoard}>
              Close this board
            </a>
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
      <BoardComments />
    </div>
  )
}
