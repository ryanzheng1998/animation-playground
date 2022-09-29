import { a, useTransition } from '@react-spring/web'
import React from 'react'

function App() {
  const [show, setShow] = React.useState(false)

  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const content = transitions((styles, item) => {
    if (item) {
      return (
        <a.div
          className="text-9xl absolute"
          style={{ ...styles, mixBlendMode: 'plus-lighter' }}
        >
          😄
        </a.div>
      )
    }

    return (
      <a.div
        className="text-9xl absolute"
        style={{ ...styles, mixBlendMode: 'plus-lighter' }}
      >
        🤪
      </a.div>
    )
  })

  return (
    <>
      <div
        style={{ isolation: 'isolate' }}
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
