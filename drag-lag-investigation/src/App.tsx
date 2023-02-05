import { a, useSpring } from '@react-spring/web'
import { useEffect, useState } from 'react'

function App() {
  // use react spring as a state manager
  const [props, api] = useSpring(() => {
    return {
      x: 0,
      y: 0,
    }
  })

  return (
    <a.div
      onPointerDown={e => {
        const mouseDownX = e.pageX - props.x.get()
        const mouseDownY = e.pageY - props.y.get()
        const element = e.target as HTMLDivElement
        element.setPointerCapture(e.pointerId)

        const onPointerMove = (e: PointerEvent) => {
          const x = e.pageX - mouseDownX
          const y = e.pageY - mouseDownY
          api.start({ x, y, immediate: true })
        }

        const onPointerUp = (e: PointerEvent) => {
          element.releasePointerCapture(e.pointerId)
          element.removeEventListener('pointermove', onPointerMove)
          element.removeEventListener('pointerup', onPointerUp)
        }

        element.addEventListener('pointermove', onPointerMove)
        element.addEventListener('pointerup', onPointerUp)
      }}
      className="w-32 aspect-square bg-green-300 rounded cursor-grab active:cursor-grabbing"
      style={props}
    />
  )
}

function AppBad() {
  const [position, setPosition] = useState(new DOMPoint(0, 0))

  useEffect(() => {
    const step = (t1: number) => (t2: number) => {
      console.log(t2)
      requestAnimationFrame(step(t2))
    }

    requestAnimationFrame(step(0))
  }, [])

  console.log('render triggered', performance.now())

  return (
    <div
      onPointerDown={e => {
        const mouseDownX = e.pageX - position.x
        const mouseDownY = e.pageY - position.y
        const element = e.target as HTMLDivElement
        element.setPointerCapture(e.pointerId)

        const onPointerMove = (e: PointerEvent) => {
          const x = e.pageX - mouseDownX
          const y = e.pageY - mouseDownY
          // setState is async, so this is not a good idea
          setPosition(new DOMPoint(x, y))
          console.log('mousemove triggered', performance.now())
        }

        const onPointerUp = (e: PointerEvent) => {
          element.releasePointerCapture(e.pointerId)
          element.removeEventListener('pointermove', onPointerMove)
          element.removeEventListener('pointerup', onPointerUp)
        }

        element.addEventListener('pointermove', onPointerMove)
        element.addEventListener('pointerup', onPointerUp)
      }}
      className="w-32 aspect-square bg-green-300 rounded cursor-grab active:cursor-grabbing"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    />
  )
}

export default App
