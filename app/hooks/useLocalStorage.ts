import { useCallback, useEffect, useRef, useState } from 'react'

type ReturnType<T> = [T, (value: T | ((val: T) => T)) => void]

function useLocalStorage<T>(key: string, initialValue: T): ReturnType<T> {
  //Note: memoizing initialValue using ref
  const initialValueRef = useRef(initialValue)

  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValueRef.current
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValueRef.current
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValueRef.current
    }
  }, [key])

  const [storedValue, setStoredValue] = useState<T>(readValue)

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      if (typeof window == 'undefined') {
        console.warn(
          `Tried setting localStorage key “${key}” even though environment is not a client`
        )
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value
        window.localStorage.setItem(key, JSON.stringify(newValue))
        setStoredValue(newValue)
        window.dispatchEvent(new Event('local-storage'))
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error)
      }
    },
    [key, storedValue]
  )

  useEffect(() => {
    setStoredValue(readValue())
  }, [readValue])

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('local-storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage', handleStorageChange)
    }
  }, [readValue])

  return [storedValue, setValue]
}

export default useLocalStorage
