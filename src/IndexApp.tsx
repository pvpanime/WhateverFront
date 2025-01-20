import { Link } from 'react-router'

export function IndexApp() {
  return (
    <div className="container py-3">
      <div className="display-1">MySite</div>
      <div className="list-group">
        <Link className="list-group-item list-group-item-action" to={'/board'}>
          Board
        </Link>
        <Link className="list-group-item list-group-item-action" to={'/food'}>
          Food
        </Link>
        <Link className="list-group-item list-group-item-action" to={'/bucket'}>
          Bucket
        </Link>
      </div>
    </div>
  )
}
