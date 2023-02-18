import { a, useSpring } from '@react-spring/web'
import { useState } from 'react'

function App() {
  const [show, setShow] = useState(false)

  const props = useSpring({ x: show ? 0 : 1, opacity: show ? 1 : 0 })

  return (
    <div
      className="fixed grid place-items-center inset-0"
      onClick={() => {
        setShow(x => !x)
      }}
    >
      <a.svg
        viewBox="0 0 512 512"
        className="w-24 aspect-square absolute -mt-24"
        style={{
          x: props.x.to({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [0, 5, -5, 5, -5, 5, -5, 0],
          }),
          opacity: props.opacity,
        }}
      >
        <path d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"></path>
      </a.svg>

      <div className="w-4 -m-2 aspect-square bg-red-500 rounded-full cursor-pointer" />
    </div>
  )
}

export default App
