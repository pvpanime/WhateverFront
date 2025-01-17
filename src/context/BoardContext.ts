import { createContext } from 'react'

interface BoardContextType {
  boardId: number | null
  openBoard: (i: number | null, b?: boolean) => unknown
  notifyBoardPost: () => unknown
}

const noop = () => void 0

export const BoardContext = createContext<BoardContextType>({
  boardId: null,
  openBoard: noop,
  notifyBoardPost: noop,
})
