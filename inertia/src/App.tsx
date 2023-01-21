import { a, useSpring } from '@react-spring/web'

function App() {
  const [props, api] = useSpring(() => {
    return {
      x: 0,
      y: 0,
      // rotate: 45,
    }
  })
  return (
    <div className="fixed inset-0 grid place-items-center">
      <a.div
        style={{ ...props }}
        className="bg-green-200 w-52 aspect-square"
        onPointerDown={e => {
          const mouseDownX = e.pageX - props.x.get()
          const mouseDownY = e.pageY - props.y.get()
          const element = e.target as HTMLDivElement
          element.setPointerCapture(e.pointerId)

          const onPointerMove = (e: PointerEvent) => {
            api.set({
              x: e.pageX - mouseDownX,
              y: e.pageY - mouseDownY,
            })
          }

          const onPointerUp = (e: PointerEvent) => {
            api.start({
              x: e.pageX - mouseDownX,
              y: e.pageY - mouseDownY,
              config: { velocity: 10, decay: 0.1 },
            })
            element.releasePointerCapture(e.pointerId)
            element.removeEventListener('pointermove', onPointerMove)
            element.removeEventListener('pointerup', onPointerUp)
          }

          element.addEventListener('pointermove', onPointerMove)
          element.addEventListener('pointerup', onPointerUp)
        }}
      />
    </div>
  )
}

export default App
