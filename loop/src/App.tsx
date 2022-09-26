import { animated, useSpring } from '@react-spring/web'

function App() {
  const { rotateZ } = useSpring({
    from: { rotateZ: 0 },
    to: { rotateZ: 90 },
    loop: true,
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      <animated.div
        style={{ rotateZ }}
        className="bg-green-300 w-28 aspect-square rounded"
      />
    </div>
  )
}

export default App
