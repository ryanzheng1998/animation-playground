import { animated, useSpring } from '@react-spring/web'
import React from 'react'
import pic from './assets/react.svg'

function App() {
  const [props, api] = useSpring(() => ({
    transform: 'perspective(1000px)',
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    x: 0,
    y: 0,
  }))

  const [mouseDownPosition, setMouseDownPosition] =
    React.useState<DOMPoint | null>(null)

  const elementRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDownPosition === null) return

      const element = elementRef.current

      if (element === null) return

      const x = e.pageX - element.offsetLeft - mouseDownPosition.x
      const y = e.pageY - element.offsetTop - mouseDownPosition.y

      console.log(e.pageX, element.offsetLeft, mouseDownPosition.x)

      api.start({
        x,
        y,
      })
    }

    const handleMouseUp = () => {
      setMouseDownPosition(null)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseDownPosition])

  return (
    <div className="fixed inset-0 grid place-items-center">
      <animated.div
        ref={elementRef}
        onMouseEnter={() => {
          // api.start({ scale: 1.2 })
        }}
        onMouseLeave={(e) => {
          api.start({ scale: 1, rotateX: 0, rotateY: 0 })
        }}
        onMouseMove={(e) => {
          const element = e.currentTarget
          // rotate section
          // {
          //   const x = e.pageX - element.offsetLeft - element.clientWidth / 2
          //   const y = e.pageY - element.offsetTop - element.clientHeight / 2

          //   // rotateX: 0 -> 30
          //   const xDeg = (x / element.clientWidth / 2) * 30
          //   const yDeg = (y / element.clientHeight / 2) * -30

          //   api.start({
          //     rotateX: yDeg,
          //     rotateY: xDeg,
          //   })
          // }
        }}
        onMouseDown={(e) => {
          const element = e.currentTarget
          const x = e.pageX - element.offsetLeft - props.x.get()
          const y = e.pageY - element.offsetTop - props.y.get()

          setMouseDownPosition(new DOMPoint(x, y))
        }}
        className="shadow-xl cursor-grab w-72 aspect-square rounded bg-green-400"
        style={props}
      >
        <img className="w-full h-full" src={pic} draggable={false} />
      </animated.div>
    </div>
  )
}

export default App
