import axios from 'axios'
import { useCallback, useRef } from 'react'
import { Link, useNavigate } from 'react-router'

async function submitWrite(form: HTMLFormElement) {
  const fd = new FormData(form)
  const json = Object.fromEntries(fd.entries())
  return await axios.post('/api/board/write', json)
}

export function BoardEdit() {
  const form = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (form.current)
      submitWrite(form.current)
        .then((response) => {
          const boardId = response.data.boardId
          navigate(`/board/view/${boardId}`)
        })
        .catch((err) => {
          window.alert(err)
          console.error(err)
        })
    // why useNavigate is even dependant
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
                style={{ height: '360px' }}
              ></textarea>
              <label htmlFor="contentTA">Content</label>
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between">
              <input type="submit" className="btn btn-primary" value="Save" />
              <Link className="btn btn-danger" to="/board">
                Discard
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
