import axios, { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

/** `response.data` 타입이 `T`인 `url`을 fetch하고 `response.data`를 사용한다.  */
export function useData<T>(url: string, enable: boolean = true) {
  const [data, setData] = useState<T>()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<AxiosError<T>>()
  const [response, setResponse] = useState<AxiosResponse<T>>()
  useEffect(() => {
    if (enable) {
      setPending(true)
      setResponse(undefined)
      axios
        .get<T>(url)
        .then((response) => {
          setError(undefined)
          setResponse(response)
          setData(response.data)
        })
        .catch((err: AxiosError<T>) => {
          setError(err)
          setResponse(err.response)
          setData(err.response.data)
        })
        .finally(() => {
          setPending(false)
        })
    } else {
      setPending(false)
      setError(undefined)
      setData(undefined)
    }
  }, [url, enable])
  return [pending, data, error, response] as const
}

/** `response.data` 타입이 `ResponseDTO<T>`인 `url`을 fetch하고 `response.data.data`를 사용한다. */
export function useDTO<T>(url: string, enable: boolean = true) {
  const [data, setData] = useState<T>()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<AxiosError<ResponseDTO<T>>>()
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

interface UsePageParams {
  defaultPage?: number
  defaultSize?: number
}

interface PagingState<DT> {
  /** API 요청이 진행 중인지 여부 */
  pending: boolean

  /** 현재 페이지 */
  page: string

  /** 한 페이지당 보여줄 리스트 아이템 수 */
  size: string

  /** Pagination 윈도우에서 왼쪽 번호 */
  start: number

  /** Pagination 윈도우에서 오른쪽 번호 */
  end: number

  /** 마지막 페이지 */
  last: number

  /** 아이템 배열 */
  list: DT[]

  /** 페이지를 다시 가져오도록 한다. */
  refresh: () => void
}

/** 페이지를 가져오는 API */
export function usePage<DT>(
  requestURI: string,
  { defaultPage = 1, defaultSize = 20 }: UsePageParams = {},
): PagingState<DT> {
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
      .get<PageResponseDTO<DT>>(`${requestURI}`, {
        params: { page, size },
      })
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
