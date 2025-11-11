'use client'

import { Card } from '@/components/ui/card'
import { TeamMember } from '@/payload-types'
import Image from 'next/image'

export function SpecialistCard({ teamMember }: { teamMember: TeamMember }) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(30,107,255,0.3)] hover:-translate-y-3 border-0 bg-gradient-to-br from-background via-background to-muted/30 flex flex-col min-h-[540px]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-accent/0 to-amber/0 group-hover:from-primary/5 group-hover:via-accent/5 group-hover:to-amber/5 transition-all duration-500" />

      <div className="relative h-72 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,107,255,0.15),transparent_50%)] group-hover:bg-[radial-gradient(ellipse_at_top,rgba(30,107,255,0.25),transparent_50%)] transition-all duration-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,194,168,0.1),transparent_50%)]" />

        <div className="relative w-44 h-44">
          {teamMember.avatar &&
          typeof teamMember.avatar === 'object' &&
          'url' in teamMember.avatar &&
          teamMember.avatar.url ? (
            <Image
              src={teamMember.avatar.url}
              alt={teamMember.name}
              width={176}
              height={176}
              className="w-44 h-44 rounded-full object-cover border-4 border-background shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent), var(--amber))',
              }}
            />
          ) : (
            <div className="w-44 h-44 rounded-full bg-gradient-to-br from-primary via-accent to-amber p-1 shadow-2xl ring-4 ring-background/80 flex items-center justify-center">
              <span className="text-5xl font-bold bg-gradient-to-br from-primary via-accent to-amber bg-clip-text text-transparent">
                {teamMember.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 relative p-8 space-y-5">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
            {teamMember.name}
          </h3>
          <p className="text-base font-semibold text-primary">{teamMember.title}</p>
          <p className="text-sm text-muted-foreground font-medium">{teamMember.credentials}</p>
        </div>

        <div className="flex-1 flex flex-col">
          <p className="text-sm text-muted-foreground leading-relaxed text-center px-2 break-words whitespace-pre-line">
            {teamMember.bio || <span className="text-muted">No bio available.</span>}
          </p>
        </div>
      </div>
    </Card>
  )
}
