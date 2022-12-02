import { useRef, useState } from 'react'
import { OnDrag2Div } from './OnDrag2Div'

function App() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <OnDrag2Div
      ref={ref}
      onDrag2={({ dragStartPosition, windowMouseEvent }) => {
        const x = windowMouseEvent.pageX - dragStartPosition.x
        const y = windowMouseEvent.pageY - dragStartPosition.y

        const element = ref.current

        if (element === null) return

        element.style.transform = `translate(${x}px, ${y}px)`
      }}
      className="w-32 m-48 aspect-square bg-green-300 rounded"
    />
  )
}

function AppLag() {
  const [position, setPosition] = useState(new DOMPoint(0, 0))

  return (
    <OnDrag2Div
      onDrag2={({ dragStartPosition, windowMouseEvent }) => {
        const x = windowMouseEvent.pageX - dragStartPosition.x
        const y = windowMouseEvent.pageY - dragStartPosition.y

        setPosition(new DOMPoint(x, y))
      }}
      className="w-32 aspect-square bg-green-300 rounded"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    />
  )
}

export default App
