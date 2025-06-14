import { getPayload } from '../utilities/getPayload'

export async function getTestimonials() {
  const payload = await getPayload()

  const testimonials = await payload.find({
    collection: 'testimonials',
    limit: 4,
    depth: 1,
  })

  return testimonials.docs
}
