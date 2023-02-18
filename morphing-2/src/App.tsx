import { a, useSpring } from '@react-spring/web'
import { useState } from 'react'

function App() {
  const [star, setStar] = useState(false)
  const props = useSpring({
    d: star ? 'M 0 0 H 512 V 512 H 0 Z' : 'M 0 0 H 30 V 30 H 0 Z',
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      <svg
        className="w-80 aspect-square"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        onClick={() => setStar(x => !x)}
      >
        <title>Star</title>
        <a.path d={props.d} />
      </svg>
    </div>
  )
}

export default App
