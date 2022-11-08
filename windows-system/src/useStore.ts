import { useReducer } from 'react'

interface State {
  windows: {
    [key: string]: {
      order: number
      position: DOMPoint
      content: string
      minimized: boolean
      size: DOMPoint
    }
  }
}

const initialState: State = {
  windows: {},
}

type Action =
  | {
      type: 'addWindow'
      payload: {
        id: string
        position: DOMPoint
        content: string
        minimized: boolean
        size: DOMPoint
      }
    }
  | { type: 'removeWindow'; payload: string }
  | { type: 'hideWindow'; payload: string }
  | { type: 'showWindow'; payload: string }
  | {
      type: 'dragWindow'
      payload: {
        id: string
        windowMouseEvent: MouseEvent
        dragStartPosition: DOMPoint
      }
    }
  | {
      type: 'focusWindow'
      payload: string
    }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addWindow': {
      const windowOrder = Object.values(state.windows).map((x) => x.order)
      const maxOrder = Math.max(...windowOrder, 0)
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.payload.id]: {
            ...action.payload,
            order: maxOrder + 1,
          },
        },
      }
    }
    case 'removeWindow': {
      const { [action.payload]: _, ...windows } = state.windows
      return {
        ...state,
        windows,
      }
    }
    case 'hideWindow': {
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.payload]: {
            ...state.windows[action.payload],
            minimized: true,
          },
        },
      }
    }
    case 'showWindow': {
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.payload]: {
            ...state.windows[action.payload],
            minimized: false,
          },
        },
      }
    }
    case 'dragWindow': {
      const { windowMouseEvent, dragStartPosition, id } = action.payload

      const x = windowMouseEvent.x - dragStartPosition.x

      const y = windowMouseEvent.y - dragStartPosition.y

      return {
        ...state,
        windows: {
          ...state.windows,
          [action.payload.id]: {
            ...state.windows[action.payload.id],
            position: new DOMPoint(x, y),
          },
        },
      }
    }
    case 'focusWindow': {
      const windowOrder = Object.values(state.windows).map((x) => x.order)
      const maxOrder = Math.max(...windowOrder)

      return {
        ...state,
        windows: {
          ...state.windows,
          [action.payload]: {
            ...state.windows[action.payload],
            order:
              state.windows[action.payload].order === maxOrder
                ? maxOrder
                : maxOrder + 1,
          },
        },
      }
    }
  }
}

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return {
    state,
    dispatch,
  }
}
