import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
    }

    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  return <div className="w-9 aspect-square bg-green-400"></div>
}

export default App
