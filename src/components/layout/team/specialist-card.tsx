'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utilities/ui'
import type { Specialist } from './specialist-grid'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export function SpecialistCard({ specialist }: { specialist: Specialist }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(30,107,255,0.3)] hover:-translate-y-3 border-0 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-accent/0 to-amber/0 group-hover:from-primary/5 group-hover:via-accent/5 group-hover:to-amber/5 transition-all duration-500" />

        <div className="relative h-72 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,107,255,0.15),transparent_50%)] group-hover:bg-[radial-gradient(ellipse_at_top,rgba(30,107,255,0.25),transparent_50%)] transition-all duration-500" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,194,168,0.1),transparent_50%)]" />

          <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-primary via-accent to-amber p-1 shadow-2xl ring-4 ring-background/80 transition-all duration-500 group-hover:scale-110 group-hover:ring-8 group-hover:ring-primary/20 group-hover:shadow-[0_0_40px_rgba(30,107,255,0.4)]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <span className="text-5xl font-bold bg-gradient-to-br from-primary via-accent to-amber bg-clip-text text-transparent">
                {specialist.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
          </div>
        </div>

        <div className="relative p-8 space-y-5">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
              {specialist.name}
            </h3>
            <p className="text-base font-semibold text-primary">{specialist.role}</p>
            <p className="text-sm text-muted-foreground font-medium">{specialist.affiliation}</p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed text-center line-clamp-3 px-2">
            {specialist.approach}
          </p>

          <div className="pt-3">
            <Button
              variant="outline"
              onClick={() => setModalOpen(true)}
              className="w-full border-primary/40 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 font-semibold shadow-sm hover:shadow-lg bg-transparent"
            >
              View Full Bio
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-accent to-amber p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <span className="text-2xl font-bold bg-gradient-to-br from-primary via-accent to-amber bg-clip-text text-transparent">
                      {specialist.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">{specialist.name}</h2>
                  <p className="text-base text-primary font-semibold mt-1">{specialist.role}</p>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8 pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-foreground mb-3">Credentials</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {specialist.affiliation}
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-foreground mb-3">Approach</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {specialist.approach}
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-foreground mb-3">Focus Areas</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Specialized training in {specialist.domainTags.join(', ').toLowerCase()} with
                  emphasis on athlete development and performance optimization.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-foreground mb-3">Who Benefits</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Athletes ages 14-17 looking to enhance their{' '}
                  {specialist.domainTags[0]?.toLowerCase()} capabilities through structured,
                  evidence-based training.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-foreground mb-3">Example Deliverables</h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside leading-relaxed">
                  <li>Async game breakdown and analysis</li>
                  <li>Custom micro-module training programs</li>
                  <li>One-on-one consultation sessions</li>
                </ul>
              </div>
            </div>

            <div className="p-5 bg-muted/50 rounded-xl border border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Independent contractor. Affiliation shown may be historical unless marked Active.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
