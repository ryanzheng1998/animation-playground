import { animated, config, useSpring } from '@react-spring/web'
import React from 'react'

function App() {
  const [flip, setFlip] = React.useState(false)

  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    onRest: () => setFlip((x) => !x),
    delay: 200,
    config: config.molasses,
    reverse: flip,
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      <animated.h1 className="text-9xl" style={props}>
        Hello World
      </animated.h1>
    </div>
  )
}

export default App
