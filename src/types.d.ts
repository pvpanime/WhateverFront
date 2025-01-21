declare interface PaginationState {
  start: number
  end: number
  last: number
}

declare interface PageResponseDTO<T> {
  page: number
  size: number
  success: boolean

  /** total count of board for corresponding request (NOT pages) */
  total: number

  start: number
  end: number

  /** the last page */
  last: number

  dtoList: T[]
}

declare interface BoardListViewDTO {
  bid: number
  title: string
  userid: string
  added: string
  commentCount: number
}

declare interface BoardViewDTO {
  bid: number
  title: string
  content: string
  userid: string
  status: number
  added: string
  updated: string
}

declare interface BoardCommentViewDTO {
  cid: number
  content: string
  userid: string
  added: string
  updated: string
}

declare interface ImageDTO {
  id: string
  name: string
  ordinal: number
  src: string
  thumbnail: string
}

declare interface FoodViewDTO {
  id: number
  name: string
  description: string
  price: number
  stock: number
  opened: string // LocalDateTime
  close: string // LocalDateTime
  registrar: string
  added: string // LocalDateTime
  updated: string // LocalDateTime
  reviewCount: number
  avgRate: number
  images: ImageDTO[]
}

declare interface BucketViewDTO {
  id: number
  title: string
  description: string
  dueTo: string // LocalDateTime
  userid: string
  status: number // integer
  added: string // LocalDateTime
  updated: string // LocalDateTime
  badge?: string
}

declare type IdentifyResponse =
  | {
      type: 'anonymous'
    }
  | {
      type: 'authenticated'
      user: string
    }
