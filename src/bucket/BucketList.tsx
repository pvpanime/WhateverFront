import { Pagination } from '../Pagination'
import { usePage } from '../hooks/data'
import classnames from 'classnames'
import { Link } from 'react-router'
import { HeroTitle } from '../top/HeroTitle'
import { Badge } from './Badge'

export function BucketList() {
  const { pending, start, end, last, list } =
    usePage<BucketViewDTO>('/api/bucket/list')
  return (
    <div className="container">
      <HeroTitle>Bucket</HeroTitle>
      <table className={classnames('table', 'table-hover', { pending })}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due To</th>
          </tr>
        </thead>
        <tbody>
          {list.map((li) => (
            <tr key={li.id}>
              <td>
                <Badge>{li.badge}</Badge>
              </td>
              <td>
                <Link to={`/bucket/view/${li.id}`}>{li.title}</Link>
              </td>
              <td>{li.description}</td>
              <td>{li.dueTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination start={start} end={end} last={last} />
      <div className="py-4 text-center" style={{ alignContent: 'center' }}>
        <Link className="btn btn-primary" to="/bucket/write">
          Write
        </Link>
      </div>
    </div>
  )
}
