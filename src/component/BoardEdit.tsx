import axios from 'axios'
import { useCallback, useContext, useRef } from 'react'
import { BoardContext } from '../context/BoardContext'

async function submitWrite(form: HTMLFormElement) {
  const fd = new FormData(form)
  const json = Object.fromEntries(fd.entries())
  return await axios.post('/api/board/write', json)
}

export function BoardEdit() {
  const form = useRef<HTMLFormElement>(null)
  const { openBoard, notifyBoardPost } = useContext(BoardContext)
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (form.current)
        submitWrite(form.current)
          .then((response) => {
            const boardId = response.data.boardId
            openBoard(boardId, false)
            notifyBoardPost()
          })
          .catch((err) => {
            window.alert(err)
            console.error(err)
          })
    },
    [openBoard],
  )
  return (
    <div className="container py-3">
      <form onSubmit={onSubmit} method="POST" ref={form}>
        {/* <input type="hidden" name="bid" value="${board.getBid()}"> */}
        <div className="card">
          <div className="card-header">Write board</div>
          <div className="card-body">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Title"
                // th:value="${board.getTitle()}"
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                placeholder=""
                id="contentTA"
                name="content"
                // th:text="${board.getContent()}"
                style={{ height: '360px' }}
              ></textarea>
              <label htmlFor="contentTA">Content</label>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-auto">
                <input type="submit" className="btn btn-primary" value="Save" />
              </div>
              <div className="col-auto">
                <button
                  onClick={() => openBoard(null, false)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
