import { useEffect, useRef } from 'react'

function App() {
  const square = useRef<HTMLDivElement>(null)
  const mouseDownTemp = useRef<DOMPoint | null>(null)
  const currentTranslate = useRef<DOMPoint>(new DOMPoint(0, 0))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDownTemp.current === null) return
      if (square.current === null) throw new Error('impossible')

      currentTranslate.current = new DOMPoint(
        e.pageX - mouseDownTemp.current.x,
        e.pageY - mouseDownTemp.current.y
      )

      square.current.style.transform = `translate(${currentTranslate.current.x}px, ${currentTranslate.current.y}px)`
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
          e.pageX - currentTranslate.current.x,
          e.pageY - currentTranslate.current.y
        )
      }}
      className="bg-green-300 w-40 aspect-square m-10"
      id="square"
    />
  )
}

function OrigianlApp() {
  const square = useRef<HTMLDivElement>(null)
  const mouseDownPositionRelativeToElement = useRef<DOMPoint | null>(null)
  const currentTranslate = useRef<DOMPoint>(new DOMPoint(0, 0))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDownPositionRelativeToElement.current === null) return
      if (square.current === null) return

      const element = square.current

      currentTranslate.current = new DOMPoint(
        e.pageX -
          element.offsetLeft -
          mouseDownPositionRelativeToElement.current.x,
        e.pageY -
          element.offsetTop -
          mouseDownPositionRelativeToElement.current.y
      )

      element.style.transform = `translate(${currentTranslate.current.x}px, ${currentTranslate.current.y}px)`
    }

    const handleMouseUp = () => {
      mouseDownPositionRelativeToElement.current = null
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

        const currentPosition = new DOMPoint(
          currentTranslate.current.x + square.current.offsetLeft,
          currentTranslate.current.y + square.current.offsetTop
        )

        mouseDownPositionRelativeToElement.current = new DOMPoint(
          e.pageX - currentPosition.x,
          e.pageY - currentPosition.y
        )
      }}
      className="bg-green-300 w-40 aspect-square m-10"
      id="square"
    />
  )
}

export default App
