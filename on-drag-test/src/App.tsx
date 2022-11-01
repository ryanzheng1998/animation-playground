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

  const mouseDownPositionRelativeToElement = React.useRef<DOMPoint | null>(null)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDownPositionRelativeToElement.current === null) return

      p.onDrag2?.({
        windowMouseEvent: e,
        dragStartPosition: mouseDownPositionRelativeToElement.current,
      })
    }

    const handleMouseUp = () => {
      mouseDownPositionRelativeToElement.current = null
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseDownPositionRelativeToElement])

  return (
    <div
      {...props}
      onMouseDown={(e) => {
        p.onMouseDown?.(e)
        const element = e.currentTarget

        const rect = element.getBoundingClientRect()
        mouseDownPositionRelativeToElement.current = new DOMPoint(
          e.pageX - rect.x,
          e.pageY - rect.y
        )
      }}
    >
      {children}
    </div>
  )
}

function App() {
  const [elementPosition, setElementPosition] = React.useState<DOMPoint>(
    new DOMPoint(0, 0)
  )

  return (
    <div>
      <OnDrag2Div
        className="w-64 aspect-square bg-red-500"
        onDrag2={(e) => {
          const { windowMouseEvent, dragStartPosition } = e

          const x = windowMouseEvent.x - dragStartPosition.x

          const y = windowMouseEvent.y - dragStartPosition.y

          setElementPosition(new DOMPoint(x, y))
        }}
        style={{
          transform: `translate(${elementPosition.x}px, ${elementPosition.y}px)`,
        }}
      />
    </div>
  )
}

export default App
