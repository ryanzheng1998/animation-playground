import { a, useSprings } from '@react-spring/web'

const list = [
  { value: 'hello', color: 'red' },
  { value: 'world', color: 'blue' },
  { value: 'this', color: 'green' },
  { value: 'is', color: 'yellow' },
  { value: 'a', color: 'purple' },
  { value: 'list', color: 'orange' },
  { value: 'of', color: 'pink' },
  { value: 'items', color: 'cyan' },
  { value: 'that', color: 'magenta' },
  { value: 'can', color: 'lime' },
  { value: 'be', color: 'teal' },
  { value: 'dragged', color: 'indigo' },
  { value: 'around', color: 'gray' },
  { value: 'and', color: 'brown' },
  { value: 'sorted', color: 'gold' },
]

function App() {
  const [springs, api] = useSprings(list.length, () => {
    return {
      y: 0,
      z: 0,
      scale: 1,
      boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0)',
    }
  })

  return (
    <div
      className="grid inset-0 place-items-center"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {list.map((x, i) => {
        const props = springs[i]!

        return (
          <a.div
            key={i}
            className="rounded w-32 py-2 text-center m-1 cursor-grab active:cursor-grabbing select-none"
            style={{ ...props, background: x.color }}
            onPointerDown={e => {
              api.start(i2 => {
                if (i !== i2) return
                return {
                  scale: 1,
                  z: 10,
                  boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
                }
              })

              const element = e.currentTarget
              element.setPointerCapture(e.pointerId)

              const mouseDownY = e.pageY - props.y.get() // this is for dragging
              const sortedElementYPosition = (
                [...element.parentNode!.children] as HTMLDivElement[]
              ).map(x => x.offsetTop)

              const getClosestElementYPosition = (y: number) => {
                return (
                  sortedElementYPosition.find((elementY, i) => {
                    const nextYPosition =
                      sortedElementYPosition[i + 1] ?? Infinity

                    return y >= elementY && y <= nextYPosition
                  }) ?? sortedElementYPosition[0]!
                )
              }

              const onPointerMove = (e: PointerEvent) => {
                // drag element
                api.start(i2 => {
                  if (i !== i2) return
                  return {
                    y: e.pageY - mouseDownY,
                    immediate: true,
                  }
                })

                // move other elements
                {
                  const order = sortedElementYPosition
                    .map((el, i2) => {
                      if (i2 === i) {
                        // hack to get the direction of the drag
                        const emptyDirection = e.movementY > 0 ? 1 : -1

                        return {
                          y:
                            getClosestElementYPosition(
                              e.pageY -
                                mouseDownY +
                                element.offsetHeight / 2 +
                                element.offsetTop
                            ) + emptyDirection,
                          key: i2,
                        }
                      }
                      const goal = springs[i2]!.y.get()

                      return { y: goal + el, key: i2 }
                    })
                    .sort((a, b) => a.y - b.y)

                  api.start(i2 => {
                    if (i === i2) return

                    const currentOrder = order.findIndex(x => x.key === i2)

                    return {
                      y:
                        sortedElementYPosition[currentOrder]! -
                        sortedElementYPosition[i2]!,
                    }
                  })
                }
              }

              const onPointerUp = (e: PointerEvent) => {
                api.start(i2 => {
                  if (i !== i2) return

                  const yPosition = getClosestElementYPosition(
                    e.pageY -
                      mouseDownY +
                      element.offsetHeight / 2 +
                      element.offsetTop
                  )

                  return {
                    y: yPosition - element.offsetTop,
                    z: 0,
                    scale: 1,
                    boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0)',
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
