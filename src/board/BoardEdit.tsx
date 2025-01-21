import axios from 'axios'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useLocalAuth } from '../hooks/localAuth'

async function submitWrite(form: HTMLFormElement, jwt: string) {
  const fd = new FormData(form)
  const json = Object.fromEntries(fd.entries())
  return await axios.post('/api/board/write', json, {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  })
}

async function submitEdit(form: HTMLFormElement, jwt: string) {
  const fd = new FormData(form)
  const json = Object.fromEntries(fd.entries())
  return await axios.post('/api/board/edit', json, {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  })
}

export function BoardEdit() {
  const { boardId } = useParams()
  const { jwt } = useLocalAuth()
  const navigate = useNavigate()
  const [board, setBoard] = useState<BoardViewDTO>(null)
  const [pending, setPending] = useState(true)
  const form = useRef<HTMLFormElement>(null)
  const submit = useMemo(
    () => (boardId != undefined ? submitEdit : submitWrite),
    [boardId],
  )
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (form.current)
        submit(form.current, jwt)
          .then((response) => {
            const boardIdDst = boardId ?? response.data.boardId
            navigate(`/board/view/${boardIdDst}`)
          })
          .catch((err) => {
            window.alert(err)
            console.error(err)
          })
    },
    [boardId],
  )

  useEffect(() => {
    setPending(false)
    if (boardId != undefined)
      axios
        .get<ResponseDTO<BoardViewDTO>>(`/api/board/view/${boardId}`)
        .then((response) => {
          const { data } = response
          if (data.success) setBoard(data.data)
        })
        .catch((err) => {
          window.alert(err)
          console.error(err)
        })
  }, [boardId])

  return (
    <div className="container py-3">
      <form onSubmit={onSubmit} method="POST" ref={form}>
        {boardId != undefined && (
          <input type="hidden" name="bid" value={boardId}></input>
        )}
        <div className="card">
          <div className="card-header">Write board</div>
          <div className="card-body">
            <div className="form-floating mb-3">
              <input
                disabled={pending}
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Title"
                defaultValue={board?.title}
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                disabled={pending}
                className="form-control"
                placeholder=""
                id="contentTA"
                name="content"
                style={{ height: '360px' }}
                defaultValue={board?.content}
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
