import { Link, useParams } from 'react-router'
import { useDTO } from '../hooks/data'
import { memo, useId } from 'react'

const FoodDetail = memo(function FoodDetail({
  label,
  value,
}: {
  label
  value
}) {
  return (
    <div className="list-group-item">
      <span className="fw-bold">{label}</span>
      <span className="fw-light text-body-secondary">{value}</span>
    </div>
  )
})

const Rating = memo(function Rating({ value }: { value: number | string }) {
  const id = useId()
  return (
    <>
      <input
        type="radio"
        className="btn-check"
        name="rating"
        value={value}
        id={'Radio' + id}
        autoComplete="off"
      />
      <label className="btn btn-outline-warning" htmlFor={'Radio' + id}>
        {value}
      </label>
    </>
  )
})

export function FoodView() {
  const { id } = useParams()
  const [pending, data, error] = useDTO<FoodViewDTO>(
    `/api/food/view/${id}`,
    id != undefined,
  )
  const {
    name,
    price,
    stock,
    opened,
    close,
    description,
    registrar,
    added,
    updated,
    avgRate,
    reviewCount,
    images,
  } = data ?? {}

  return (
    <div className="container">
      <div className="display-1 text-center py-4">Foods!</div>
      <div className="card mb-2">
        <div className="card-header">
          <h1>{name}</h1>
        </div>
        <div className="card-body">
          <h3 className="card-title">{price}</h3>
          {avgRate != null && (
            <h4 className="card-subtitle mb-2 text-body-secondary">
              <i className="bi bi-star-fill" style={{ color: '#ffc614' }}>
                ★
              </i>
              <span style={{ color: '#ffc614' }}>{avgRate}</span>
            </h4>
          )}
          {reviewCount && (
            <h5 className="card-subtitle mb-2 text-body-secondary">
              리뷰 {reviewCount}개
            </h5>
          )}
        </div>
      </div>

      <div className="card mb-2">
        <div className="card-header">Details</div>
        <div className="list-group list-group-flush">
          <FoodDetail label={'재고'} value={stock} />
          <FoodDetail label={'판매 개시일'} value={opened} />
          <FoodDetail label={'판매 기한'} value={close} />
          <FoodDetail label={'게시자'} value={registrar} />
          <FoodDetail label={'최초 등록일'} value={added} />
          {added !== updated && (
            <FoodDetail label={'최종 수정일'} value={updated} />
          )}
        </div>
        <div className="card-body">
          <h4 className="card-title">Description</h4>
          <div className="card-text">{description}</div>
        </div>
        {images?.length > 0 && (
          <div className="list-group list-group-flush">
            {images.map((im) => (
              <div key={im.id} className="list-group-item">
                <img src={im.src} alt={im.name} />
              </div>
            ))}
          </div>
        )}
        <div className="card-footer">
          <nav className="row justify-content-between">
            <div className="col-auto">
              <Link to={`/food/edit/${id}`} className="btn btn-primary">
                Edit
              </Link>
              <Link to={'/food'} className="btn btn-secondary">
                Back to List
              </Link>
            </div>
            <div className="col-auto">
              <button className="btn btn-danger">Delete</button>
            </div>
          </nav>
        </div>
      </div>
      <div className="card mb-2">
        <div className="card-header">Reviews</div>
        <div id="reviews-here" className="list-group list-group-flush"></div>
        <div id="review-paginator-here" className="card-footer"></div>
      </div>
      <div className="card mb-5">
        <div className="card-header">Your Review</div>
        <form id="review-form">
          <div className="card-body">
            <div className="form-floating mb-2">
              <textarea
                id="reviewComment"
                className="form-control"
                name="comment"
                placeholder="Comment"
                style={{ height: '200px' }}
              ></textarea>
              <label htmlFor="reviewComment">Comment</label>
            </div>
            <div className="mb-2">
              <div>Rating</div>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <Rating value={1} />
                <Rating value={2} />
                <Rating value={3} />
                <Rating value={4} />
                <Rating value={5} />
              </div>
            </div>
          </div>
        </form>
        <div className="card-footer">
          <button id="submit-review" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
