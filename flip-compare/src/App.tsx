import { a, useSpring } from '@react-spring/web'
import React from 'react'

function App() {
  const [move, setMove] = React.useState(false)
  const [move2, setMove2] = React.useState(false)
  const firstRef = React.useRef<{ x: number; y: number } | null>(null)

  const [props, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }))

  const props2 = useSpring({
    x: move2 ? 0 : -320,
    y: move2 ? 0 : 320,
  })

  return (
    <>
      <a.div
        ref={(ref) => {
          if (ref === null) return

          const first = firstRef.current
          const last = ref.getBoundingClientRect()
          firstRef.current = { x: last.x, y: last.y }

          if (first === null) return

          api.set({ x: first.x - last.x, y: first.y - last.y })

          api.start({
            x: 0,
            y: 0,
          })
        }}
        onClick={() => setMove((x) => !x)}
        className={`w-44 rounded aspect-square bg-green-400 fixed ${
          move ? 'top-80 left-80' : 'top-0 left-0'
        }`}
        style={props}
      />
      <a.div
        onClick={() => {
          setMove2((x) => !x)
        }}
        className="w-44 rounded aspect-square bg-green-400 fixed top-0 right-0"
        style={props2}
      />
    </>
  )
}

export default App
