import { Link } from 'react-router'
import { usePageAndMore } from '../hooks/pagination'
import { Pagination } from '../Pagination'
import classnames from 'classnames'

function FoodListItem({ food }: { food: FoodViewDTO }) {
  return (
    <div className="col-6 p-1">
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <Link to={`/food/view/${food.id}`}>
              <span className="h4 mb-2">{food.name}</span>
            </Link>
            {food.avgRate != null && (
              <span>
                <i className="bi bi-star-fill" style={{ color: '#ffc614' }}></i>
                <span style={{ color: '#ffc614' }}>{food.avgRate}</span>
                <span className="text-body-secondary">
                  <small>({food.reviewCount})</small>
                </span>
              </span>
            )}
          </div>
          <h5 className="card-subtitle mb-2 text-body-secondary">
            {food.price}원
          </h5>
          <p className="card-text">{food.description}</p>
          {food.images && (
            <div className="row">
              {food.images.map((image) => (
                <div key={image.id} className="col-auto">
                  <img src={image.thumbnail} alt={image.name} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="list-group list-group-flush bg-body-tertiary">
          <div className="list-group-item">
            재고 : <span>{food.stock}</span> 개
          </div>
          <div className="list-group-item">
            판매기한 : <span>{food.close}</span> 까지
          </div>
          <div className="list-group-item">
            게시자 : <span>{food.registrar}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FoodList() {
  const { pending, start, end, last, list } =
    usePageAndMore<FoodViewDTO>('/api/food/list')
  return (
    <div className="container">
      <div className="jumbotron display-1 text-center py-4">Foods!</div>
      <div className={classnames('row', 'my-4', { pending })}>
        {list.map((food) => (
          <FoodListItem food={food} key={food.id} />
        ))}
      </div>
      <Pagination start={start} end={end} last={last} />
      <div className="py-4 text-center" style={{ alignContent: 'center' }}>
        <Link className="btn btn-primary" to="/food/register">
          Register!
        </Link>
      </div>
    </div>
  )
}
