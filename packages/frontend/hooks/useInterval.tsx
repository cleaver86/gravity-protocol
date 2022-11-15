import { useEffect, useRef } from 'react'

/* istanbul ignore next */
/** keep typescript happy */
const noop = () => {}

const useInterval = (callback: () => void, delay: number = 1000) => {
  const savedCallback = useRef(noop)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  })

  // Set up the interval.
  useEffect(() => {
    const tick = () => savedCallback.current()
    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}

export default useInterval
