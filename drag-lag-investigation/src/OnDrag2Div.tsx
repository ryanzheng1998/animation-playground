import { forwardRef, useEffect, useRef } from 'react'

type DivProps = React.HTMLAttributes<HTMLDivElement>

export const OnDrag2Div = forwardRef<
  HTMLDivElement,
  DivProps & {
    onDrag2?: (event: {
      windowMouseEvent: MouseEvent
      dragStartPosition: DOMPoint
    }) => void
  }
>((p, ref) => {
  const { children, onDrag2, ...props } = p

  const mouseDownPositionRelativeToElement = useRef<DOMPoint | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDownPositionRelativeToElement.current === null) return

      p.onDrag2?.({
        windowMouseEvent: e,
        dragStartPosition: mouseDownPositionRelativeToElement.current,
      })
    }

    const handleMouseUp = () => {
      mouseDownPositionRelativeToElement.current = null
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouseDownPositionRelativeToElement])

  return (
    <div
      {...props}
      ref={ref}
      onMouseDown={(e) => {
        p.onMouseDown?.(e)
        const element = e.currentTarget

        const rect = element.getBoundingClientRect()
        mouseDownPositionRelativeToElement.current = new DOMPoint(
          e.pageX - rect.x,
          e.pageY - rect.y
        )

        console.log(element.offsetTop, element.offsetLeft)
      }}
    >
      {children}
    </div>
  )
})
