import { ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'

export const IFrame = <
  T extends {
    children: ReactNode
  } & React.IframeHTMLAttributes<HTMLIFrameElement>
>({
  children,
  ...props
}: T) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null)
  const mountNode = contentRef?.contentWindow?.document?.body

  return (
    <iframe {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}
function App() {
  return (
    <div>
      <p>Test</p>
      <IFrame
        width={100}
        height={100}
        style={{ pointerEvents: 'none', background: 'black' }}
        sandbox="allow-scripts"
      >
        <div
          className="bg-green-500 pointer-events-none w-72 h-72"
          style={{ width: 60, height: 60, background: 'green' }}
        />
      </IFrame>
    </div>
  )
}

export default App
