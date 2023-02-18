import { a, useSpring } from '@react-spring/web'

// https://github.com/jakearchibald/svgomg/blob/e8fff347e3d2362e19ab8b2578c265ad6fb3fbe6/src/js/page/ui/pan-zoom.js
function App() {
  const [props, api] = useSpring(() => {
    return {
      x: 0,
      y: 0,
      scale: 1,
    }
  })

  return (
    <div
      className="fixed inset-0 bg-slate-500"
      onPointerDown={e => {
        const mouseDownX = e.pageX - props.x.get()
        const mouseDownY = e.pageY - props.y.get()
        const element = e.currentTarget
        const targetElement = e.target as HTMLElement
        targetElement.setPointerCapture(e.pointerId)

        const onPointerMove = (e: PointerEvent) => {
          const x = e.pageX - mouseDownX
          const y = e.pageY - mouseDownY
          api.set({ x, y })
        }

        const onPointerUp = (e: PointerEvent) => {
          targetElement.releasePointerCapture(e.pointerId)
          element.removeEventListener('pointermove', onPointerMove)
          element.removeEventListener('pointerup', onPointerUp)
        }

        element.addEventListener('pointermove', onPointerMove)
        element.addEventListener('pointerup', onPointerUp)
      }}
      onWheel={e => {
        const scale = props.scale.get()
        const x = props.x.get()
        const y = props.y.get()
        const delta = Math.max(Math.min(-e.deltaY, 60), -60)
        const scaleDiff = delta / 300 + 1

        const newScale = scale * scaleDiff
        const newX = x + (e.pageX - x) * (1 - scaleDiff)
        const newY = y + (e.pageY - y) * (1 - scaleDiff)

        api.start({ scale: newScale, x: newX, y: newY })
      }}
    >
      <a.div
        className="bg-green-500 w-56 h-56 origin-top-left"
        style={{
          x: props.x,
          y: props.y,
          scale: props.scale,
        }}
      />
    </div>
  )
}

export default App
