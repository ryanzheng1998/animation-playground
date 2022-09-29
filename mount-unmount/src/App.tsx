import React from 'react'
import { useTransition, a, Transition } from '@react-spring/web'

function App() {
  const [show, setShow] = React.useState(true)

  const transition = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const animatedContent = transition((style, item) => {
    if (!item) return false

    return (
      <a.div className="text-9xl absolute" style={style}>
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
        toggle Show
      </button>
    </>
  )
}

export default App
