import React from 'react'

function App() {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const element = ref.current

    if (element === null) return

    const result = element.getBoundingClientRect()
    console.log(result)
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div
        ref={ref}
        className="w-32 h-32 bg-green-400"
        style={{ transform: 'rotateZ(45deg) translate(300px, 0)' }}
      />
    </div>
  )
}

export default App
