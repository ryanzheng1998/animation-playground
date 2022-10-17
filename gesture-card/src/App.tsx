import { animated, to, useSpring } from '@react-spring/web'
import React from 'react'
import pic from './assets/react.svg'

function App() {
  const [props, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  const [shadow, shadowApi] = useSpring(() => ({
    boxShadow: `0px 10px 30px -5px rgba(0, 0, 0, 0.3)`,
  }))

  const [mouseDownPosition, setMouseDownPosition] =
    React.useState<DOMPoint | null>(null)

  const [mouseInsideElement, setMouseInsideElement] = React.useState(false)

  const elementRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDownPosition === null) return

      document.body.style.cursor = 'grabbing'

      const element = elementRef.current

      if (element === null) return

      const x = e.pageX - element.offsetLeft - mouseDownPosition.x
      const y = e.pageY - element.offsetTop - mouseDownPosition.y

      api.start({
        x,
        y,
        rotateX: 0,
        rotateY: 0,
      })
    }

    const handleMouseUp = () => {
      setMouseDownPosition(null)

      document.body.style.cursor = 'auto'

      if (!mouseInsideElement) {
        api.start({
          scale: 1,
          rotateX: 0,
          rotateY: 0,
        })
        shadowApi.start({ boxShadow: `0px 10px 30px -5px rgba(0, 0, 0, 0.3)` })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseDownPosition, mouseInsideElement, api])

  return (
    <div className="fixed inset-0 grid place-items-center">
      <animated.div
        ref={elementRef}
        onMouseEnter={() => {
          api.start({ scale: 1.1 })
          shadowApi.start({
            boxShadow: `0px 30px 100px -5px rgba(0, 0, 0, 0.5)`,
          })
          setMouseInsideElement(true)
        }}
        onMouseLeave={() => {
          setMouseInsideElement(false)
          if (mouseDownPosition !== null) return
          api.start({ scale: 1, rotateX: 0, rotateY: 0 })
          shadowApi.start({
            boxShadow: `0px 10px 30px -5px rgba(0, 0, 0, 0.3)`,
          })
        }}
        onMouseMove={(e) => {
          if (mouseDownPosition !== null) return
          const element = e.currentTarget
          const x = e.pageX - element.offsetLeft - element.clientWidth / 2
          const y = e.pageY - element.offsetTop - element.clientHeight / 2

          // consider translate
          const nextX = x - props.x.get()
          const nextY = y - props.y.get()

          // rotateX: 0 -> 30
          const xDeg = (nextX / element.clientWidth / 2) * 30
          const yDeg = (nextY / element.clientHeight / 2) * -30

          api.start({
            rotateX: yDeg,
            rotateY: xDeg,
          })
        }}
        onMouseDown={(e) => {
          const element = e.currentTarget
          const x = e.pageX - element.offsetLeft - props.x.get()
          const y = e.pageY - element.offsetTop - props.y.get()

          setMouseDownPosition(new DOMPoint(x, y))
        }}
        className="cursor-grab w-52 aspect-square rounded bg-green-400"
        style={{
          transform: to(
            [props.x, props.y, props.rotateX, props.rotateY, props.scale],
            (x, y, rotateX, rotateY, scale) => {
              return `translate(${x}px, ${y}px) perspective(600px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            }
          ),
          ...shadow,
        }}
      >
        <img className="w-full h-full" src={pic} draggable={false} />
      </animated.div>
    </div>
  )
}

export default App
