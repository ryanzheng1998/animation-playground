import { animated, useSpring } from '@react-spring/web'
import pic from './assets/react.svg'

function App() {
  const [props, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    x: 0,
    y: 0,
  }))

  return (
    <div className="fixed inset-0 grid place-items-center">
      <animated.div
        onMouseEnter={() => {
          api.start({ scale: 1.2 })
        }}
        onMouseLeave={() => {
          api.start({ scale: 1, rotateX: 0, rotateY: 0 })
        }}
        onMouseMove={(e) => {
          const element = e.currentTarget
          const x = e.pageX - element.offsetLeft - element.clientWidth / 2
          const y = e.pageY - element.offsetTop - element.clientHeight / 2
          console.log(x, y)

          // rotateX: 0 -> 30
          const xDeg = (x / element.clientWidth / 2) * 30
          const yDeg = (y / element.clientHeight / 2) * 30

          console.log(xDeg, yDeg)

          api.start({
            rotateX: yDeg,
            rotateY: xDeg,
          })
        }}
        className="shadow-xl cursor-grab w-72 aspect-square bg-green-400"
        style={props}
      >
        <img className="w-full h-full" src={pic} />
      </animated.div>
    </div>
  )
}

export default App
