'use client'

import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { sendEmail } from '@/lib/data/email'
import { submitGamePlan } from '@/lib/data/game-plan'

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone is required'),
  whoAreYou: z
    .enum(['player', 'parent', 'other'])
    .refine((val) => val !== undefined, 'Who are you is required'),
  age: z.number().min(1, 'Age is required'),
  level: z.string().min(1, 'Level is required'),
  strengths: z.string().min(1, 'Strengths are required'),
  success: z.string().min(1, 'Success is required'),
  seriousness: z.string().min(1, 'Seriousness is required'),
  decisionInvolvement: z.string().min(1, 'Decision involvement is required'),
  startWhen: z.string().min(1, 'Start when is required'),
})

export function GamePlanForm() {
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      whoAreYou: 'player',
      age: 16,
      level: '',
      strengths: '',
      success: '',
      seriousness: 'super',
      decisionInvolvement: 'justMe',
      startWhen: 'now',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setHasSubmitted(true)
      await submitGamePlan(value)
      toast('You submitted the following values:', {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: 'bottom-right',
        classNames: {
          content: 'flex flex-col gap-2',
        },
        style: {
          '--border-radius': 'calc(var(--radius)  + 4px)',
        } as React.CSSProperties,
      })
    },
  })

  return (
    <>
      {hasSubmitted ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] py-12">
          <svg
            className="w-16 h-16 text-green-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-semibold mb-2">Thank you for submitting your Game Plan!</h2>
          <p className="text-gray-600 text-center max-w-md mb-6">
            We&apos;ve received your information. Our team will review your submission and get in
            touch shortly with your personalized performance roadmap.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            console.log('submitted')
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldSet>
            <FieldGroup className="flex flex-row">
              <form.Field
                name="firstName"
                children={(field) => {
                  const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={invalid}>
                      <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={invalid}
                        placeholder="First Name"
                        autoComplete="on"
                        type="given-name"
                        required
                      />
                      {invalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="lastName"
                children={(field) => {
                  const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={invalid}>
                      <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={invalid}
                        placeholder="Last Name"
                        autoComplete="on"
                        type="family-name"
                        required
                      />
                      {invalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />
            </FieldGroup>

            <form.Field
              name="email"
              children={(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={invalid}
                      placeholder="Email"
                      autoComplete="on"
                      type="email"
                      required
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />

            <form.Field
              name="phone"
              children={(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={invalid}
                      placeholder="Phone"
                      autoComplete="on"
                      type="tel"
                      required
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />

            <form.Field
              name="whoAreYou"
              children={(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet data-invalid={invalid}>
                    <FieldLabel htmlFor="whoAreYou">Who are you?</FieldLabel>

                    <RadioGroup
                      defaultValue="player"
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <FieldLabel htmlFor="player">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Player</FieldTitle>
                          </FieldContent>
                          <RadioGroupItem value="player" id="player" />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="parent">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Parent</FieldTitle>
                          </FieldContent>
                          <RadioGroupItem value="parent" id="parent" />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="other">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Other</FieldTitle>
                          </FieldContent>
                          <RadioGroupItem value="other" id="other" />
                        </Field>
                      </FieldLabel>
                    </RadioGroup>
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </FieldSet>
                )
              }}
            />

            <form.Field
              name="age"
              children={(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor="age">How old are you?</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      aria-invalid={invalid}
                      placeholder="e.g. 16"
                      autoComplete="on"
                      type="number"
                      min={0}
                      max={100}
                      required
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />

            <form.Field
              name="level"
              children={(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor="level">
                      What level are you playing at / played last year?
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={invalid}
                      placeholder="AAA, Prep, Junior, etc."
                      autoComplete="on"
                      type="text"
                      required
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />

            <form.Field
              name="strengths"
              children={(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor="strengths">
                      What parts of your game do you want to strengthen right now?
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={invalid}
                      placeholder="confidence, hockey IQ, mindset, skill, speed, recovery..."
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />

            <form.Field
              name="success"
              children={(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor="success">
                      If everything went right this season, what would success look like for you?
                    </FieldLabel>
                    <Textarea
                      id="success"
                      placeholder="Commit D1, dominate my league, become more confident..."
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={invalid}
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />

            <form.Field
              name="seriousness"
              children={(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet data-invalid={invalid}>
                    <FieldLabel htmlFor="seriousness">
                      How serious are you about taking hockey as far as possible?
                    </FieldLabel>

                    <RadioGroup
                      defaultValue="super"
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <FieldLabel htmlFor="super">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Super serious</FieldTitle>
                            <FieldDescription>
                              I&apos;m ready to start now with a proven system that connects all
                              areas of performance
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value="super" id="super" />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="exploring">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Exploring options</FieldTitle>
                            <FieldDescription>
                              I&apos;m exploring options, but I know I need better structure and
                              guidance
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value="exploring" id="exploring" />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="curious">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Curious</FieldTitle>
                            <FieldDescription>
                              I&apos;m curious — just learning what real development looks like
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value="curious" id="curious" />
                        </Field>
                      </FieldLabel>
                    </RadioGroup>
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </FieldSet>
                )
              }}
            />

            <form.Field
              name="decisionInvolvement"
              children={(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet data-invalid={invalid}>
                    <FieldLabel htmlFor="decisionInvolvement">
                      Who&apos;s currently involved in helping you make this decision?
                    </FieldLabel>

                    <RadioGroup
                      defaultValue="justMe"
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <FieldLabel htmlFor="justMe">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Just me (the player)</FieldTitle>
                          </FieldContent>
                          <RadioGroupItem value="justMe" id="justMe" />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="meAndParents">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Me and my parent(s) — we&apos;re both on board</FieldTitle>
                          </FieldContent>
                          <RadioGroupItem value="meAndParents" id="meAndParents" />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="parentOnly">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>
                              Just my parent(s) — they&apos;re leading the process
                            </FieldTitle>
                          </FieldContent>
                          <RadioGroupItem value="parentOnly" id="parentOnly" />
                        </Field>
                      </FieldLabel>
                    </RadioGroup>
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </FieldSet>
                )
              }}
            />

            <form.Field
              name="startWhen"
              children={(field) => {
                const invalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet data-invalid={invalid}>
                    <FieldLabel htmlFor="startWhen">
                      When do you hope to start improving your overall performance system?
                    </FieldLabel>

                    <RadioGroup
                      defaultValue="now"
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <FieldLabel htmlFor="now">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Now</FieldTitle>
                            <FieldDescription>
                              Let&apos;s get started — I&apos;m ready to begin
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value="now" id="now" />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="30days">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Soon</FieldTitle>
                            <FieldDescription>
                              I&apos;m ready to begin within the next 30 days
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value="30days" id="30days" />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="30plusdays">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>In a bit</FieldTitle>
                            <FieldDescription>
                              I&apos;m ready to begin 30+ days from now
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value="30plusdays" id="30plusdays" />
                        </Field>
                      </FieldLabel>
                    </RadioGroup>
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </FieldSet>
                )
              }}
            />
          </FieldSet>
          <div className="flex justify-center pt-6">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      )}
    </>
  )
}
