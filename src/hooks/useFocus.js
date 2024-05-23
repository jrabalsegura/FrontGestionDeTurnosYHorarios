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
  
      return () => {
        element?.removeEventListener('focus', toggle)
        element?.removeEventListener('blur', toggle)
      }
    }) 
  
    return [ref, isFocused]
  }