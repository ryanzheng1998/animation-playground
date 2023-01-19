import { a, useSprings, useTrail } from '@react-spring/web'
import { useState } from 'react'

const list = ['Hello', 'World', 'Test', 'Trailing']

function App() {
  const [hidden, setHidden] = useState(false)

  const [springs] = useSprings(
    list.length,
    i => {
      return {
        x: hidden ? 100 : 0,
        delay: i * 80,
      }
    },
    [hidden]
  )

  const springs2 = useTrail(list.length, {
    x: hidden ? 100 : 0,
  })

  const listElement = list.map((x, i) => {
    const style = springs[i]!

    return (
      <a.p key={i} style={{ x: style.x }}>
        {x}
      </a.p>
    )
  })

  const listElement2 = list.map((x, i) => {
    const style = springs2[i]!
    return (
      <a.p key={i} style={{ x: style.x }}>
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
      <div>{listElement2}</div>
    </div>
  )
}

export default App
