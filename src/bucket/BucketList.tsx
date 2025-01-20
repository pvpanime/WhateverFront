import { Pagination } from '../Pagination'
import { usePageAndMore } from '../hooks/pagination'
import styled from 'styled-components'
import classnames from 'classnames'
import { Link } from 'react-router'

const z = {
  expired: 'text-bg-warning',
  finished: 'text-bg-success',
  dropped: 'text-bg-danger',
} as const

function BadgeUnstyle({ children }: { children: string }) {
  const bsColorClass = children in z ? z[children] : 'text-bg-primary'
  return <span className={classnames('badge', bsColorClass)}>{children}</span>
}

const Badge = styled(BadgeUnstyle)`
  vertical-align: text-top;
`

export function BucketList() {
  const { pending, start, end, last, list } =
    usePageAndMore<BucketViewDTO>('/api/bucket/list')
  return (
    <div className="container">
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
