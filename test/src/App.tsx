import { a, useSpring } from '@react-spring/web'
import { useState } from 'react'

const App = () => {
  const [move, setMove] = useState(false)

  const prop = useSpring({
    x: move ? 100 : 0,
  })

  return (
    <div
      className="fixed inset-0 grid place-items-center"
      onClick={() => setMove(x => !x)}
    >
      <a.p style={prop}>Test</a.p>
    </div>
  )
}

export default App
