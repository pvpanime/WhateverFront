import { useParams } from 'react-router'
import { useDTO } from '../hooks/data'

export function FoodEdit() {
  const { id } = useParams()
  const [pending, data, error] = useDTO<FoodViewDTO>(
    `/api/food/${id}`,
    id != undefined,
  )
  const { name, price, stock, opened, close, description } = data ?? {}
  const viewTitle = id != undefined ? 'Edit' : 'Write'
  return (
    <div className="container">
      <main className="py-3">
        <div className="card">
          <form method="POST" onSubmit={(e) => e.preventDefault()}>
            {id != undefined && <input type="hidden" name="id" value={id} />}

            <div className="card-header">{viewTitle}</div>
            <div className="card-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="foodName"
                  name="name"
                  placeholder="Name"
                  defaultValue={name}
                />
                <label htmlFor="foodName">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="foodPrice"
                  name="price"
                  placeholder="Price"
                  defaultValue={price}
                />
                <label htmlFor="foodPrice">Price</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="foodStock"
                  name="stock"
                  placeholder="Stock"
                  defaultValue={stock}
                />
                <label htmlFor="foodStock">Stock</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="datetime-local"
                  className="form-control"
                  id="foodOpened"
                  name="opened"
                  placeholder="Opened At"
                  defaultValue={opened}
                />
                <label htmlFor="foodOpened">Opened At</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="datetime-local"
                  className="form-control"
                  id="foodClose"
                  name="close"
                  placeholder="Price"
                  defaultValue={close}
                />
                <label htmlFor="foodClose">Will Close At</label>
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="imageInput">
                  Images
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imageInput"
                  multiple
                  accept="image/*"
                />
              </div>
              <div className="card mb-3">
                <div className="card-header">Preview</div>
                <div
                  id="images-preview-holder"
                  className="list-group list-group-flush"
                ></div>
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
                <label htmlFor="descriptionTA">Description</label>
              </div>
            </div>
            <div id="InputHiddenHolder"></div>
            <div className="card-footer">
              <input type="submit" className="btn btn-primary" value="Save" />
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
