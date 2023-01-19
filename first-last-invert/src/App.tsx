import { a } from '@react-spring/web'
function App() {
  return (
    <div className="flex gap-3">
      {/* first */}
      <div className={`grid bg-green-400 place-items-center w-44 h-44`}>
        <div>Test</div>
      </div>
      {/* last */}
      <div className={`grid bg-green-400 place-items-center left-80 w-20 h-20`}>
        <div>Test</div>
      </div>
      {/* invert middle */}
      <a.div
        className={`grid bg-green-400 place-items-center left-80 w-20 h-20`}
        style={{
          x: 0,
          y: 0,
          scaleX: (176 / 80) * 0.5,
          scaleY: (176 / 80) * 0.5,
          transformOrigin: 'top left',
        }}
      >
        <a.div
          style={{
            scaleX: (80 / 176) * 2,
            scaleY: (80 / 176) * 2,
            // transformOrigin: 'top left',
          }}
        >
          Test
        </a.div>
      </a.div>
      {/* invert final */}
      <a.div
        className={`grid bg-green-400 place-items-center left-80 w-20 h-20`}
        style={{
          x: 0,
          y: 0,
          scaleX: 176 / 80,
          scaleY: 176 / 80,
          transformOrigin: 'top left',
        }}
      >
        <a.div
          style={{
            x: 0,
            y: 0,
            scaleX: 80 / 176,
            scaleY: 80 / 176,
            // transformOrigin: 'top left',
          }}
        >
          Test
        </a.div>
      </a.div>
    </div>
  )
}

export default App
