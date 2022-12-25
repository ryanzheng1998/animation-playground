import { a, useSprings } from '@react-spring/web'
import { useEffect, useRef } from 'react'

const list = 'hello world this is a list'
  .split(' ')
  .map((x) => ({ value: x, key: crypto.randomUUID() }))

function App() {
  const [springs, api] = useSprings(list.length, () => {
    return {
      y: 0,
      z: 0,
      scale: 1,
    }
  })

  const elementInfo = useRef<{ ref: HTMLDivElement; order: number }[]>([])
  const rects = useRef<DOMRect[]>([])

  // sync with element's position
  useEffect(() => {
    const update = () => {
      rects.current = elementInfo.current.map((info) => {
        return info.ref.getBoundingClientRect()
      })
    }

    update()

    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="grid inset-0 place-items-center">
      {list.map((x, i) => {
        const props = springs[i]!

        return (
          <a.div
            key={x.key}
            className="bg-green-300 rounded w-32 py-2 text-center m-1 cursor-grab active:cursor-grabbing select-none"
            style={{ ...props }}
            ref={(ref) => {
              elementInfo.current[i] = {
                ref: ref!,
                order: i,
              }
            }}
            onPointerDown={(e) => {
              api.start((i2) => {
                if (i !== i2) return
                return {
                  scale: 1.1,
                }
              })

              const mouseDownY = e.pageY - props.y.get()
              const element = e.target as HTMLDivElement
              element.setPointerCapture(e.pointerId)

              const onPointerMove = (e: PointerEvent) => {
                const y = e.pageY - mouseDownY

                // update the order
                const currentOrder = elementInfo.current[i].order
                const newOrder = rects.current.findIndex((rect) => {
                  return y > rect.y && y < rect.y + rect.height
                })
                const swapOrder =
                  elementInfo.current.find((x) => x.order === newOrder)
                    ?.order ?? currentOrder

                console.log(currentOrder, newOrder)

                elementInfo.current = elementInfo.current.map((x, i2) => {
                  if (i2 === i) {
                    return {
                      ...x,
                      order: swapOrder,
                    }
                  }

                  if (x.order === newOrder) {
                    return {
                      ...x,
                      order: currentOrder,
                    }
                  }

                  return {
                    ...x,
                  }
                })

                api.start((i2) => {
                  if (i !== i2) {
                    const order = elementInfo.current[i2].order

                    return {
                      y: rects.current[order].y - rects.current[i2].y,
                    }
                  }

                  return {
                    y,
                    z: 10,
                    immediate: true,
                  }
                })
              }

              const onPointerUp = (e: PointerEvent) => {
                api.start((i2) => {
                  const order = elementInfo.current[i2].order

                  return {
                    y: rects.current[order].y - rects.current[i2].y,
                    z: 0,
                    scale: 1,
                  }
                })
                element.releasePointerCapture(e.pointerId)
                element.removeEventListener('pointermove', onPointerMove)
                element.removeEventListener('pointerup', onPointerUp)
              }

              element.addEventListener('pointermove', onPointerMove)
              element.addEventListener('pointerup', onPointerUp)
            }}
          >
            {x.value}
          </a.div>
        )
      })}
    </div>
  )
}

export default App
