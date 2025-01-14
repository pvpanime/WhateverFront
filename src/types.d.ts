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
