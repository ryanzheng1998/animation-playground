import { useEffect, useRef, useState } from 'react'

function App() {
  const square = useRef<HTMLDivElement>(null)
  const mouseDownTemp = useRef<DOMPoint | null>(null)
  const [elementTranslate, setElementTranslate] = useState(new DOMPoint(0, 0))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDownTemp.current === null) return
      if (square.current === null) throw new Error('impossible')

      const newTranslate = new DOMPoint(
        e.pageX - mouseDownTemp.current.x,
        e.pageY - mouseDownTemp.current.y
      )

      // prevent lag
      square.current.style.transform = `translate(${newTranslate.x}px, ${newTranslate.y}px)`

      setElementTranslate(newTranslate)
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
    <div
      ref={square}
      onMouseDown={(e) => {
        if (square.current === null) throw new Error('impossible')

        mouseDownTemp.current = new DOMPoint(
          e.pageX - elementTranslate.x,
          e.pageY - elementTranslate.y
        )
      }}
      // style={{
      //   transform: `translate(${elementTranslate.x}px, ${elementTranslate.y}px)`,
      // }}
      className="bg-green-300 w-40 aspect-square m-10"
      id="square"
    />
  )
}

export default App
