import axios from 'axios'
import { useState, useEffect } from 'react'

export function useAuth() {
  const [pending, setPending] = useState(false)
  const [user, setUser] = useState<string | undefined>()
  const [shouldUpdateUser, setS] = useState(true)
  useEffect(() => {
    if (!shouldUpdateUser) return
    setS(false)
    setPending(true)
    axios
      .get<IdentifyResponse>('/api/user/identify')
      .then((response) => {
        const { data } = response
        if (data.type === 'anonymous') setUser(undefined)
        else setUser(data.user)
      })
      .catch((error) => {
        window.alert(error)
        console.error(error)
      })
      .finally(() => {
        setPending(false)
      })
  }, [shouldUpdateUser])
  return [pending, user] as const
}
