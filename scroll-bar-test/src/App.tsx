function App() {
  return (
    <div
      className="grid h-screen"
      style={{
        gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
        gridAutoFlow: 'column',
      }}
    >
      {new Array(100).fill(0).map((_, i) => (
        <div key={i} className="inline w-7">
          {i}
        </div>
      ))}
    </div>
  )
}

export default App
