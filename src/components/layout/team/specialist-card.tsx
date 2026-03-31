'use client'

import { Card } from '@/components/ui/card'
import { TeamMember } from '@/payload-types'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

import { useState } from 'react'

function getBioParagraphs(bio: string) {
  const cleanedBio = bio.replace(/\r\n/g, '\n').trim()

  if (!cleanedBio) {
    return []
  }

  const paragraphBreaks = cleanedBio
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  if (paragraphBreaks.length > 1) {
    return paragraphBreaks
  }

  const lineBreaks = cleanedBio
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (lineBreaks.length > 1) {
    return lineBreaks
  }

  const sentences = cleanedBio
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)

  if (sentences.length <= 2) {
    return [cleanedBio]
  }

  const groupedParagraphs: string[] = []

  for (let i = 0; i < sentences.length; i += 2) {
    groupedParagraphs.push(sentences.slice(i, i + 2).join(' '))
  }

  return groupedParagraphs
}

function getBioPreview(paragraphs: string[]) {
  const preview = paragraphs[0] ?? ''

  if (preview.length <= 165) {
    return preview
  }

  const shortenedPreview = preview.slice(0, 165)
  const lastSpace = shortenedPreview.lastIndexOf(' ')

  return `${shortenedPreview.slice(0, lastSpace > 0 ? lastSpace : 165)}...`
}

export function SpecialistCard({ teamMember }: { teamMember: TeamMember }) {
  const [showBioDialog, setShowBioDialog] = useState(false)
  const bio = teamMember.bio
  const bioParagraphs = bio ? getBioParagraphs(bio) : []
  const [bioLeadParagraph, ...bioBodyParagraphs] = bioParagraphs
  const bioPreview = getBioPreview(bioParagraphs)
  const showReadMore = Boolean(bio && (bioParagraphs.length > 1 || bioPreview !== bio))

  return (
    <>
      <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(30,107,255,0.3)] hover:-translate-y-3 border-0 bg-gradient-to-br from-background via-background to-muted/30 flex flex-col min-h-[540px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-accent/0 to-amber/0 group-hover:from-primary/5 group-hover:via-accent/5 group-hover:to-amber/5 transition-all duration-500" />

        <div className="relative h-80 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent flex items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,107,255,0.15),transparent_50%)] group-hover:bg-[radial-gradient(ellipse_at_top,rgba(30,107,255,0.25),transparent_50%)] transition-all duration-500" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,194,168,0.1),transparent_50%)]" />

          <div className="relative w-48 sm:w-52 aspect-[4/5]">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/15 to-amber/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            {teamMember.avatar &&
            typeof teamMember.avatar === 'object' &&
            'url' in teamMember.avatar &&
            teamMember.avatar.url ? (
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border-4 border-background/90 bg-white/70 shadow-2xl">
                <Image
                  src={teamMember.avatar.url}
                  alt={teamMember.name}
                  fill
                  sizes="(min-width: 640px) 208px, 192px"
                  className="object-cover object-top"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--primary), var(--accent), var(--amber))',
                  }}
                />
              </div>
            ) : (
              <div className="relative h-full w-full rounded-[2rem] bg-gradient-to-br from-primary via-accent to-amber p-1 shadow-2xl ring-4 ring-background/80 flex items-center justify-center">
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
                  className="text-sm text-muted-foreground leading-7 text-left px-1 break-words overflow-hidden"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {bioPreview}
                </p>
                {showReadMore && (
                  <div className="mt-2 flex justify-center">
                    <Button
                      variant="outline"
                      className="rounded-full border-primary/20 text-primary hover:bg-primary/5 hover:text-primary"
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
                  <DialogContent className="max-w-3xl gap-0 overflow-hidden border-0 p-0 shadow-2xl">
                    <DialogDescription className="sr-only">
                      Full biography for {teamMember.name}
                    </DialogDescription>

                    <div className="bg-gradient-to-br from-slate-50 via-white to-sky-50 px-6 py-8 sm:px-8">
                      <div className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:items-start">
                        <div className="mx-auto w-44 sm:w-52">
                          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-xl">
                            {teamMember.avatar &&
                            typeof teamMember.avatar === 'object' &&
                            'url' in teamMember.avatar &&
                            teamMember.avatar.url ? (
                              <Image
                                src={teamMember.avatar.url}
                                alt={teamMember.name}
                                fill
                                sizes="208px"
                                className="object-cover object-top"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary via-accent to-amber">
                                <span className="text-5xl font-bold text-white">
                                  {teamMember.name
                                    .split(' ')
                                    .map((namePart) => namePart[0])
                                    .join('')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-4 text-left">
                          <div className="space-y-2">
                            <DialogTitle className="text-3xl sm:text-4xl font-bold tracking-tight font-['Space_Grotesk'] text-slate-950">
                              {teamMember.name}
                            </DialogTitle>
                            <p className="text-lg font-semibold text-primary">{teamMember.title}</p>
                          </div>

                          {Array.isArray(teamMember.credentials) &&
                          teamMember.credentials.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {teamMember.credentials.map((credential, index) =>
                                credential?.credential ? (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                                  >
                                    {credential.credential}
                                  </Badge>
                                ) : null,
                              )}
                            </div>
                          ) : null}

                          {bioLeadParagraph ? (
                            <p className="text-lg leading-8 text-slate-700">{bioLeadParagraph}</p>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {bioBodyParagraphs.length > 0 ? (
                      <ScrollArea className="max-h-[55vh] px-6 pb-8 sm:px-8">
                        <div className="space-y-5 pt-6 text-left">
                          {bioBodyParagraphs.map((paragraph, index) => (
                            <p
                              key={index}
                              className="text-base leading-8 text-slate-600 whitespace-pre-line"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : null}
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
