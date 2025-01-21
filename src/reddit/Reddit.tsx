import { CSSProperties, memo, useCallback, useReducer, useState } from 'react'
import { rangeInclusive } from '../utils'
import { produce } from 'immer'
import styled from 'styled-components'

import { List, ListRowRenderer } from 'react-virtualized'

type RedditAction =
  | {
      type: 'push'
      value: string
    }
  | {
      type: 'insert'
      index: number
      value: string
    }
  | {
      type: 'update'
      index: number
      value: string
    }
  | {
      type: 'remove'
      index: number
    }

function reducer(state: string[], action: RedditAction) {
  switch (action.type) {
    case 'push':
      return produce(state, (draft) => {
        draft.push(action.value)
      })
    case 'insert':
      return produce(state, (draft) => {
        draft.splice(action.index, 0, action.value)
      })
    case 'update':
      return produce(state, (draft) => {
        draft[action.index] = action.value
      })
    case 'remove':
      return produce(state, (draft) => {
        draft.splice(action.index, 1)
      })
  }
}

function RedditListItem({
  data,
  index,
  className = '',
  style,
  dispatch,
}: {
  data: string
  index: number
  className?: string
  style: CSSProperties
  dispatch: React.Dispatch<RedditAction>
}) {
  const onContextMenu = useCallback(
    (e) => {
      e.preventDefault()
      dispatch({ type: 'remove', index })
    },
    [index],
  )
  return (
    <li
      className={'list-group-item list-group-item-action ' + className}
      onContextMenu={onContextMenu}
      style={style}
    >
      {data}
    </li>
  )
}

const RedditItem = memo(RedditListItem)

export function Reddit() {
  // const [list, setList] = useState(() =>
  //   [...rangeInclusive(1, 1000)].map((i) => `Reddit ${i}`),
  // )
  const [state, dispatch] = useReducer(
    reducer,
    [...rangeInclusive(1, 1000)].map((i) => `Reddit ${i}`),
  )
  const [tail, setTail] = useState(() => state.length)

  const onClick = useCallback(() => {
    dispatch({ type: 'push', value: 'More Reddit ' + tail })
    setTail(tail + 1)
  }, [tail])

  const rowRenderer: ListRowRenderer = useCallback(
    ({ index, key, style }) => {
      return (
        <RedditItem
          key={key}
          index={index}
          data={state[index]}
          dispatch={dispatch}
          style={style}
        />
      )
    },
    [state],
  )
  return (
    <div
      className="container"
      onClick={onClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      <List
        className="list-group"
        rowCount={state.length}
        rowRenderer={rowRenderer}
        rowHeight={50}
        width={960}
        height={700}
        style={{ display: 'block!important' }}
      />
      {/* <ul className="list-group">
        {state.map((s, i) => (
          <RedditItem key={s} data={s} index={i} dispatch={dispatch} />
        ))}
      </ul> */}
    </div>
  )
}
