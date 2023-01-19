import { a, useTrail } from '@react-spring/web'
import { useState } from 'react'

const list = ['Hello', 'World', 'Test', 'Trailing']

function App() {
  const [hidden, setHidden] = useState(false)

  const springs = useTrail(list.length, {
    x: hidden ? 30 : 0,
    // https://groups.google.com/a/chromium.org/g/paint-dev/c/3bXUo0X3C5I
    clipPath: hidden
      ? 'polygon(0% 0%, 0% 0%, 100% 0%, 100% 0%)'
      : 'polygon(0% 0%, 0% 150%, 100% 150%, 100% 0%)',
    opacity: hidden ? 0 : 1,
    config: { mass: 5, tension: 2000, friction: 200 },
  })

  const listElement = list.map((x, i) => {
    const style = springs[i]!

    return (
      <a.p key={i} className="text-6xl" style={style}>
        {x}
      </a.p>
    )
  })

  return (
    <div
      onClick={() => setHidden(x => !x)}
      className="fixed inset-0 grid place-items-center"
    >
      <div>{listElement}</div>
    </div>
  )
}

export default App
