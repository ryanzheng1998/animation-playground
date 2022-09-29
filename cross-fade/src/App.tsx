import { a, useTransition } from '@react-spring/web'
import React from 'react'

function App() {
  return (
    <div>
      {/* mix blend mode plus light */}
      <div
        className="w-64 aspect-square relative"
        style={{ isolation: 'isolate' }}
      >
        <div
          className="bg-green-400 w-full h-full absolute opacity-50"
          style={{ mixBlendMode: 'plus-lighter' }}
        />
        <div
          className="bg-green-400 w-full h-full absolute opacity-50"
          style={{ mixBlendMode: 'plus-lighter' }}
        />
      </div>
      {/* without mix blend mode plus lighter */}
      <div
        className="w-64 aspect-square relative"
        style={{ isolation: 'isolate' }}
      >
        <div className="bg-green-400 w-full h-full absolute opacity-50" />
        <div className="bg-green-400 w-full h-full absolute opacity-50" />
      </div>
      <div className="bg-green-400 w-64 aspect-square" />
    </div>
  )

  const [show, setShow] = React.useState(false)

  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const content = transitions((styles, item) => {
    if (item) {
      return (
        <a.div className="absolute h-full w-full bg-green-400" style={styles} />
      )
    }

    return (
      <a.div className="absolute h-full w-full bg-green-400" style={styles} />
    )
  })

  return (
    <>
      <div
        style={{ mixBlendMode: 'plus-lighter', isolation: 'isolate' }}
        className="fixed inset-0 grid place-items-center"
      >
        {content}
      </div>
      <button
        onClick={() => {
          setShow((x) => !x)
        }}
        className="fixed top-3 left-3"
      >
        Toggle
      </button>
    </>
  )
}

export default App
