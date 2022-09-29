import { a, useTransition } from '@react-spring/web'
import React from 'react'

function App() {
  const [show, setShow] = React.useState(true)

  const transition = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const animatedContent = transition((style, item) => {
    if (!item) return

    return (
      <a.div className="text-9xl" style={style}>
        ✌️
      </a.div>
    )
  })

  return (
    <>
      <div className="fixed inset-0 grid place-items-center">
        {animatedContent}
      </div>
      <button className="fixed top-3 left-3" onClick={() => setShow((x) => !x)}>
        Toggle Show
      </button>
    </>
  )
}

export default App
