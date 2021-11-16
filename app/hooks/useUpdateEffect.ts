import { useEffect } from 'react'
import useIsFirstRender from './useIsFirstRender'

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstRender = useIsFirstRender()

  useEffect(() => {
    if (!isFirstRender) return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useUpdateEffect
