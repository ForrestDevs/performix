'use client'

export function HowYouImprove() {
  const outcomes = [
    {
      title: 'Hockey IQ',
      description: 'Play your position more effectively so your decisions create more impact',
    },
    {
      title: 'Confidence and Freedom',
      description:
        'Play to your full ability under pressure and build the mental resilience to thrive.',
    },
    {
      title: 'In-Game Results',
      description: 'Turn your growth into measurable results in games.',
    },
  ]

  // TODO(luke): Keep these accents in sync with the homepage brand palette as we iterate.
  const sectionAccentClasses = {
    haloPrimary: 'bg-[#0891B2]/10',
    haloSecondary: 'bg-[#8B5CF6]/10',
    circleBorder: 'border-[#0891B2]/30',
    circleGlow: 'from-[#0891B2]/8 to-[#8B5CF6]/8',
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-24 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -top-24 -left-20 h-72 w-72 rounded-full blur-3xl ${sectionAccentClasses.haloPrimary}`}
        />
        <div
          className={`absolute -bottom-24 -right-20 h-72 w-72 rounded-full blur-3xl ${sectionAccentClasses.haloSecondary}`}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          How You Improve
        </h2>

        <div className="relative mt-20 md:mt-28 lg:mt-24">
          <div className="hidden md:block">
            <div className="relative mx-auto h-[520px] w-full max-w-3xl lg:h-[540px] lg:max-w-[860px]">
              <div className="absolute left-1/2 top-0 -translate-x-1/2">
                <Circle
                  title={outcomes[0].title}
                  description={outcomes[0].description}
                  accentClasses={sectionAccentClasses}
                />
              </div>

              <div className="absolute bottom-0 left-0 lg:left-[50px]">
                <Circle
                  title={outcomes[1].title}
                  description={outcomes[1].description}
                  accentClasses={sectionAccentClasses}
                />
              </div>

              <div className="absolute bottom-0 right-0 lg:right-[50px]">
                <Circle
                  title={outcomes[2].title}
                  description={outcomes[2].description}
                  accentClasses={sectionAccentClasses}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:hidden">
            <div className="relative h-[680px] w-full max-w-[320px]">
              <div className="absolute left-1/2 top-0 -translate-x-1/2">
                <Circle
                  title={outcomes[0].title}
                  description={outcomes[0].description}
                  size="small"
                  accentClasses={sectionAccentClasses}
                />
              </div>

              <div className="absolute left-1/2 top-[200px] -translate-x-1/2">
                <Circle
                  title={outcomes[1].title}
                  description={outcomes[1].description}
                  size="small"
                  accentClasses={sectionAccentClasses}
                />
              </div>

              <div className="absolute left-1/2 top-[400px] -translate-x-1/2">
                <Circle
                  title={outcomes[2].title}
                  description={outcomes[2].description}
                  size="small"
                  accentClasses={sectionAccentClasses}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type AccentClasses = {
  haloPrimary: string
  haloSecondary: string
  circleBorder: string
  circleGlow: string
}

function Circle({
  title,
  description,
  size = 'default',
  accentClasses,
}: {
  title: string
  description: string
  size?: 'default' | 'small'
  accentClasses: AccentClasses
}) {
  const sizeClasses =
    size === 'small'
      ? 'h-[260px] w-[260px]'
      : 'h-[280px] w-[280px] lg:h-[320px] lg:w-[320px]'

  return (
    <div className="relative">
      <div
        className={`pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br blur-xl ${accentClasses.circleGlow}`}
      />
      <div
        className={`${sizeClasses} relative flex flex-col items-center justify-center rounded-full border bg-white p-8 text-center shadow-md backdrop-blur-sm lg:border-[2.5px] ${accentClasses.circleBorder}`}
      >
        <h3 className="text-lg font-semibold leading-tight tracking-tight text-gray-900 lg:text-xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 lg:text-[17px]">{description}</p>
      </div>
    </div>
  )
}
