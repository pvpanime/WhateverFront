// import { useCallback } from 'react'
import { useMemo } from 'react'
import { rangeInclusive } from '../utils'
import { Link, useSearchParams } from 'react-router'

function PaginationDot() {
  return (
    <li className="page-item disabled">
      <a className="page-link">⋯</a>
    </li>
  )
}

interface PaginationItemComp {
  pathname: string
  page: number
  pageParamName?: string
  // current?: boolean
  // onPage: (i: number) => unknown
}

function PaginationItem({
  pathname,
  page,
  pageParamName = 'page',
}: PaginationItemComp) {
  const [searchParams] = useSearchParams()

  const dst = useMemo(() => {
    const usp = new URLSearchParams(searchParams)
    usp.set(pageParamName, page.toString())
    return usp
  }, [page, pageParamName, searchParams])

  const currentPage = parseInt(searchParams.get('page') ?? '1')
  const current = useMemo(() => page === currentPage, [page, currentPage])
  const classList = ['page-item']
  if (current) classList.push('active')
  return (
    <li className={classList.join(' ')}>
      <Link
        className="page-link"
        to={{ pathname, search: '?' + dst.toString() }}
      >
        {page}
      </Link>
    </li>
  )
}

interface PaginationComp {
  start: number
  end: number
  last: number
  pathname: string
}

export function Pagination({ start, end, last, pathname }: PaginationComp) {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {start > 1 ? (
          <>
            <PaginationItem page={1} pathname={pathname} />
            <PaginationDot />
          </>
        ) : null}
        {[...rangeInclusive(start, end)].map((i) => (
          <PaginationItem key={i} page={i} pathname={pathname} />
        ))}
        {end < last ? (
          <>
            <PaginationDot />
            <PaginationItem page={last} pathname={pathname} />
          </>
        ) : null}
      </ul>
    </nav>
  )
}
