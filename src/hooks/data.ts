import axios from 'axios'
import { useEffect, useState } from 'react'

export function useDTO<T>(url: string, enable: boolean = true) {
  const [data, setData] = useState<T>()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<unknown>()
  useEffect(() => {
    if (enable) {
      setPending(true)
      axios
        .get<ResponseDTO<T>>(url)
        .then((response) => {
          setData(response.data.data)
          setError(undefined)
        })
        .catch((err) => {
          window.alert(err)
          console.error(err)
          setData(undefined)
          setError(err)
        })
        .finally(() => {
          setPending(false)
        })
    } else {
      setPending(false)
      setData(undefined)
      setError(undefined)
    }
  }, [url, enable])
  return [pending, data, error] as const
}
