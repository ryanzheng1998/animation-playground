import { useEffect, useRef, useState } from 'react'

function App() {
  const element = useRef<HTMLDivElement>(null)
  const element2 = useRef<HTMLDivElement>(null)
  const [elementPosition, setElementPosition] = useState(new DOMPoint(0, 0))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (element.current === null) return
      if (element2.current === null) return

      const newTranslate = new DOMPoint(
        e.pageX - elementPosition.x,
        e.pageY - elementPosition.y
      )

      // prevent lag
      element.current.style.transform = `translate(${newTranslate.x}px, ${newTranslate.y}px)`
      element2.current.style.transform = `translate(${newTranslate.x}px, ${newTranslate.y}px)`

      setElementPosition(newTranslate)
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="relative">
      <div
        className="w-40 absolute aspect-square bg-blue-300"
        style={{
          transform: `translate(${elementPosition.x}px, ${elementPosition.y}px)`,
        }}
      />
      <div
        ref={element2}
        className="absolute w-40 aspect-square bg-green-300"
      />
      <div
        ref={element}
        style={{
          transform: `translate(${elementPosition.x}px, ${elementPosition.y}px)`,
        }}
        className="absolute w-40 aspect-square bg-red-300"
      />
    </div>
  )
}

export default App
