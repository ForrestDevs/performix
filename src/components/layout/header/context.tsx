'use client'

import React, { type ReactNode, createContext, useContext, useState } from 'react'

interface MobileMenuContextType {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const initialContext: MobileMenuContextType = {
  isOpen: false,
  setIsOpen: () => {},
}

const MobileMenuContext = createContext(initialContext)

export const useMobileMenu = (): MobileMenuContextType => {
  const context = useContext(MobileMenuContext)
  if (!context) {
    throw new Error('useMobileMenu must be used within a MobileMenuProvider')
  }
  return context
}

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MobileMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MobileMenuContext.Provider>
  )
}
