import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

interface UsePageParams {
  defaultPage?: number
  defaultSize?: number
}

export function usePage<DT>(
  requestURI: string,
  { defaultPage = 1, defaultSize = 20 }: UsePageParams = {},
) {
  const [searchParams] = useSearchParams()
  const [pending, setPending] = useState(false)
  const [{ start, end, last }, setPaginationComponent] = useState({
    start: 1,
    end: 1,
    last: 1,
  })
  const [list, setList] = useState<DT[]>([])
  const [shouldRefresh, setShouldRefresh] = useState(false)

  const page = searchParams.get('page') ?? defaultPage.toString()
  const size = searchParams.get('size') ?? defaultSize.toString()

  const doFetch = useCallback(() => {
    axios
      .get<PageResponseDTO<DT>>(`${requestURI}?page=${page}&size=${size}`)
      .then((response) => {
        const {
          data: { dtoList, start, end, last },
        } = response
        setList(dtoList)
        setPaginationComponent({ start, end, last })
      })
      .catch((err) => {
        console.error(err)
        window.alert(err)
      })
      .finally(() => {
        setPending(false)
      })
  }, [requestURI, page, size])

  const refresh = useCallback(() => {
    setShouldRefresh(true)
  }, [])

  useEffect(() => {
    setPending(true)
    doFetch()
  }, [doFetch, requestURI, page, size])

  useEffect(() => {
    if (!shouldRefresh) return
    setShouldRefresh(false)
    doFetch()
  }, [shouldRefresh, doFetch, requestURI, page, size])

  return { pending, page, size, start, end, last, list, refresh }
}
