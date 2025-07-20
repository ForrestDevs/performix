import { Lesson } from '@/payload-types'

export function hasLessonAccess(lesson: Lesson, hasPlan?: boolean): boolean {
  // Always allow preview lessons
  if (lesson.isPreview) return true

  // No plan = no access to non-preview content
  if (!hasPlan) return false

  return true
}
