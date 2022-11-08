import { OnDrag2Div } from './OnDrag2Div'

interface Props {
  hidden: boolean
  size: DOMPoint
  order: number
  position: DOMPoint
  content: string
  title: string
  onTitleDrag: (e: {
    windowMouseEvent: MouseEvent
    dragStartPosition: DOMPoint
  }) => void
  onTitleMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onClose: () => void
  onMinimize: () => void
}

export const Window: React.FC<Props> = (window) => {
  return (
    <div
      className={`absolute rounded bg-white overflow-hidden shadow ${
        window.hidden ? 'hidden' : ''
      }`}
      style={{
        width: window.size.x,
        height: window.size.y,
        transform: `translate(${window.position.x}px, ${window.position.y}px)`,
        zIndex: window.order,
      }}
    >
      {/* <div className="absolute w-full h-1 cursor-ns-resize" /> */}
      <OnDrag2Div
        onDrag2={window.onTitleDrag}
        onMouseDown={window.onTitleMouseDown}
        className="grid px-4 py-2 bg-blue-100 grid-cols-[1fr_auto_auto] select-none cursor-grab"
      >
        <h2>Title</h2>
        <svg
          className="w-6 aspect-square cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={window.onMinimize}
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
        >
          <title>Remove</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M400 256H112"
          />
        </svg>
        <svg
          className="w-6 aspect-square cursor-pointer"
          onClick={window.onClose}
          onMouseDown={(e) => {
            e.stopPropagation()
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <title>Close</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M368 368L144 144M368 144L144 368"
          />
        </svg>
      </OnDrag2Div>
      <div>{window.content}</div>
    </div>
  )
}
