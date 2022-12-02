import { OnDrag2Div } from './OnDrag2Div'

const list = 'hello world this is a list'
  .split(' ')
  .map((x) => ({ value: x, key: crypto.randomUUID() }))

function App() {
  return (
    <div>
      {list.map((x) => {
        return (
          <OnDrag2Div
            className="bg-green-300 rounded p-1 m-1 text-center cursor-grab select-none"
            onDrag2={({ dragStartPosition, windowMouseEvent }) => {
              const x = windowMouseEvent.x - dragStartPosition.x
              const y = windowMouseEvent.y - dragStartPosition.y
            }}
            key={x.key}
          >
            {x.value}
          </OnDrag2Div>
        )
      })}
    </div>
  )
}

export default App
