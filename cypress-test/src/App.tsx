import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

function PullRelease() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, active, movement: [mx] }) => {
    api.start({ x: down ? mx : 0, immediate: down })
  })

  // Bind it to a component
  return (
    <animated.div
      id="box"
      className="bg-green-300 w-80 aspect-square cursor-grab touch-none active:cursor-grabbing"
      {...bind()}
      style={{ x, y }}
    />
  )
}

export default PullRelease
