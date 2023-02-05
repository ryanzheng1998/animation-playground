import { create } from 'zustand'

interface State {
  count: number
}

const useStore = create<State>(set => ({
  count: 0,
  inc: () => set(state => ({ count: state.count + 1 })),
}))

function App() {
  return (
    <div className="fixed inset-0">
      <div className="bg-green-200 w-52 aspect-square cursor-grab active:cursor-grabbing" />
    </div>
  )
}

export default App
