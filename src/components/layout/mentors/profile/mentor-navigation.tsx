'use client'

import { useRef } from 'react'

interface MentorNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>>
}

export function MentorNavigation({ activeTab, setActiveTab, sectionRefs }: MentorNavigationProps) {
  // Handle scroll to section
  const scrollToSection = (section: string) => {
    setActiveTab(section)
    sectionRefs[section as keyof typeof sectionRefs]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          <div className="flex space-x-1 py-4">
            {Object.keys(sectionRefs).map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-4 py-2 whitespace-nowrap font-medium rounded-md transition-colors duration-200 ${
                  activeTab === section
                    ? 'text-[#0891B2] bg-[#0891B2]/10'
                    : 'text-gray-600 hover:text-[#0891B2] hover:bg-gray-100'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
