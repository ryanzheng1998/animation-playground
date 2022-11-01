import React from 'react'

type DivProps = React.HTMLAttributes<HTMLDivElement>

// todo: forward ref
const OnDrag2Div: React.FC<
  DivProps & {
    onDrag2?: (event: {
      windowMouseEvent: MouseEvent
      dragStartPosition: DOMPoint
    }) => void
  }
> = (p) => {
  const { children, onDrag2, ...props } = p

  const [
    mouseDownPositionRelativeToElement,
    setMoustDownPositionRelativeToElement,
  ] = React.useState<DOMPoint | null>(null)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDownPositionRelativeToElement === null) return

      p.onDrag2?.({
        windowMouseEvent: e,
        dragStartPosition: mouseDownPositionRelativeToElement,
      })
    }

    const handleMouseUp = () => {
      setMoustDownPositionRelativeToElement(null)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [
    mouseDownPositionRelativeToElement,
    setMoustDownPositionRelativeToElement,
  ])

  const grabbing = mouseDownPositionRelativeToElement !== null

  return (
    <div
      {...props}
      onMouseDown={(e) => {
        p.onMouseDown?.(e)
        const element = e.currentTarget

        const rect = element.getBoundingClientRect()
        setMoustDownPositionRelativeToElement(
          new DOMPoint(e.pageX - rect.x, e.pageY - rect.y)
        )
      }}
      className={`${p.className} ${
        grabbing ? 'cursor-grabbing' : 'cursor-grab'
      } select-none`}
    >
      {children}
    </div>
  )
}

function App() {
  const [windows, setWindows] = React.useState<{
    [key: string]: {
      order: number
      position: DOMPoint
      content: JSX.Element
      onClose?: () => void
      minimized: boolean
      size: DOMPoint
    }
  }>({})

  const windowsElement = Object.entries(windows).map(([key, window]) => {
    return (
      <div
        key={key}
        className={`absolute rounded bg-white overflow-hidden shadow ${
          window.minimized ? 'hidden' : ''
        }`}
        style={{
          width: window.size.x,
          height: window.size.y,
          transform: `translate(${window.position.x}px, ${window.position.y}px)`,
          zIndex: window.order,
        }}
      >
        {/* <div className="absolute w-full h-1 cursor-ns-resize" /> */}
        <OnDrag2Div
          onDrag2={(e) => {
            const { windowMouseEvent, dragStartPosition } = e

            const x = windowMouseEvent.x - dragStartPosition.x

            const y = windowMouseEvent.y - dragStartPosition.y

            setWindows((windows) => {
              return {
                ...windows,
                [key]: {
                  ...windows[key],
                  position: new DOMPoint(x, y),
                },
              }
            })
          }}
          onMouseDown={() => {
            setWindows((windows) => {
              const windowOrder = Object.values(windows).map((x) => x.order)
              const maxOrder = Math.max(...windowOrder)

              return {
                ...windows,
                [key]: {
                  ...windows[key],
                  order: window.order === maxOrder ? maxOrder : maxOrder + 1,
                },
              }
            })
          }}
          className="grid px-4 py-2 bg-blue-100 grid-cols-[1fr_auto_auto]"
        >
          <h2>Title</h2>
          <svg
            className="w-6 aspect-square cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <title>Remove</title>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M400 256H112"
            />
          </svg>
          <svg
            className="w-6 aspect-square cursor-pointer"
            onClick={() => {
              window.onClose?.()

              setWindows((windows) => {
                const { [key]: ommitted, ...rest } = windows

                return rest
              })
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <title>Close</title>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M368 368L144 144M368 144L144 368"
            />
          </svg>
        </OnDrag2Div>
        <div>{window.content}</div>
      </div>
    )
  })

  return (
    <div className="relative h-screen overflow-hidden">
      {windowsElement}
      <div className="h-screen grid place-items-center">
        <button
          className="bg-blue-500 rounded px-2 py-1 cursor-pointer text-white"
          onClick={() => {
            setWindows((windows) => {
              const windowOrder = Object.values(windows).map((x) => x.order)
              const maxOrder = Math.max(0, ...windowOrder)

              return {
                ...windows,
                [crypto.randomUUID()]: {
                  order: maxOrder + 1,
                  position: new DOMPoint(0, 0),
                  content: <p>Content</p>,
                  minimized: false,
                  size: new DOMPoint(300, 300),
                },
              }
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
