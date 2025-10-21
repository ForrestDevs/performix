'use client'

import { GamePlanForm } from '@/components/layout/game-plan/form'
import { useState } from 'react'

const loomUrl = 'https://www.loom.com/embed/26e601500ac14c6895ea0705fb85c486'

const labelClass = 'block text-gray-800 font-semibold mb-1 tracking-wide'
const inputClass =
  'w-full px-4 py-3 mt-2 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] bg-white text-lg transition'
const checkboxClass =
  'mr-2 accent-[#0891B2] h-5 w-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#0891B2] cursor-pointer'
const sectionClass =
  'max-w-2xl mx-auto px-4 py-10 bg-white bg-opacity-90 rounded-xl shadow-lg border border-[#0EA5E9]/10 backdrop-blur'

export default function GamePlanPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    whoAreYou: [] as string[],
    age: '',
    level: '',
    strengths: '',
    success: '',
    seriousness: '',
    decisionInvolvement: '',
    startWhen: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    if (
      name === 'whoAreYou' ||
      name === 'seriousness' ||
      name === 'decisionInvolvement' ||
      name === 'startWhen'
    ) {
      if (type === 'checkbox') {
        setForm((prev) => {
          const arr = prev[name] ? (Array.isArray(prev[name]) ? prev[name] : [prev[name]]) : []
          return {
            ...prev,
            [name]: checked ? [...arr, value] : arr.filter((v: string) => v !== value),
          }
        })
      } else {
        setForm((prev) => ({ ...prev, [name]: value }))
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleRadio = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Replace with actual submission (e.g. fetch API call)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#e0f4fc] via-[#f8faff] to-[#ede9fe] flex flex-col items-center py-8">
      <div className="w-full max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0EA5E9] mb-3 drop-shadow">
          Unlock Your D1 Hockey Game Plan
        </h1>
        <p className="text-gray-700 text-xl mb-4">
          Connect with a proven D1+ mentor and start your step-by-step roadmap to elite performance.
          Start by pre-qualifying below.
        </p>
      </div>

      <div className="w-full max-w-3xl rounded-xl mb-8 overflow-hidden border border-[#A78BFA]/30 shadow-lg bg-white bg-opacity-70 backdrop-blur">
        <div className="relative aspect-video">
          <iframe
            src={loomUrl}
            title="Performix Hockey - Game Plan Overview"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>

      <section className={sectionClass + ' mb-10'}>
        <h2 className="text-2xl font-bold text-[#0891B2] mb-6 text-center tracking-tight">
          Get Pre-Qualified for the Performix Mentorship
        </h2>
        {submitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#0EA5E9]/70 via-[#A78BFA]/30 to-[#dbeafe] rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#0891B2]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
            <p className="text-gray-700 mb-2">
              Your submission was received. We&apos;ll review your answers and reach out for your
              next step!
            </p>
            <p className="text-gray-500 text-sm">
              Want to chat sooner?{' '}
              <a
                className="text-[#0EA5E9] underline"
                href="https://calendly.com/mateodixon/d1-mentorship-call"
                target="_blank"
                rel="noopener"
              >
                Book your free strategy call.
              </a>
            </p>
          </div>
        ) : (
          <>
            {/* <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex-1">
                  <label className={labelClass}>First Name</label>
                  <input
                    required
                    name="firstName"
                    className={inputClass}
                    value={form.firstName}
                    onChange={handleChange}
                    type="text"
                    autoComplete="given-name"
                  />
                </div>
                <div className="flex-1">
                  <label className={labelClass}>Last Name</label>
                  <input
                    required
                    name="lastName"
                    className={inputClass}
                    value={form.lastName}
                    onChange={handleChange}
                    type="text"
                    autoComplete="family-name"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass + ' mb-2'}>Who are you?</label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className={checkboxClass}
                      name="whoAreYou"
                      value="Player"
                      checked={form.whoAreYou.includes('Player') as boolean}
                      onChange={handleChange}
                    />
                    Player
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className={checkboxClass}
                      name="whoAreYou"
                      value="Parent"
                      checked={form.whoAreYou.includes('Parent') as boolean}
                      onChange={handleChange}
                    />
                    Parent
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className={checkboxClass}
                      name="whoAreYou"
                      value="Other"
                      checked={form.whoAreYou.includes('Other') as boolean}
                      onChange={handleChange}
                    />
                    Other
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>How old are you?</label>
                <input
                  required
                  name="age"
                  className={inputClass}
                  value={form.age}
                  onChange={handleChange}
                  type="number"
                  min={0}
                  max={100}
                  placeholder="e.g. 16"
                />
              </div>
              <div>
                <label className={labelClass}>
                  What level are you playing at / played last year?
                </label>
                <input
                  required
                  name="level"
                  className={inputClass}
                  value={form.level}
                  onChange={handleChange}
                  type="text"
                  placeholder="AAA, Prep, Junior, etc."
                />
              </div>
              <div>
                <label className={labelClass}>
                  What parts of your game do you want to strengthen right now?
                </label>
                <input
                  name="strengths"
                  className={inputClass}
                  value={form.strengths}
                  onChange={handleChange}
                  type="text"
                  placeholder="confidence, hockey IQ, mindset, skill, speed, recovery..."
                />
              </div>
              <div>
                <label className={labelClass}>
                  If everything went right this season, what would success look like for you?
                </label>
                <input
                  name="success"
                  className={inputClass}
                  value={form.success}
                  onChange={handleChange}
                  type="text"
                  placeholder="Commit D1, dominate my league, become more confident..."
                />
              </div>
              <div>
                <label className={labelClass + ' mb-2'}>
                  How serious are you about taking hockey as far as possible?
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className={checkboxClass}
                      name="seriousness"
                      checked={form.seriousness === 'Ready system'}
                      onChange={() => handleRadio('seriousness', 'Ready system')}
                    />
                    I’m ready to start now with a proven system that connects all areas of
                    performance
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className={checkboxClass}
                      name="seriousness"
                      checked={form.seriousness === 'Exploring'}
                      onChange={() => handleRadio('seriousness', 'Exploring')}
                    />
                    I’m exploring options, but I know I need better structure and guidance
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className={checkboxClass}
                      name="seriousness"
                      checked={form.seriousness === 'Curious'}
                      onChange={() => handleRadio('seriousness', 'Curious')}
                    />
                    I’m curious — just learning what real development looks like
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass + ' mb-2'}>
                  Who’s currently involved in helping you make this decision?
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className={checkboxClass}
                      name="decisionInvolvement"
                      checked={form.decisionInvolvement === 'Just me'}
                      onChange={() => handleRadio('decisionInvolvement', 'Just me')}
                    />
                    Just me (the player)
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className={checkboxClass}
                      name="decisionInvolvement"
                      checked={form.decisionInvolvement === 'Me and parent(s)'}
                      onChange={() => handleRadio('decisionInvolvement', 'Me and parent(s)')}
                    />
                    Me and my parent(s) — we’re both on board
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className={checkboxClass}
                      name="decisionInvolvement"
                      checked={form.decisionInvolvement === 'Parent(s) only'}
                      onChange={() => handleRadio('decisionInvolvement', 'Parent(s) only')}
                    />
                    Just my parent(s) — they’re leading the process
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass + ' mb-2'}>
                  When are you hoping to start improving your overall performance system?
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className={checkboxClass}
                      name="startWhen"
                      checked={form.startWhen === 'Now'}
                      onChange={() => handleRadio('startWhen', 'Now')}
                    />
                    Right now — I’m ready to begin
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className={checkboxClass}
                      name="startWhen"
                      checked={form.startWhen === '30days'}
                      onChange={() => handleRadio('startWhen', '30days')}
                    />
                    Within the next 30 days
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className={checkboxClass}
                      name="startWhen"
                      checked={form.startWhen === '30plusdays'}
                      onChange={() => handleRadio('startWhen', '30plusdays')}
                    />
                    30+ days from now
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-[#0EA5E9] via-[#0891B2] to-[#A78BFA] text-white text-lg font-bold tracking-wide shadow-lg hover:scale-[1.01] active:scale-100 transition-all"
              >
                {loading ? (
                  <span className="flex justify-center items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="white"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Get My Game Plan'
                )}
              </button>
            </form> */}
            <GamePlanForm />
          </>
        )}
      </section>
      <div className="flex justify-center text-gray-400 text-xs mt-2">
        &copy; {new Date().getFullYear()} Performix Hockey. All rights reserved.
      </div>
    </main>
  )
}
