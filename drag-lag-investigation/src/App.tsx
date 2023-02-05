import { useEffect, useState } from 'react'

function App() {
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
      className="w-32 aspect-square bg-green-300 rounded"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    />
  )
}

export default App
