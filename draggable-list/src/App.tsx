import { a, useSprings } from '@react-spring/web'

const list = [
  { value: 'hello', color: 'red' },
  { value: 'world', color: 'blue' },
  { value: 'this', color: 'green' },
  { value: 'is', color: 'yellow' },
  { value: 'a', color: 'purple' },
  { value: 'list', color: 'orange' },
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
            onPointerDown={(e) => {
              api.start((i2) => {
                if (i !== i2) return
                return {
                  scale: 1.1,
                  z: 10,
                  boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.5)',
                }
              })

              const mouseDownY = e.pageY - props.y.get() // this is for dragging
              const element = e.target as HTMLDivElement
              element.setPointerCapture(e.pointerId)
              const elements = [
                ...element.parentNode!.children,
              ] as HTMLDivElement[]

              const getClosestElementYPosition = (y: number) => {
                return (
                  elements.find((el, i) => {
                    const nextElement = elements[i + 1]
                    const nextElementYPosition =
                      nextElement?.offsetTop ?? Infinity

                    return y > el.offsetTop && y < nextElementYPosition
                  })?.offsetTop ?? elements[0]!.offsetTop
                )
              }

              const onPointerMove = (e: PointerEvent) => {
                // drag element
                api.start((i2) => {
                  if (i !== i2) return
                  return {
                    y: e.pageY - mouseDownY,
                    immediate: true,
                  }
                })

                // update swap element
                // change to find empty slot to swap with
                {
                  const yPosition = getClosestElementYPosition(e.pageY)
                  const yPositions = elements.map((el, i) => {
                    const goal = springs[i]!.y.goal
                    return getClosestElementYPosition(goal + el.offsetTop)
                  })
                  const emptySlot = elements.find((el) => {
                    return yPositions.some((x) => x === el.offsetTop)
                  })

                  api.start((i2) => {
                    if (i === i2) return
                    if (emptySlot === undefined) return

                    const emptyYPosition = emptySlot.offsetTop

                    const currentYPosition = yPositions[i2]!

                    if (emptyYPosition > yPosition) {
                      console.log(currentYPosition, emptyYPosition)
                      if (
                        currentYPosition > emptyYPosition ||
                        yPosition < emptyYPosition
                      )
                        return

                      const positionIndex = elements.findIndex(
                        (el) => el.offsetTop === currentYPosition
                      )

                      return {
                        y: elements[positionIndex]!.offsetTop,
                      }
                    }

                    return {}
                  })
                }
              }

              const onPointerUp = (e: PointerEvent) => {
                api.start((i2) => {
                  if (i !== i2) return

                  const yPosition = getClosestElementYPosition(e.pageY)

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
