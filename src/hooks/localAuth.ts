import axios from 'axios'
import { useCallback, useMemo, useState } from 'react'

function decodeOne(s: string) {
  const decoded = atob(s.replace(/-/g, '+').replace(/_/g, '/'))
  return JSON.parse(decoded)
}

function getJwtStr() {
  if (!window.localStorage && !window.sessionStorage) return null
  let s: string
  if (null != (s = window.sessionStorage.getItem('jwt'))) return s
  if (null != (s = window.localStorage.getItem('jwt'))) return s
  return null
}

function selectStorage(remember: boolean) {
  if (remember) return window.localStorage || window.sessionStorage
  else return window.sessionStorage || window.localStorage
}

function setJwt(jwt: string, remember: boolean = false) {
  const storage = selectStorage(remember)
  if (storage) {
    storage.setItem('jwt', jwt)
  }
}

function deleteJwt() {
  window.localStorage?.removeItem('jwt')
  window.sessionStorage?.removeItem('jwt')
}

export function useLocalAuth() {
  const [jwt, setJwtStrState] = useState(getJwtStr)
  const login = useCallback(
    (username: string, password: string, remember: boolean) => {
      axios
        .post('/api/user/login', { username, password })
        .then((response) => {
          const jwtStr = response.data.jwt
          setJwt(jwtStr, remember)
          setJwtStrState(jwtStr)
        })
        .catch((err) => {
          if (err.response) {
            const response = err.response
            if (response.data.success === false) window.alert(err.message)
          } else {
            console.error(err)
            window.alert(err)
          }
        })
    },
    [],
  )
  const logout = useCallback(() => {
    setJwtStrState(undefined)
    deleteJwt()
  }, [])

  const user = useMemo(() => {
    if (!jwt) return undefined
    const payloadEncoded = jwt.split('.')[1]
    return decodeOne(payloadEncoded)
  }, [jwt])

  const username = useMemo(() => {
    if (!jwt) return undefined
    return user.sub
  }, [jwt])

  return { login, logout, jwt, user, username }
}
