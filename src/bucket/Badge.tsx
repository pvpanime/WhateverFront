import styled from 'styled-components'
import classnames from 'classnames'

const bsClassMap = {
  expired: 'text-bg-warning',
  finished: 'text-bg-success',
  dropped: 'text-bg-danger',
} as const

function BadgeUnstyle({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  const bsColorClass =
    children in bsClassMap ? bsClassMap[children] : 'text-bg-primary'
  return (
    <span className={classnames('badge', bsColorClass, className)}>
      {children}
    </span>
  )
}

export const Badge = styled(BadgeUnstyle)`
  vertical-align: text-top;
  text-transform: capitalize;
`
