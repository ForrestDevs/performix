import { GamePlanForm } from '@/components/layout/game-plan/form'

const loomUrl = 'https://www.loom.com/embed/26e601500ac14c6895ea0705fb85c486'
const sectionClass = 'container  px-4 py-10 '

export default function GamePlanPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#e0f4fc] via-[#f8faff] to-[#ede9fe] flex flex-col items-center space-y-8 py-16">
      <div className="container w-full max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0EA5E9] mb-3 drop-shadow">
          Unlock Your D1 Hockey Game Plan
        </h1>
        <p className="text-gray-700 text-xl mb-4">
          Connect with a proven D1+ mentor and start your step-by-step roadmap to elite performance.
          Start by pre-qualifying below.
        </p>
      </div>

      <iframe
        src={loomUrl}
        title="Performix Hockey - Game Plan Overview"
        allowFullScreen
        className="w-full h-full aspect-video container py-12"
      />

      <div className="container max-w-2xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-lg border border-[#0EA5E9]/10 backdrop-blur p-8">
        <h2 className="text-2xl font-bold text-[#0891B2] mb-6 text-center tracking-tight">
          Get Pre-Qualified for the Performix Mentorship
        </h2>
        <GamePlanForm />
      </div>
    </main>
  )
}
