import { animated, useSpring } from '@react-spring/web'
import React from 'react'

function App() {
  const [flip, setFlip] = React.useState(false)
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: 200 },
    reverse: flip,
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div
        onClick={() => {
          setFlip((x) => !x)
        }}
        className="border border-black rounded overflow-hidden relative grid place-items-center w-52 h-12 cursor-pointer"
      >
        <animated.div
          className="absolute bg-pink-400 inset-0"
          style={{ scaleX: number.to((x) => x / 200), transformOrigin: 'left' }}
        />
        <animated.p className="absolute">
          {number.to((x) => x.toFixed(0))}
        </animated.p>
      </div>
    </div>
  )
}

export default App
