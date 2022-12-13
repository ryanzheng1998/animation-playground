import { a, to, useSpring } from '@react-spring/web'
import { useEffect, useRef } from 'react'

function App() {
  const [props, api] = useSpring(() => {
    return {
      x: 0,
      y: 0,
      config: {
        duration: 0,
      },
    }
  })

  const mouseDownTemp = useRef<DOMPoint | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDownTemp.current === null) return

      api.start({
        x: e.pageX - mouseDownTemp.current.x,
        y: e.pageY - mouseDownTemp.current.y,
      })
    }

    const handleMouseUp = () => {
      mouseDownTemp.current = null
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <a.div
      onMouseDown={(e) => {
        mouseDownTemp.current = new DOMPoint(
          e.pageX - props.x.get(),
          e.pageY - props.y.get()
        )
      }}
      className="w-40 aspect-square bg-green-200"
      style={{
        transform: to(
          [props.x, props.y],
          (x, y) => `translate(${x.toFixed(0)}px, ${y.toFixed(0)}px)`
        ),
      }}
    />
  )
}

export default App
