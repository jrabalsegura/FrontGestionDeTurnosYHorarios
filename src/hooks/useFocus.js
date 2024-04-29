import { useRef, useState, useCallback, useEffect } from 'react';

export const useFocus = () => {
    const ref = useRef(null)
    const [isFocused, setIsFocused] = useState(false)
    const toggle = useCallback(() => {
      setIsFocused(!isFocused)
    }, [isFocused])
  
    useEffect(() => {
      const element = ref.current
  
      element?.addEventListener('focus', toggle)
      element?.addEventListener('blur', toggle)
  
      return () => {// callback/cleanup to run every render. It's not a big deal ...
        element?.removeEventListener('focus', toggle)
        element?.removeEventListener('blur', toggle)
      }
    }) // ... function on every render that will cause this effect ...
  
    return [ref, isFocused]
  }