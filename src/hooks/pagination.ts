import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

interface UsePageParams {
  defaultPage?: number
  defaultSize?: number
}

export function usePage({
  defaultPage = 1,
  defaultSize = 20,
}: UsePageParams = {}) {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? defaultPage.toString()
  const size = searchParams.get('size') ?? defaultSize.toString()
  return [page, size]
}

export function usePageAndMore<DT>(
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

  const page = searchParams.get('page') ?? defaultPage.toString()
  const size = searchParams.get('size') ?? defaultSize.toString()

  useEffect(() => {
    setPending(true)
    axios
      .get<PageResponseDTO<DT>>(`${requestURI}?page=${page}&size=${size}`)
      .then((response) => {
        const { data } = response
        setList(data.dtoList)
        setPaginationComponent(data)
      })
      .catch((err) => {
        console.error(err)
        window.alert(err)
      })
      .finally(() => {
        setPending(false)
      })
  }, [requestURI, page, size])

  return { pending, page, size, start, end, last, list }
}
