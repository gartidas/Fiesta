import { useEffect, useState, useCallback } from 'react'
import { LG, MD, SM, XL } from '@contextProviders/AppThemeProvider/theme'

export interface UseWindowSizeReturn {
  maxSmall: boolean
  maxMedium: boolean
  maxLarge: boolean
  maxExtraLarge: boolean
  minSmall: boolean
  minMedium: boolean
  minLarge: boolean
  minExtraLarge: boolean
  width: number
  height: number
}

export const useWindowSize = (): UseWindowSizeReturn => {
  const isClient = typeof window === 'object'

  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : -1,
      height: isClient ? window.innerHeight : -1
    }),
    [isClient]
  )

  const [windowSize, setWindowSize] = useState(getSize)
  const maxSmall = windowSize.width <= SM
  const minSmall = windowSize.width > SM
  const maxMedium = windowSize.width <= MD
  const minMedium = windowSize.width > MD
  const maxLarge = windowSize.width <= LG
  const minLarge = windowSize.width > LG
  const maxExtraLarge = windowSize.width <= XL
  const minExtraLarge = windowSize.width > XL

  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getSize, isClient])

  return {
    ...windowSize,
    maxSmall,
    maxMedium,
    maxLarge,
    maxExtraLarge,
    minSmall,
    minMedium,
    minLarge,
    minExtraLarge
  }
}

export default useWindowSize
