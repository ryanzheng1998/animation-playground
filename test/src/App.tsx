import React from 'react'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function App() {
  const [count, setCount] = React.useState(0)

  return (
    <div className="flex gap-2">
      <p>number: {count}</p>
      <button onClick={() => setCount((x) => x + 1)}>plus</button>
      <button
        onClick={async () => {
          await delay(5000)
          console.log(count)
        }}
      >
        test
      </button>
    </div>
  )
}

export default App
