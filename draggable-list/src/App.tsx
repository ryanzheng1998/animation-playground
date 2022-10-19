import { listToObject } from './listToObject'

const list = 'hello world this is a list'.split(' ')
const listObject = listToObject(list)

function App() {
  return <p className="bg-red-200">Hello World</p>
}

export default App
