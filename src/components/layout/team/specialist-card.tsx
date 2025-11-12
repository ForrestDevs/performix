'use client'

import { Card } from '@/components/ui/card'
import { TeamMember } from '@/payload-types'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

import { useState } from 'react'

export function SpecialistCard({ teamMember }: { teamMember: TeamMember }) {
  const [showBioDialog, setShowBioDialog] = useState(false)

  // Helper: Truncate bio to two lines (approx)
  const getTruncatedBio = (bio: string) => {
    // Roughly split into lines using newlines first, fall back to word count
    const lines = bio.split('\n')
    if (lines.length > 2) {
      return lines.slice(0, 2).join('\n') + '...'
    }
    // Otherwise, truncate to about 180 chars, but don't cut words
    if (bio.length > 180) {
      const truncated = bio.slice(0, 180)
      const lastSpace = truncated.lastIndexOf(' ')
      return truncated.slice(0, lastSpace > 0 ? lastSpace : 180) + '...'
    }
    return bio
  }

  const bio = teamMember.bio

  return (
    <>
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
                  background:
                    'linear-gradient(135deg, var(--primary), var(--accent), var(--amber))',
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

        <div className="flex flex-col flex-1 relative p-8">
          {/* Name, Title & Credentials in a column, but with bio always starting at the same spot */}
          <div className="flex flex-col flex-none">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                {teamMember.name}
              </h3>
              <p className="text-base font-semibold text-primary">{teamMember.title}</p>
            </div>
            {/* Grow the credentials list to fill vertical space and align the content below evenly */}
            <div className="flex flex-col">
              {Array.isArray(teamMember.credentials) && teamMember.credentials.length > 0 ? (
                <ul className="text-sm text-muted-foreground font-medium flex flex-col items-start gap-1 mt-2 mx-auto w-fit">
                  {teamMember.credentials.map((cred, idx) =>
                    cred ? (
                      <li key={idx} className="flex items-start gap-2 w-full">
                        <span className="inline-block mt-1 mr-1 text-primary text-xs">•</span>
                        <span>{cred.credential}</span>
                      </li>
                    ) : null,
                  )}
                </ul>
              ) : (
                // Even if no credentials, render an empty div to reserve min space for visual alignment
                <div style={{ minHeight: '1.75rem' }} />
              )}
            </div>
          </div>

          {/* Spacer that takes all remaining space to push the bio down */}
          <div className="flex-1" />

          {/* Bio */}
          <div className="flex flex-col items-center justify-center">
            {bio ? (
              <div className="w-full">
                <p
                  className="text-sm text-muted-foreground leading-relaxed text-center px-2 break-words whitespace-pre-line overflow-hidden"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {getTruncatedBio(bio)}
                </p>
                {(bio.split('\n').length > 2 || bio.length > 180) && (
                  <div className="mt-2 flex justify-center">
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => setShowBioDialog(true)}
                      tabIndex={0}
                      aria-label={`Read full bio of ${teamMember.name}`}
                    >
                      Read full bio
                    </Button>
                  </div>
                )}

                {/* Dialog for full bio */}
                <Dialog open={showBioDialog} onOpenChange={setShowBioDialog}>
                  <DialogContent className="max-w-lg">
                    <DialogTitle>{teamMember.name} – Bio</DialogTitle>
                    <DialogDescription>
                      <ScrollArea className="h-60 w-full pr-2">
                        <p className="whitespace-pre-line text-muted-foreground text-md px-1">
                          {bio}
                        </p>
                      </ScrollArea>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed text-center px-2">
                <span className="text-muted">No bio available.</span>
              </p>
            )}
          </div>
        </div>
      </Card>
    </>
  )
}
