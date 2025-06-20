'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ViewMode = 'grid' | 'list'

interface ResourceViewModeContextType {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  toggleViewMode: () => void
}

const ResourceViewModeContext = createContext<ResourceViewModeContextType | undefined>(undefined)

interface ResourceViewModeProviderProps {
  children: ReactNode
  defaultViewMode?: ViewMode
}

export function ResourceViewModeProvider({
  children,
  defaultViewMode = 'grid',
}: ResourceViewModeProviderProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultViewMode)

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'))
  }

  return (
    <ResourceViewModeContext.Provider value={{ viewMode, setViewMode, toggleViewMode }}>
      {children}
    </ResourceViewModeContext.Provider>
  )
}

export function useResourceViewMode() {
  const context = useContext(ResourceViewModeContext)
  if (context === undefined) {
    throw new Error('useResourceViewMode must be used within a ResourceViewModeProvider')
  }
  return context
}
