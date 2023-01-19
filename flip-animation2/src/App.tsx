import { a, useSpring } from '@react-spring/web'
import { DependencyList, useEffect, useRef, useState } from 'react'

interface PositionInfo {
  x: number
  y: number
  width: number
  height: number
}

const useFlip = (dep: DependencyList) => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const firstRef = useRef<PositionInfo | null>(null)

  const [props, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    config: { friction: 180 },
  }))

  useEffect(() => {
    const ref = elementRef.current

    if (ref === null) return

    const first = firstRef.current
    const last = {
      x: ref.offsetLeft,
      y: ref.offsetTop,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    }
    firstRef.current = last

    if (first === null) return

    api.set({
      x: first.x - last.x,
      y: first.y - last.y,
      scaleX: first.width / last.width,
      scaleY: first.height / last.height,
    })

    api.start({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    })
  }, dep)

  return { elementRef, props }
}

function App() {
  const [hidden, setHidden] = useState(false)

  const { opacity } = useSpring({ opacity: hidden ? 0 : 1 })
  const { elementRef, props } = useFlip([hidden])
  const flip2 = useFlip([hidden])

  return (
    <div
      className={`grid bg-blue-300 cursor-pointer h-screen overflow-hidden ${
        hidden ? 'grid-cols-1' : 'grid-cols-2'
      }`}
      style={{ placeItems: 'start stretch' }}
      onClick={() => setHidden(x => !x)}
    >
      <a.div
        ref={flip2.elementRef}
        className={`bg-white rounded m-5 p-3 ${hidden ? 'absolute' : 'static'}`}
        style={{ ...flip2.props, transformOrigin: 'top left' }}
      >
        <a.div
          style={{
            scaleX: flip2.props.scaleX.to(x => (x === 0 ? 0 : 1 / x)),
            scaleY: flip2.props.scaleY.to(x => (x === 0 ? 0 : 1 / x)),
            transformOrigin: 'top left',
          }}
        >
          <div className="flex place-items-center gap-3">
            <span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M407.7 224c-3.4 0-14.8.1-18 .3l-64.9 1.7c-.7 0-1.4-.3-1.7-.9L225.8 79.4c-2.9-4.6-8.1-7.4-13.5-7.4h-23.7c-5.6 0-7.5 5.6-5.5 10.8l50.1 142.8c.5 1.3-.4 2.7-1.8 2.7L109 230.1c-2.6.1-5-1.1-6.6-3.1l-37-45c-3-3.9-7.7-6.1-12.6-6.1H36c-2.8 0-4.7 2.7-3.8 5.3l19.9 68.7c1.5 3.8 1.5 8.1 0 11.9l-19.9 68.7c-.9 2.6 1 5.3 3.8 5.3h16.7c4.9 0 9.6-2.3 12.6-6.1L103 284c1.6-2 4.1-3.2 6.6-3.1l121.7 2.7c1.4.1 2.3 1.4 1.8 2.7L183 429.2c-2 5.2-.1 10.8 5.5 10.8h23.7c5.5 0 10.6-2.8 13.5-7.4L323.1 287c.4-.6 1-.9 1.7-.9l64.9 1.7c3.3.2 14.6.3 18 .3 44.3 0 72.3-14.3 72.3-32S452.1 224 407.7 224z"></path>
              </svg>
            </span>
            <h2 className="text-lg">Item List 1</h2>
          </div>
          <ol>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ol>
        </a.div>
      </a.div>
      <a.div
        className="bg-white rounded m-5 p-3"
        ref={elementRef}
        style={{ ...props, transformOrigin: 'top left' }}
      >
        <a.div
          className="overflow-hidden"
          style={{
            scaleX: props.scaleX.to(x => (x === 0 ? 0 : 1 / x)),
            scaleY: props.scaleY.to(x => (x === 0 ? 0 : 1 / x)),
            transformOrigin: 'top left',
          }}
        >
          <div className="flex place-items-center gap-3">
            <span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M407.7 224c-3.4 0-14.8.1-18 .3l-64.9 1.7c-.7 0-1.4-.3-1.7-.9L225.8 79.4c-2.9-4.6-8.1-7.4-13.5-7.4h-23.7c-5.6 0-7.5 5.6-5.5 10.8l50.1 142.8c.5 1.3-.4 2.7-1.8 2.7L109 230.1c-2.6.1-5-1.1-6.6-3.1l-37-45c-3-3.9-7.7-6.1-12.6-6.1H36c-2.8 0-4.7 2.7-3.8 5.3l19.9 68.7c1.5 3.8 1.5 8.1 0 11.9l-19.9 68.7c-.9 2.6 1 5.3 3.8 5.3h16.7c4.9 0 9.6-2.3 12.6-6.1L103 284c1.6-2 4.1-3.2 6.6-3.1l121.7 2.7c1.4.1 2.3 1.4 1.8 2.7L183 429.2c-2 5.2-.1 10.8 5.5 10.8h23.7c5.5 0 10.6-2.8 13.5-7.4L323.1 287c.4-.6 1-.9 1.7-.9l64.9 1.7c3.3.2 14.6.3 18 .3 44.3 0 72.3-14.3 72.3-32S452.1 224 407.7 224z"></path>
              </svg>
            </span>
            <h2 className="text-lg">Item List 2</h2>
          </div>
          <a.ol
            className={`${hidden ? 'absolute' : 'static'}`}
            style={{ opacity }}
          >
            <li>Item 1</li>
            <li>Item 2</li>
          </a.ol>
        </a.div>
      </a.div>
    </div>
  )
}

export default App
