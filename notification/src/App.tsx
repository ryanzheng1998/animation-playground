import { faker } from '@faker-js/faker'
import { a, useSpring, useTransition } from '@react-spring/web'
import React from 'react'

function App() {
  const [items, setItems] = React.useState<{ key: string; message: string }[]>(
    []
  )
  const firstRefs = React.useRef(new WeakMap<HTMLDivElement, DOMPoint>())

  const [flip, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }))

  const transitions = useTransition(items, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const content = transitions((styles, item) => {
    return (
      <a.div
        ref={(ref) => {
          if (ref === null) return

          const first = firstRefs.current.get(ref)
          const last = ref.getBoundingClientRect()
          firstRefs.current.set(ref, new DOMPoint(last.x, last.y))

          if (first === undefined) return

          api.set({ x: first.x - last.x, y: first.y - last.y })

          api.start({
            x: 0,
            y: 0,
          })
        }}
        className="grid grid-cols-[auto_32px] bg-neutral-900/50 rounded-lg shadow-lg p-4 gap-4"
        key={item.key}
        style={{ ...styles, ...flip }}
      >
        <p>{item.message}</p>
        <svg
          onClick={() => {
            setItems((x) => x.filter((x) => x.key !== item.key))
          }}
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <title>Close</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            d="M368 368L144 144M368 144L144 368"
          />
        </svg>
      </a.div>
    )
  })

  return (
    <>
      <div
        onClick={() => {
          setItems((x) => [
            ...x,
            { key: crypto.randomUUID(), message: faker.lorem.lines() },
          ])
        }}
        className="fixed inset-0 grid place-items-center cursor-pointer bg-gray-300 select-none"
      >
        <p>Click here to create notifications</p>
      </div>
      <div className="fixed bottom-0 left-0 flex flex-col m-4 gap-2">
        {content}
      </div>
    </>
  )
}

export default App
