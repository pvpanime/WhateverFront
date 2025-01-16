import { createContext } from "react";

interface BoardContextType {
  boardId: number | null
  openBoard: (i : number | null) => unknown
  openEdit: (b: boolean) => unknown
  page: number
  setPage: (i : number) => unknown
  setTitle: (s: string) => unknown
}

const noop = () => (void 0)

export const BoardContext = createContext<BoardContextType>({
  boardId: null,
  openBoard: noop,
  openEdit: noop,
  page: 1,
  setPage: noop,
  setTitle: noop
})
