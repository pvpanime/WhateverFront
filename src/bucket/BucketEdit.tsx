import { useParams } from 'react-router'
import { useDTO } from '../hooks/data'

function BucketStatusSelect({ initStatus, dispatchStatus }) {}

export function BucketEdit() {
  const { id } = useParams()
  const [pending, bucket, error] = useDTO<BucketViewDTO>(
    `/api/bucket/${id}`,
    id != undefined,
  )
  const { title, status, dueTo, description } = bucket ?? {}
  console.log({ pending, status })
  console.log({ isZero: status === 0 })
  const viewTitle = id != undefined ? 'Edit' : 'Write'
  return (
    <div className="container">
      <main className="py-3">
        <form method="POST" onSubmit={(e) => e.preventDefault()}>
          {id != undefined && <input type="hidden" name="id" value={id} />}
          <div className="card">
            <div className="card-header">{viewTitle}</div>
            <div className="card-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Title"
                  defaultValue={title}
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Status
                </span>
                <div className="btn-group" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="status"
                    id="btnradio1"
                    value="0"
                    autoComplete="off"
                    defaultChecked={status === 0}
                  />
                  <label
                    className="btn btn-outline-secondary"
                    htmlFor="btnradio1"
                    style={{ borderRadius: 0 }}
                  >
                    In Progress
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="status"
                    id="btnradio2"
                    value="1"
                    autoComplete="off"
                    defaultChecked={status === 1}
                  />
                  <label
                    className="btn btn-outline-success"
                    htmlFor="btnradio2"
                  >
                    Finished
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="status"
                    id="btnradio3"
                    value="-1"
                    autoComplete="off"
                    defaultChecked={status === -1}
                  />
                  <label className="btn btn-outline-danger" htmlFor="btnradio3">
                    Dropped
                  </label>
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="datetime-local"
                  className="form-control"
                  id="dueTo"
                  name="dueTo"
                  placeholder="dueTo"
                  defaultValue={dueTo}
                />
                <label htmlFor="dueTo">Due To</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder=""
                  id="descriptionTA"
                  name="description"
                  defaultValue={description}
                  style={{ height: '360px' }}
                ></textarea>
                <label htmlFor="descriptionTA">Content</label>
              </div>
            </div>
            <div className="card-footer">
              <input type="submit" className="btn btn-primary" value="Save" />
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
