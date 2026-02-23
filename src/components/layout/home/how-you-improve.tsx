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

  return (
    <section className="relative bg-[#f8f9fa] py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-[#1a1a2e] md:text-5xl lg:text-6xl">
          How You Improve
        </h2>

        <div className="relative mt-20 md:mt-28 lg:mt-24">
          <div className="hidden md:block">
            <div className="relative mx-auto h-[520px] w-full max-w-3xl lg:h-[540px] lg:max-w-[860px]">
              <div className="absolute left-1/2 top-0 -translate-x-1/2">
                <Circle title={outcomes[0].title} description={outcomes[0].description} />
              </div>

              <div className="absolute bottom-0 left-0 lg:left-[50px]">
                <Circle title={outcomes[1].title} description={outcomes[1].description} />
              </div>

              <div className="absolute bottom-0 right-0 lg:right-[50px]">
                <Circle title={outcomes[2].title} description={outcomes[2].description} />
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
                />
              </div>

              <div className="absolute left-1/2 top-[200px] -translate-x-1/2">
                <Circle
                  title={outcomes[1].title}
                  description={outcomes[1].description}
                  size="small"
                />
              </div>

              <div className="absolute left-1/2 top-[400px] -translate-x-1/2">
                <Circle
                  title={outcomes[2].title}
                  description={outcomes[2].description}
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Circle({
  title,
  description,
  size = 'default',
}: {
  title: string
  description: string
  size?: 'default' | 'small'
}) {
  const sizeClasses =
    size === 'small'
      ? 'h-[260px] w-[260px]'
      : 'h-[280px] w-[280px] lg:h-[320px] lg:w-[320px]'

  return (
    <div
      className={`${sizeClasses} flex flex-col items-center justify-center rounded-full border-2 border-[#5bb5b0]/60 bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm lg:border-[2.5px] lg:border-[#4fa8a3]/65`}
    >
      <h3 className="text-lg font-semibold leading-tight tracking-tight text-[#1a1a2e] lg:text-xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#5a5a6e] lg:text-[17px]">{description}</p>
    </div>
  )
}
