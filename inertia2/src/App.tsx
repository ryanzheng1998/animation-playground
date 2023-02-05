import { a, useSpring } from '@react-spring/web'
import { useEffect } from 'react'

function App() {
  // use react spring as a state manager
  const [props, api] = useSpring(() => {
    return {
      x: 0,
      y: 0,
      velocityX: 0,
      velocityY: 0,
    }
  })

  // this is okay because we have 100ms to react to user input
  useEffect(() => {
    let animationFrameId: number

    const step = (t1: number) => (t2: number) => {
      const dt = t2 - t1

      const x = props.x.get() + props.velocityX.get() * dt
      const y = props.y.get() + props.velocityY.get() * dt

      api.set({ x, y })

      animationFrameId = requestAnimationFrame(step(t2))
    }

    animationFrameId = requestAnimationFrame(step(performance.now()))

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <a.div
      onPointerDown={e => {
        // problem
        api.set({ velocityX: 0, velocityY: 0 })
        const mouseDownX = e.pageX - props.x.get()
        const mouseDownY = e.pageY - props.y.get()
        const element = e.target as HTMLDivElement
        element.setPointerCapture(e.pointerId)

        let momentum = {
          x: 0,
          y: 0,
        }

        const onPointerMove = (e: PointerEvent) => {
          const x = e.pageX - mouseDownX
          const y = e.pageY - mouseDownY
          // https://github.com/w3c/pointerlock/issues/42
          // what should we do with this?
          momentum = {
            x: e.movementX,
            y: e.movementY,
          }
          api.set({ x, y })
        }

        const onPointerUp = (e: PointerEvent) => {
          element.releasePointerCapture(e.pointerId)
          element.removeEventListener('pointermove', onPointerMove)
          element.removeEventListener('pointerup', onPointerUp)

          api.set({ velocityX: momentum.x, velocityY: momentum.y })
        }

        element.addEventListener('pointermove', onPointerMove)
        element.addEventListener('pointerup', onPointerUp)
      }}
      className="w-32 aspect-square bg-green-300 rounded cursor-grab active:cursor-grabbing"
      style={props}
    />
  )
}

export default App
