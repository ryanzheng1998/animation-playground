import { a, useSpring } from '@react-spring/web'
import React from 'react'

// https://css-tricks.com/animating-layouts-with-the-flip-technique/
function App() {
  const [move, setMove] = React.useState(false)
  const firstRef = React.useRef<DOMPoint | null>(null)

  const [props, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }))

  return (
    <a.div
      ref={(ref) => {
        if (ref === null) return

        const first = firstRef.current
        const last = ref.getBoundingClientRect()
        firstRef.current = new DOMPoint(last.x, last.y)

        if (first === null) return

        api.set({ x: first.x - last.x, y: first.y - last.y })

        api.start({
          x: 0,
          y: 0,
        })
      }}
      onClick={() => setMove((x) => !x)}
      className={`w-44 rounded aspect-square bg-green-400 fixed ${
        move ? 'top-80 left-80' : 'top-4 left-4'
      }`}
      style={props}
    />
  )
}

export default App
