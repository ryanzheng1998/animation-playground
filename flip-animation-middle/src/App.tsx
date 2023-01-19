import { a, to, useSpring } from '@react-spring/web'
import { DependencyList, useEffect, useRef, useState } from 'react'

interface PositionInfo {
  x: number
  y: number
  width: number
  height: number
}

const useFlip = (dep: DependencyList) => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const firstRef = useRef<PositionInfo | null>(null)

  const [props, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    config: {
      friction: 180,
    },
  }))

  useEffect(() => {
    const element = elementRef.current

    if (element === null) return

    const first = firstRef.current
    const last = {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: element.offsetWidth,
      height: element.offsetHeight,
    }
    firstRef.current = last

    if (first === null) return

    api.set({
      x: first.x - last.x + props.x.get(),
      y: first.y - last.y + props.y.get(),
      scaleX:
        last.width === 0 ? 0 : (first.width / last.width) * props.scaleX.get(),
      scaleY:
        last.height === 0
          ? 0
          : (first.height / last.height) * props.scaleY.get(),
    })

    api.start({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    })
  }, dep)

  return { elementRef, props }
}

// https://css-tricks.com/animating-layouts-with-the-flip-technique/
// https://codepen.io/team/keyframers/pen/MWaoyNQ
function App() {
  const [move, setMove] = useState(false)
  const { elementRef, props } = useFlip([move])

  return (
    <a.div
      ref={elementRef}
      onClick={() => setMove(x => !x)}
      className={`grid bg-green-400 place-items-center cursor-pointer fixed ${
        move ? 'top-80 left-80 w-96 h-44' : 'top-8 left-8 w-20 h-20'
      }`}
      style={{
        ...props,
        transformOrigin: 'top left',
        borderRadius: to(
          [props.scaleX, props.scaleY],
          (x, y) => `${10 / x}px / ${10 / y}px`
        ),
      }}
    >
      <a.p
        style={{
          scaleX: props.scaleX.to(x => (x === 0 ? 0 : 1 / x)),
          scaleY: props.scaleY.to(x => (x === 0 ? 0 : 1 / x)),
        }}
      >
        FLIP
      </a.p>
    </a.div>
  )
}

export default App
