import { useEffect, useRef } from 'react'

const squareSize = 128

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const elementPositionRef = useRef({ x: 0, y: 0 })

  // initial draw
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // draw
    const elementPosition = elementPositionRef.current
    ctx.fillStyle = '#86EFAC'
    ctx.fillRect(elementPosition.x, elementPosition.y, squareSize, squareSize)
  }, [])

  return (
    <canvas
      className="h-screen w-screen"
      onPointerDown={e => {
        const position = elementPositionRef.current
        if (
          e.pageX < position.x ||
          e.pageX > position.x + squareSize ||
          e.pageY < position.y ||
          e.pageY > position.y + squareSize
        )
          return

        const mouseDownX = e.pageX - position.x
        const mouseDownY = e.pageY - position.y
        const element = e.currentTarget
        element.setPointerCapture(e.pointerId)

        const onPointerMove = (e: PointerEvent) => {
          const x = e.pageX - mouseDownX
          const y = e.pageY - mouseDownY
          const ctx = element.getContext('2d')
          if (ctx === null) return

          // clear canvas
          ctx.clearRect(0, 0, element.width, element.height)

          // draw
          ctx.fillStyle = '#86EFAC'
          ctx.fillRect(x, y, squareSize, squareSize)

          elementPositionRef.current = { x, y }
        }

        const onPointerUp = (e: PointerEvent) => {
          element.releasePointerCapture(e.pointerId)
          element.removeEventListener('pointermove', onPointerMove)
          element.removeEventListener('pointerup', onPointerUp)
        }

        element.addEventListener('pointermove', onPointerMove)
        element.addEventListener('pointerup', onPointerUp)
      }}
      ref={canvasRef}
    />
  )
}

export default App
