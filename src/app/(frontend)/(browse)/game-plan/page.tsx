import { GamePlanForm } from '@/components/layout/game-plan/form'

const loomUrl = 'https://www.loom.com/embed/5def31e26be04dfc846515c40295550f'

export default function GamePlanPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#e0f4fc] via-[#f8faff] to-[#ede9fe] flex flex-col items-center space-y-8 py-16">
      <div className="container w-full max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0EA5E9] mb-3 drop-shadow">
          Unlock Your D1 Game Plan
        </h1>
        <p className="text-gray-700 text-xl mb-4">
          Fill out the form below and we&apos;ll help you figure out the best path forward based on
          your game and your goals.
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
          Game plan submission form
        </h2>
        <GamePlanForm />
      </div>
    </main>
  )
}
