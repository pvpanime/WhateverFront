import axios, { AxiosError } from 'axios'
import { useCallback, useMemo, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useLocalAuth } from '../hooks/localAuth'
import { useDTO } from '../hooks/data'

function submitFactory(uri) {
  return async (form: HTMLFormElement, jwt: string) => {
    const fd = new FormData(form)
    const json = Object.fromEntries(fd.entries())
    const response = await axios.post(uri, json, {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    })
    return response.data.data.boardId
  }
}

function handleReject(err: AxiosError) {
  if (err.status === 403) window.alert('겠냐??ㅋㅋㅋㅋㅋㅋ')
  else {
    window.alert(err)
    console.error(err)
  }
}

const submitWrite = submitFactory('/api/board/write')
const submitEdit = submitFactory('/api/board/edit')

export function BoardEdit() {
  const navigate = useNavigate()
  const { boardId } = useParams()
  const { jwt, username } = useLocalAuth()
  const [pending, board, error] = useDTO<BoardViewDTO>(
    `/api/board/view/${boardId}`,
    boardId != undefined,
  )
  const { title, content, userid: owner } = board ?? {}
  const unlock = useMemo(
    () => username && (boardId == undefined || username === owner),
    [username, boardId, owner],
  )
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
          .then((boardId) => {
            // const boardIdDst = boardId ?? response.data.boardId
            navigate(`/board/view/${boardId}`)
          })
          .catch(handleReject)
    },
    [boardId],
  )
  return (
    <div className="container py-3">
      <form onSubmit={onSubmit} method="POST" ref={form}>
        {boardId != undefined && (
          <input type="hidden" name="bid" value={boardId}></input>
        )}
        <div className="card mb-3">
          <div className="card-header">Write board</div>
          <div className="card-body">
            <div className="form-floating mb-3">
              <input
                disabled={pending || !unlock}
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Title"
                defaultValue={title}
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                disabled={pending || !unlock}
                className="form-control"
                placeholder=""
                id="contentTA"
                name="content"
                style={{ height: '360px' }}
                defaultValue={content}
              ></textarea>
              <label htmlFor="contentTA">Content</label>
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between">
              <input
                type="submit"
                className="btn btn-primary"
                value="Save"
                disabled={pending || !unlock}
              />
              <Link className="btn btn-danger" to="/board">
                Discard
              </Link>
            </div>
          </div>
        </div>
      </form>
      {!pending && !unlock && (
        <div>
          <div className="alert alert-danger" role="alert">
            You can't edit this board.
          </div>
        </div>
      )}
    </div>
  )
}
