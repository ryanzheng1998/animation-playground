import { a, config, useSpring } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'

function App() {
  const [props, api] = useSpring(() => {
    return {
      x: 0,
    }
  })

  const mouseDownTempX = useRef<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDownTempX.current === null) return

      api.start({
        x: e.pageX - mouseDownTempX.current,
        config: { duration: 0 },
      })
    }

    const handleMouseUp = () => {
      mouseDownTempX.current = null
      setIsDragging(false)
      api.start({ x: 0, config: config.default })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className="fixed inset-0 grid place-items-center">
      <a.div
        onPointerDown={(e) => {
          setIsDragging(true)
          mouseDownTempX.current = e.pageX - props.x.get()
        }}
        className={`bg-black text-white text-4xl px-8 py-3 rounded shadow select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          transform: props.x.to((x) => `translate(${x}px, 0px)`),
        }}
      >
        Slide.
      </a.div>
    </div>
  )
}

export default App
