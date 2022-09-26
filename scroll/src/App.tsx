import { animated, config, useSpring } from '@react-spring/web'
import React from 'react'

function App() {
  const [flip, setFlip] = React.useState(false)
  const [height, setHeight] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const { scroll } = useSpring({
    from: { scroll: 0 },
    to: { scroll: height },
    reverse: flip,
    config: config.molasses,
    onRest: () => setFlip((x) => !x),
  })

  // handle container resize
  React.useEffect(() => {
    const onResize = () => {
      if (containerRef.current === null) return

      const element = containerRef.current
      setHeight(element.scrollHeight - element.clientHeight)
    }

    window.addEventListener('resize', onResize)

    onResize()

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [containerRef.current])

  const pages = new Array(10).fill(0).map((_, i) => {
    return (
      <div key={i} className="h-screen w-full grid place-items-center">
        <h2 className="text-8xl">Page {i}</h2>
      </div>
    )
  })

  return (
    <animated.div
      ref={containerRef}
      className="overflow-auto h-screen"
      scrollTop={scroll}
    >
      {pages}
    </animated.div>
  )
}

export default App
