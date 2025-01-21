import { Link, useParams } from 'react-router'
import { useDTO } from '../hooks/data'
import { Badge } from './Badge'

export function BucketView() {
  const { id } = useParams()
  const [pending, bucket, error] = useDTO<BucketViewDTO>(`/api/bucket/${id}`)
  const { title, dueTo, badge, description } = bucket ?? {}
  return (
    <div className="container">
      <div className="jumbotron bg-dark text-light text-center py-5">
        <h1>{title}</h1>
        <div className="display-5">
          Until <span>{dueTo}</span>
        </div>
        <div>
          <Badge>{badge}</Badge>
        </div>
      </div>
      <div id="bucket-md" className="p-3 rounded">
        {description}
      </div>
      <nav className="mt-4">
        <div className="d-flex justify-content-between">
          <Link className="btn btn-secondary" to={'/bucket'}>
            Back to List
          </Link>
          <div className="d-flex gap-4">
            <Link className="btn btn-warning" to={`/bucket/edit/${id}`}>
              Edit
            </Link>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </nav>
    </div>
  )
}
