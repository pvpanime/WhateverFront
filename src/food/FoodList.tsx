import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { usePage } from '../hooks/pagination'
import axios from 'axios'

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
            [[${food.price}]]원
          </h5>
          <p className="card-text">{food.description}</p>
          {food.images && (
            <div className="row">
              {food.images.map((image) => (
                <div className="col-auto">
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
  const [page, size] = usePage()
  const [foodList, setFoodList] = useState<FoodViewDTO[]>([])
  const [pending, setPending] = useState(false)
  useEffect(() => {
    setPending(true)
    axios
      .get<PageResponseDTO<FoodViewDTO>>(
        `/api/food/list?page=${page}&size=${size}`,
      )
      .then((response) => {
        const data = response.data
        setFoodList(data.dtoList)
        setPending(false)
      })
      .catch((err) => {
        console.error(err)
        window.alert(err)
      })
  }, [page, size])
  return (
    <div className="container">
      <div className="jumbotron display-1 text-center py-4">Foods!</div>
      <div className="row my-4">
        {!pending &&
          foodList.map((food) => <FoodListItem food={food} key={food.id} />)}
      </div>
    </div>
  )
}
