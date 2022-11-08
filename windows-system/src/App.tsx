import { useStore } from './useStore'
import { Window } from './Window'

function App() {
  const {
    state: { windows },
    dispatch,
  } = useStore()

  const windowsElement = Object.entries(windows).map(([key, window]) => {
    return (
      <Window
        key={key}
        {...window}
        hidden={window.minimized}
        onMinimize={() => {
          dispatch({ type: 'hideWindow', payload: key })
        }}
        onClose={() => {
          dispatch({ type: 'removeWindow', payload: key })
        }}
        onTitleDrag={(e) => {
          dispatch({ type: 'dragWindow', payload: { id: key, ...e } })
        }}
        onTitleMouseDown={() => {
          dispatch({ type: 'focusWindow', payload: key })
        }}
        title="Test"
        content="Test"
      />
    )
  })

  return (
    <div className="relative h-screen overflow-hidden">
      {windowsElement}
      <div className="h-screen grid place-items-center">
        <button
          className="bg-blue-500 rounded px-2 py-1 cursor-pointer text-white"
          onClick={() => {
            dispatch({
              type: 'addWindow',
              payload: {
                id: crypto.randomUUID(),
                position: new DOMPoint(300, 300),
                size: new DOMPoint(300, 300),
                minimized: false,
                content: 'Test',
              },
            })
          }}
        >
          Add Window
        </button>
      </div>
    </div>
  )
}

export default App
