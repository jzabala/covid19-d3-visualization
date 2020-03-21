import { useLayoutEffect, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

const useResizeObserver = ref => {
  const [dimensions, setDimensions] = useState(null)
  useLayoutEffect(() => {
    const observerTarget = ref.current
    const resizeObserver = new ResizeObserver(entries =>
      entries.forEach(entry =>
        setDimensions(entry.contentBoxSize || entry.contentRect)
      )
    )
    resizeObserver.observe(observerTarget)

    return () => resizeObserver.unobserve(observerTarget)
  }, [])

  return dimensions
}

export default useResizeObserver
