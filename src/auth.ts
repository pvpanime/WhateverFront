export function getAuthentication() {
  if (!window.localStorage && !window.sessionStorage) return null
  let s: string
  if (null != (s = window.localStorage.getItem('jwt'))) return s
  if (null != (s = window.sessionStorage.getItem('jwt'))) return s
  return null
}
