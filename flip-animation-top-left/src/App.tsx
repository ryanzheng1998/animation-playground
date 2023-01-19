// https://css-tricks.com/animating-layouts-with-the-flip-technique/
// https://codepen.io/team/keyframers/pen/MWaoyNQ
// https://gist.github.com/paulirish/5d52fb081b3570c81e3a
// https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/

import { a, to, useSpring } from '@react-spring/web'
import { DependencyList, useEffect, useRef, useState } from 'react'

const useFlip = (dep: DependencyList) => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const firstRef = useRef<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)

  const [props, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    config: {
      // friction: 180,
    },
  }))

  useEffect(() => {
    const element = elementRef.current

    if (element === null) return

    const first = firstRef.current
    const last = {
      x: element.offsetLeft,
      y: element.offsetTop,
      width: element.offsetWidth,
      height: element.offsetHeight,
    }
    firstRef.current = last

    if (first === null) return

    api.set({
      x: first.x - last.x + props.x.get(),
      y: first.y - last.y + props.y.get(),
      scaleX:
        last.width === 0 ? 0 : (first.width / last.width) * props.scaleX.get(),
      scaleY:
        last.height === 0
          ? 0
          : (first.height / last.height) * props.scaleY.get(),
    })

    api.start({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
    })
  }, dep)

  const [padding, setPadding] = useState({ x: 0, y: 0 })

  const [borderRadius, setBorderRadius] = useState<
    | {
        topLeft: number
        topRight: number
        bottomLeft: number
        bottomRight: number
      }
    | undefined
  >(undefined)

  // use measure
  useEffect(() => {
    const element = elementRef.current
    if (element === null) return

    const computedStyle = getComputedStyle(element)

    setBorderRadius({
      topLeft: Number(computedStyle.borderTopLeftRadius.replace('px', '')),
      topRight: Number(computedStyle.borderTopRightRadius.replace('px', '')),
      bottomLeft: Number(
        computedStyle.borderBottomLeftRadius.replace('px', '')
      ),
      bottomRight: Number(
        computedStyle.borderBottomRightRadius.replace('px', '')
      ),
    })

    setPadding({
      x: Number(computedStyle.paddingLeft.replace('px', '')),
      y: Number(computedStyle.paddingTop.replace('px', '')),
    })
  }, [])

  const innerProps = {
    x: props.scaleX.to(x => (x === 0 ? 0 : (1 / x - 1) * padding.x)),
    y: props.scaleY.to(y => (y === 0 ? 0 : (1 / y - 1) * padding.y)),
    scaleX: props.scaleX.to(x => (x === 0 ? 0 : 1 / x)),
    scaleY: props.scaleY.to(x => (x === 0 ? 0 : 1 / x)),
  }

  const newProps = {
    ...props,
    borderTopLeftRadius: to([props.scaleX, props.scaleY], (x, y) => {
      if (borderRadius === undefined || x === 0 || y === 0) return undefined

      return `${borderRadius.topLeft / x}px ${borderRadius.topLeft / y}px`
    }),
    borderTopRightRadius: to([props.scaleX, props.scaleY], (x, y) => {
      if (borderRadius === undefined || x === 0 || y === 0) return undefined

      return `${borderRadius.topRight / x}px ${borderRadius.topRight / y}px`
    }),
    borderBottomLeftRadius: to([props.scaleX, props.scaleY], (x, y) => {
      if (borderRadius === undefined || x === 0 || y === 0) return undefined

      return `${borderRadius.bottomLeft / x}px ${borderRadius.bottomLeft / y}px`
    }),
    borderBottomRightRadius: to([props.scaleX, props.scaleY], (x, y) => {
      if (borderRadius === undefined || x === 0 || y === 0) return undefined

      return `${borderRadius.bottomRight / x}px ${
        borderRadius.bottomRight / y
      }px`
    }),
  }

  return { elementRef, props: newProps, innerProps }
}

function App() {
  const [move, setMove] = useState(false)
  const { elementRef, props, innerProps } = useFlip([move])

  return (
    <a.div
      ref={elementRef}
      onClick={() => setMove(x => !x)}
      className={`grid bg-green-400 p-6 rounded-tr-lg rounded-tl-lg rounded-br-3xl rounded-bl-sm cursor-pointer fixed ${
        move ? 'top-80 left-80 w-96 h-44' : 'top-8 left-8 w-20 h-20'
      }`}
      style={{
        ...props,
        transformOrigin: 'top left',
      }}
    >
      <a.div
        style={{
          ...innerProps,
          transformOrigin: 'top left',
          willChange: 'auto',
        }}
      >
        <p>FLIP</p>
        <p>FLIP</p>
      </a.div>
    </a.div>
  )
}

export default App
