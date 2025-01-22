import { useParams } from 'react-router'

export function UserProfile() {
  const { username } = useParams()
  return <div>{username}</div>
}
