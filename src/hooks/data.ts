import axios from 'axios'
import { useEffect, useState } from 'react'

export function useDTO<T>(url: string) {
  const [data, setData] = useState<T>()
  const [pending, setPending] = useState(true)
  const [error, setError] = useState<unknown>()
  useEffect(() => {
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
  }, [url])
  return [pending, data, error] as const
}
