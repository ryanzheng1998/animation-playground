import { a, useSpring } from '@react-spring/web'
import React from 'react'

const keyframe = [
  { scale: 1, config: { duration: 300 } },
  { scale: 0.9, config: { duration: 300 } },
  { scale: 1.1, config: { duration: 100 } },
  { scale: 0.9, config: { duration: 100 } },
  { scale: 1.1, config: { duration: 100 } },
  { scale: 1, config: { duration: 300 } },
]

function App() {
  const [state, setState] = React.useState<boolean | null>(null)

  const props = useSpring({
    from: { scale: 1 },
    to: state === null ? { scale: 1 } : keyframe,
    onChange: ({ value }, api) => {
      if (state === null) return
      console.log(api)
    },
  })

  const props2 = useSpring({
    form: { opacity: 1 },
    to: state === null || state ? { opacity: 1 } : { opacity: 0.3 },
    config: { duration: 1000 },
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      <a.p
        onClick={() => setState((x) => (x === null ? false : !x))}
        className="text-9xl cursor-pointer"
        style={{ transform: props.scale.to((x) => `scale(${x})`), ...props2 }}
      >
        Click
      </a.p>
    </div>
  )
}

export default App
