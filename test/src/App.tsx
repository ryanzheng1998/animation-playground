const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function App() {
  return (
    <div
      id="10"
      onClick={() => {
        console.log('click')
      }}
      className="w-52 aspect-square bg-green-300"
    />
  )
}

export default App
