import { useState } from 'react'
import { OnDrag2Div } from './OnDrag2Div'
import { a, to, useSpring } from '@react-spring/web'

const AOnDrag2Div = a(OnDrag2Div)
function App() {
  const [slidePosition, setSlidePosition] = useState(0)
  const [hover, setHover] = useState(false)

  const { scale, positionX } = useSpring({
    scale: hover ? 1.1 : 1,
    positionX: slidePosition,
  })

  return (
    <div className="fixed inset-0 overflow-hidden grid place-items-center">
      <AOnDrag2Div
        onDrag2={({ dragStartPosition, windowMouseEvent }) => {
          const element = windowMouseEvent.target as HTMLDivElement

          console.log(element)

          const x = windowMouseEvent.x - dragStartPosition.x

          setSlidePosition(x)
        }}
        onMouseDown={() => {
          setHover(true)
        }}
        onMouseUp={() => {
          setHover(false)
        }}
        onMouseLeave={() => {
          setHover(false)
        }}
        className="bg-black text-white text-4xl px-8 py-3 rounded shadow select-none"
        style={{
          transform: to(
            [positionX, scale],
            (x, s) => `translateX(${x}px) scale(${s})`
          ),
        }}
      >
        Slide.
      </AOnDrag2Div>
    </div>
  )
}

export default App
