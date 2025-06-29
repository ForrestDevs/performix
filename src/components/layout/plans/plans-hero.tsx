export function PlansHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#0891B2] to-[#0E7490] py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 border border-white/10 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-['Space_Grotesk']">
            Invest in Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
              Hockey Future
            </span>
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Choose the mentorship package that fits your goals
          </p>

          <div className="grid grid-cols-3 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">100%</div>
              <div className="text-sm opacity-75">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">30-Day</div>
              <div className="text-sm opacity-75">Money-Back Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">D1+</div>
              <div className="text-sm opacity-75">Verified Mentors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
