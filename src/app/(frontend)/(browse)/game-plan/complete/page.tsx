const loomUrl = 'https://www.loom.com/embed/26e601500ac14c6895ea0705fb85c486'

export default function GamePlanCompletePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f4fc] via-[#f8faff] to-[#ede9fe] flex items-center justify-center py-16">
      <section className="w-full min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-12 sm:px-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#0EA5E9] mb-6 drop-shadow-lg">
          Thank You!
        </h1>
        <p className="max-w-2xl text-xl sm:text-2xl text-gray-800 mb-8 font-medium">
          We&apos;ve received your Game Plan submission.
          <br />
          Our team will review your response and reach out soon to help you begin your journey.
          <br />
          <br />
          <span className="text-base sm:text-lg text-gray-500">
            In the meantime, here&apos;s a quick overview of what we do. 
          </span>
        </p>
        <div className="w-full max-w-3xl flex justify-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video w-full bg-black">
            <iframe
              src={loomUrl}
              title="Performix Hockey - Game Plan Overview"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-2xl"
            />
            {/* Decorative gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0EA5E9]/30 via-transparent to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
