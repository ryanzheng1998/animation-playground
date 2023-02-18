import { useEffect, useRef } from 'react'

function App() {
  const elementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (element === null) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
    }

    element.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      element.removeEventListener('wheel', onWheel)
    }
  }, [])

  const longElement = new Array(100).fill(0).map((_, i) => {
    return <p key={i}>{i}</p>
  })

  return (
    <>
      <div
        ref={elementRef}
        className="w-32 aspect-square bg-green-400 overflow-auto"
      ></div>
      {longElement}
    </>
  )
}

export default App
