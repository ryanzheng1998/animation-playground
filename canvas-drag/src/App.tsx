import { useEffect, useRef } from 'react'

const squareSize = 100

interface State {
  height: number
  width: number
  square: {
    x: number
    y: number
  }
  mouseDown: {
    x: number
    y: number
  } | null
  squareHover: boolean
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const stateRef = useRef<State>({
    height: window.innerHeight,
    width: window.innerWidth,
    square: {
      x: 0,
      y: 0,
    },
    mouseDown: null,
    squareHover: false,
  })

  const positionInSquare = (position: { x: number; y: number }) => {
    const state = stateRef.current
    const square = state.square
    return (
      position.x >= square.x &&
      position.x <= square.x + squareSize &&
      position.y >= square.y &&
      position.y <= square.y + squareSize
    )
  }

  useEffect(() => {
    const onResize = () => {
      const state = stateRef.current
      state.height = window.innerHeight
      state.width = window.innerWidth
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const step = (t1: number) => (t2: number) => {
      const canvas = canvasRef.current
      const state = stateRef.current
      if (canvas === null) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // set canvas size
      canvas.width = state.width
      canvas.height = state.height

      // clear canvas
      ctx.fillStyle = 'white'
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // draw
      const square = state.square
      ctx.fillStyle = 'green'
      ctx.fillRect(square.x, square.y, squareSize, squareSize)

      // cursor
      canvas.style.cursor = (() => {
        if (state.mouseDown !== null) return 'grabbing'
        if (state.squareHover) return 'grab'

        return 'default'
      })()

      animationFrameId = requestAnimationFrame(step(t2))
    }

    animationFrameId = requestAnimationFrame(step(performance.now()))

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      className="h-screen w-screen"
      onPointerDown={e => {
        const state = stateRef.current
        if (positionInSquare({ x: e.pageX, y: e.pageY })) {
          state.mouseDown = {
            x: e.pageX - state.square.x,
            y: e.pageY - state.square.y,
          }
        }
      }}
      onPointerMove={e => {
        if (positionInSquare({ x: e.pageX, y: e.pageY })) {
          stateRef.current.squareHover = true
        } else {
          stateRef.current.squareHover = false
        }
        const state = stateRef.current
        const mouseDown = state.mouseDown
        if (mouseDown === null) return
        const x = e.pageX - mouseDown.x
        const y = e.pageY - mouseDown.y
        state.square = { x, y }
      }}
      onPointerUp={e => {
        stateRef.current.mouseDown = null
      }}
      ref={canvasRef}
    />
  )
}

export default App
