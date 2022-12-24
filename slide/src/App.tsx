import { a, useSpring } from '@react-spring/web'

function App() {
  const [props, api] = useSpring(() => {
    return {
      x: 0,
      scale: 1,
    }
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className="relative">
        <a.div
          style={{
            background: props.x.to((x) => (x > 0 ? 'green' : 'red')),
          }}
          className="absolute bg-red-400 inset-0 rounded shadow -z-10 grid items-center"
        >
          <a.div
            style={{
              justifySelf: props.x.to((x) => (x > 0 ? 'left' : 'right')),
              scale: props.x.to((x) => {
                const absX = Math.abs(x)
                if (absX < 50) return 0.5
                if (absX > 300) return 1
                return 0.5 + ((absX - 50) / (300 - 50)) * (1 - 0.5)
              }),
            }}
            className="rounded-full bg-white w-10 aspect-square mx-4"
          />
        </a.div>
        <a.div
          onPointerDown={(e) => {
            api.start({ scale: 1.1 })
            const mouseDownX = e.pageX - props.x.get()
            const element = e.target as HTMLDivElement
            element.setPointerCapture(e.pointerId)

            const onPointerMove = (e: PointerEvent) => {
              const x = e.pageX - mouseDownX
              api.start({
                x,
                immediate: true,
              })
            }

            const onPointerUp = (e: PointerEvent) => {
              api.start({ x: 0, scale: 1 })
              element.releasePointerCapture(e.pointerId)
              element.removeEventListener('pointermove', onPointerMove)
              element.removeEventListener('pointerup', onPointerUp)
            }

            element.addEventListener('pointermove', onPointerMove)
            element.addEventListener('pointerup', onPointerUp)
          }}
          className={`bg-black text-white text-4xl px-12 py-3 rounded shadow select-none active:cursor-grabbing hover:cursor-grab`}
          style={{ x: props.x, scale: props.scale }}
        >
          Slide.
        </a.div>
      </div>
    </div>
  )
}

export default App
