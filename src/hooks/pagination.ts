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
