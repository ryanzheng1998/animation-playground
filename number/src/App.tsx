import { animated, useSpring } from '@react-spring/web'
import React from 'react'

function App() {
  const [flip, setFlip] = React.useState(false)
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: 1 },
    reverse: !flip,
    delay: 200,
    onRest: () => setFlip((x) => !x),
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      <animated.h1 className="text-9xl">
        {number.to((x) => x.toFixed(2))}
      </animated.h1>
    </div>
  )
}

export default App
