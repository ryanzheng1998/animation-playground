import { animated, config, useSpring } from '@react-spring/web'
import React from 'react'

function App() {
  const [flip, setFlip] = React.useState(false)

  const styles = useSpring({
    from: { length: 0 },
    to: { length: 1 },
    reverse: flip,
    onRest: () => setFlip((x) => !x),
    config: config.molasses,
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      <animated.svg
        className="w-80 aspect-square"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        strokeDasharray={100}
        strokeDashoffset={styles.length.to((x) => x * 100)}
      >
        <title>Star</title>
        <path
          d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="1"
          pathLength={100}
        />
      </animated.svg>
    </div>
  )
}

export default App
