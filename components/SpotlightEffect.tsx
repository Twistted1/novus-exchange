'use client'

import { useEffect } from 'react'

export default function SpotlightEffect() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--spotlight-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--spotlight-y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return null
}
