"use client"

import { useState, useEffect, useRef, ReactNode } from "react"
import styles from "./Popover.module.scss"

interface PopoverProps {
  trigger: ReactNode
  children: ReactNode
}

export default function Popover({ trigger, children }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className={styles.wrapper} ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.trigger}>
        {trigger}
      </div>
      {isOpen && (
        <div className={styles.content} onClick={() => setIsOpen(false)}>
          {children}
        </div>
      )}
    </div>
  )
}
