'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 1024) return
    setVisible(true)

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const move = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`
      }
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX - 16}px, ${followerY - 16}px)`
      }
      requestAnimationFrame(animate)
    }
    animate()

    const onEnter = () => followerRef.current?.classList.add('cursor-expanded')
    const onLeave = () => followerRef.current?.classList.remove('cursor-expanded')
    const links = document.querySelectorAll('a, button, [data-cursor]')
    links.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    document.addEventListener('mousemove', move)
    return () => {
      document.removeEventListener('mousemove', move)
      links.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
    }
  }, [])

  if (!visible) return null
  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
