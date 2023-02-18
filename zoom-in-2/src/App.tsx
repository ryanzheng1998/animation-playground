import { a, to, useSpring } from '@react-spring/web'

function App() {
  const init = {
    scaleX: 1,
    transformOriginX: 0,
    objectX: 0,
    observerX: 0,
  }

  const [props, api] = useSpring(() => {
    return {
      ...init,
    }
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className="grid gap-5">
        <div className="relative">
          <a.div
            className="w-10 h-8 border-2 border-black absolute z-10 -my-[12px] -mx-[20px]"
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
              x: props.observerX,
            }}
          />
          <a.div
            className="bg-red-400 w-3 h-3 -mx-[6px] absolute rounded-full z-10"
            style={{
              x: props.transformOriginX,
            }}
            onPointerDown={e => {
              const mouseDownX = e.pageX - props.transformOriginX.get()
              const element = e.currentTarget
              element.setPointerCapture(e.pointerId)

              const onPointerMove = (e: PointerEvent) => {
                const x = e.pageX - mouseDownX
                api.set({ transformOriginX: x })
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
          <a.div
            className="bg-green-300 w-32 h-3"
            style={{
              scaleX: props.scaleX,
              transformOrigin: props.transformOriginX.to(x => `${x}px 0px`),
            }}
          >
            <a.div
              className="bg-blue-600 w-3 h-3 absolute z-10 left-6"
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
              style={{
                transform: to(
                  [props.scaleX, props.objectX],
                  (scaleX, objectX) => {
                    // this have marginal error but it's ok
                    return `scaleX(${
                      1 / scaleX
                    }) translateX(${objectX}px) scaleX(${scaleX})`
                  }
                ),
              }}
            />
          </a.div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <button
            onClick={() => api.start({ scaleX: props.scaleX.get() + 0.3 })}
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
