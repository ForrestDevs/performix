'use client'

import { Button } from '@/components/ui/button'
import { markLessonComplete } from '@/lib/data/lab'
import { useState, useTransition } from 'react'
import { Check, Loader2 } from 'lucide-react'

export function CompleteLessonButton({
  lessonId,
  isComplete,
}: {
  lessonId: number
  isComplete: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const [currentState, setCurrentState] = useState(isComplete)

  const handleToggle = () => {
    startTransition(async () => {
      const newState = !currentState
      setCurrentState(newState)
      await markLessonComplete(lessonId, newState)
    })
  }

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      className={`w-full transition-all duration-200 flex justify-start ${
        currentState
          ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300'
          : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300'
      }`}
      variant="outline"
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          <span className="font-medium">
            {currentState ? 'Marking Incomplete...' : 'Marking Complete...'}
          </span>
        </>
      ) : (
        <div className="flex items-center">
          <div
            className={`flex items-start justify-center w-5 h-5 mr-2 rounded-full border-2 transition-all duration-200 ${
              currentState ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'
            }`}
          >
            {currentState && <Check className="h-3 w-3 text-white" />}
          </div>
          <span className="font-medium">
            {currentState ? 'Lesson Complete' : 'Mark as Complete'}
          </span>
        </div>
      )}
    </Button>
  )
}
