import reactLogo from './assets/react.svg'
import friefoxLogo from './assets/firefox.svg'
import { useSpring, a } from '@react-spring/web'
import React from 'react'

function App() {
  const [flip, setFlip] = React.useState(false)
  const { transform } = useSpring({
    transform: `perspective(1000px) rotateX(${flip ? 0 : 180}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div
        onClick={() => {
          setFlip((x) => !x)
        }}
        className="relative w-72 aspect-square cursor-pointer"
      >
        <a.img
          src={reactLogo}
          alt="react logo"
          className="bg-slate-400 absolute rounded p-2 h-full w-full"
          style={{
            backfaceVisibility: 'hidden',
            transform: transform.to((t) => `${t} rotateX(180deg)`),
          }}
        />
        <a.img
          src={friefoxLogo}
          alt="firefox logo"
          className=" bg-slate-400 absolute rounded p-2 h-full w-full"
          style={{
            backfaceVisibility: 'hidden',
            transform,
          }}
        />
      </div>
    </div>
  )
}

export default App
