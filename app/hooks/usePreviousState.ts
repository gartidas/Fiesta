import { useRef } from 'react'
import useUpdateEffect from './useUpdateEffect'

const usePreviousState = <T>(state: T) => {
  const current = useRef(state)
  const previous = useRef<T>()

  const memoizedState = JSON.stringify(state)

  useUpdateEffect(() => {
    previous.current = current.current
    current.current = state
  }, [memoizedState])

  return previous.current
}

export default usePreviousState
