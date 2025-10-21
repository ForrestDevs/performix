import { SpecialistCard } from '@/components/layout/team/specialist-card'

export interface Specialist {
  id: string
  name: string
  role: string
  photo?: string
  domainTags: string[]
  approach: string
  affiliation: string
  availability: 'Active' | 'Waitlist'
  modalities: string[]
  bookings?: number
}

interface SpecialistGridProps {
  specialists: Specialist[]
}

export function SpecialistGrid({ specialists }: SpecialistGridProps) {
  if (specialists.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No matches. Adjust filters.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {specialists.map((specialist) => (
          <SpecialistCard key={specialist.id} specialist={specialist} />
        ))}
      </div>
    </>
  )
}
