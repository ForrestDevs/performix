'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ViewMode = 'grid' | 'list'

interface MentorViewModeContextValue {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const MentorViewModeContext = createContext<MentorViewModeContextValue | undefined>(undefined)

export function MentorViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  return (
    <MentorViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </MentorViewModeContext.Provider>
  )
}

export function useMentorViewMode() {
  const context = useContext(MentorViewModeContext)
  if (context === undefined) {
    throw new Error('useMentorViewMode must be used within a MentorViewModeProvider')
  }
  return context
}
