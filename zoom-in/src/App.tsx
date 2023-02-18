import { a, to, useSpring } from '@react-spring/web'

function App() {
  const init = {
    zoomInPoint: 0,
    observerX: 0,
    objectX: 0,
    scaleX: 1,
  }

  const [props, api] = useSpring(() => {
    return {
      ...init,
    }
  })

  const scaleX = props.scaleX
  const reverseScale = props.scaleX.to(x => 1 / x)

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className="grid place-items-center gap-12">
        <a.div
          className="bg-green-300 w-48 h-3 relative"
          style={{
            scaleX,
            transformOrigin: props.zoomInPoint.to(x => `${x}px 0px`),
          }}
        >
          <a.div
            className="w-10 h-8 border-2 border-black absolute -my-[12px] -mx-[20px]"
            onPointerDown={e => {
              const mouseDownX = e.pageX - props.observerX.get()
              const element = e.currentTarget
              element.setPointerCapture(e.pointerId)

              const onPointerMove = (e: PointerEvent) => {
                const x = e.pageX - mouseDownX
                api.set({ observerX: x })
              }

              const onPointerUp = (e: PointerEvent) => {
                element.releasePointerCapture(e.pointerId)
                element.removeEventListener('pointermove', onPointerMove)
                element.removeEventListener('pointerup', onPointerUp)
              }

              element.addEventListener('pointermove', onPointerMove)
              element.addEventListener('pointerup', onPointerUp)
            }}
            style={{
              transform: to(
                [props.observerX, reverseScale],
                (x, reverseScale) => {
                  return `scaleX(${reverseScale}) translateX(${x}px)`
                }
              ),
            }}
          />
          <a.div
            className="bg-blue-600 w-3 h-3 absolute left-6"
            onPointerDown={e => {
              const mouseDownX = e.pageX - props.objectX.get()
              const element = e.currentTarget
              element.setPointerCapture(e.pointerId)

              const onPointerMove = (e: PointerEvent) => {
                const x = e.pageX - mouseDownX
                api.set({ objectX: x })
              }

              const onPointerUp = (e: PointerEvent) => {
                element.releasePointerCapture(e.pointerId)
                element.removeEventListener('pointermove', onPointerMove)
                element.removeEventListener('pointerup', onPointerUp)
              }

              element.addEventListener('pointermove', onPointerMove)
              element.addEventListener('pointerup', onPointerUp)
            }}
            style={{ x: props.objectX }}
          />
          <a.div
            className="bg-red-400 w-3 h-3 -mx-[6px] absolute rounded-full"
            style={{
              scaleX: reverseScale,
              x: props.zoomInPoint,
            }}
            onPointerDown={e => {
              const mouseDownX = e.pageX - props.zoomInPoint.get()
              const element = e.currentTarget
              element.setPointerCapture(e.pointerId)

              const onPointerMove = (e: PointerEvent) => {
                const x = e.pageX - mouseDownX
                api.set({ zoomInPoint: x })
              }

              const onPointerUp = (e: PointerEvent) => {
                element.releasePointerCapture(e.pointerId)
                element.removeEventListener('pointermove', onPointerMove)
                element.removeEventListener('pointerup', onPointerUp)
              }

              element.addEventListener('pointermove', onPointerMove)
              element.addEventListener('pointerup', onPointerUp)
            }}
          />
        </a.div>

        <div className="grid gap-5 grid-cols-2">
          <button
            onClick={() => api.start({ scaleX: props.scaleX.get() + 10 })}
          >
            Zoom In
          </button>
          <button onClick={() => api.start({ ...init })}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default App
