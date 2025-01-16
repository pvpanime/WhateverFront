import { useCallback } from 'react'
import { rangeInclusive } from '../utils'

function PaginationDot() {
  return (
    <li className="page-item disabled">
      <a className="page-link">⋯</a>
    </li>
  )
}

interface PaginationItemComp {
  page: number
  current?: boolean
  onPage: (i: number) => unknown
}

function PaginationItem({ page, current = false, onPage }: PaginationItemComp) {
  const classList = ['page-item']
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      onPage(page)
    },
    [onPage, page],
  )
  if (current) classList.push('active')
  return (
    <li className={classList.join(' ')}>
      <a className="page-link" href="#" onClick={onClick}>
        {page}
      </a>
    </li>
  )
}

interface PaginationComp {
  start: number
  end: number
  current: number
  last: number
  onPage: (page: number) => unknown
}

export function Pagination({
  start,
  end,
  current,
  last,
  onPage,
}: PaginationComp) {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {start > 1 ? (
          <>
            <PaginationItem page={1} onPage={onPage} />
            <PaginationDot />
          </>
        ) : null}
        {[...rangeInclusive(start, end)].map((i) => (
          <PaginationItem
            key={i}
            page={i}
            current={current === i}
            onPage={onPage}
          />
        ))}
        {end < last ? (
          <>
            <PaginationDot />
            <PaginationItem page={last} onPage={onPage} />
          </>
        ) : null}
      </ul>
    </nav>
  )
}
