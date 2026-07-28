import { GamePlanConversionTracker } from '@/components/analytics/game-plan-conversion-tracker'
import { PERFORMIX_DISPLAY_TITLE_CLASS } from '@/lib/constants/typography'
import { cn } from '@/lib/utilities/ui'

const loomUrl = 'https://www.loom.com/embed/beafdd6bc34c4871bd658b0d03383a74?hideEmbedTopBar=true'

export default function GamePlanCompletePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f4fc] via-[#f8faff] to-[#ede9fe] flex items-center justify-center py-16">
      <GamePlanConversionTracker />
      <section className="w-full min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-12 sm:px-8">
        <h1 className={cn(PERFORMIX_DISPLAY_TITLE_CLASS, 'text-[#0EA5E9] mb-6 drop-shadow-lg')}>
          Application Received
        </h1>
        <p className="max-w-2xl text-xl sm:text-2xl text-gray-800 mb-16 font-medium">
          We&apos;ve received your free 1-on-1 session application.
          <br />
          Mateo will review your response and text you with the next step.
        </p>

        <div className="w-full max-w-4xl flex flex-col items-center gap-5">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 font-['Space_Grotesk']">
              How Performix Hockey Works
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Watch this while Mateo reviews your application.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video w-full bg-black">
            <iframe
              src={loomUrl}
              title="How Performix Hockey Works"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-2xl"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0EA5E9]/30 via-transparent to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
