import { a, useSpring } from '@react-spring/web'

const MaxSpeed = 0.5
const SpeedCap = 0.05

const coordinateTranslate = (x: number, upperBound: number) => {
  const offset = Math.abs(x % upperBound)
  const range = Math.abs(Math.floor(x / upperBound))
  const odd = range % 2 === 0
  const reverse = x < 0 ? !odd : odd
  const sign = reverse ? 1 : -1
  const reverseOffset = reverse ? 0 : upperBound

  return sign * offset + reverseOffset
}

const clamp = (num: number, max: number, min: number) =>
  num > max ? max : num < min ? min : num

const velocityCalc = (magnitude: number) => {
  return clamp(magnitude * SpeedCap, MaxSpeed, -MaxSpeed)
}

function App() {
  const width = window.innerWidth - 208
  const height = window.innerHeight - 208

  const [props, api] = useSpring(() => {
    return {
      x: 0,
      y: 0,
    }
  })

  return (
    <div className="fixed inset-0">
      <a.div
        style={{
          x: props.x.to(x => coordinateTranslate(x, width)),
          y: props.y.to(x => coordinateTranslate(x, height)),
        }}
        className="bg-green-200 w-52 aspect-square cursor-grab"
        onPointerDown={e => {
          const xTranslate = coordinateTranslate(props.x.get(), width)
          const yTransltate = coordinateTranslate(props.y.get(), height)
          api.start({
            x: xTranslate,
            y: yTransltate,
          })
          const mouseDownX = e.pageX - xTranslate
          const mouseDownY = e.pageY - yTransltate
          const element = e.target as HTMLDivElement
          element.setPointerCapture(e.pointerId)

          let movement = { x: 0, y: 0 }

          const onPointerMove = (e: PointerEvent) => {
            movement = { x: e.movementX, y: e.movementY }
            api.start({
              x: e.pageX - mouseDownX,
              y: e.pageY - mouseDownY,
              immediate: true,
            })
          }

          const onPointerUp = (e: PointerEvent) => {
            element.releasePointerCapture(e.pointerId)
            element.removeEventListener('pointermove', onPointerMove)
            api.start({
              x: e.pageX - mouseDownX,
              y: e.pageY - mouseDownY,
              config: (key: string) => {
                if (key === 'x')
                  return {
                    velocity: velocityCalc(movement.x),
                    decay: 0.999999999,
                  }

                if (key === 'y')
                  return {
                    velocity: velocityCalc(movement.y),
                    decay: 0.9999999999,
                  }

                return {}
              },
            })
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
