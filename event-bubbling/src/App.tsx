function App() {
  return (
    <>
      <div
        onPointerDown={e => {
          const element = e.currentTarget
          const onPointerMove = (e: PointerEvent) => {
            console.log('move')
          }

          const onPointerUp = (e: PointerEvent) => {
            element.releasePointerCapture(e.pointerId)
            element.removeEventListener('pointermove', onPointerMove)
            element.removeEventListener('pointerup', onPointerUp)
          }

          element.addEventListener('pointermove', onPointerMove)
          element.addEventListener('pointerup', onPointerUp)

          const targetElement = e.target as HTMLElement
          targetElement.setPointerCapture(e.pointerId)
          console.log('aa')
        }}
      >
        <div
          className="w-10 h-10 bg-green-400"
          onClick={() => {
            console.log('bb')
          }}
        />
        <div
          className="w-10 h-10 bg-red-400"
          onClick={() => {
            console.log('cc')
          }}
        />
      </div>
      <div
        onClick={() => {
          console.log('cc')
        }}
      ></div>
    </>
  )
}

export default App
