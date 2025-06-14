import { getPayload } from '../utilities/getPayload'
import { MENTOR_SLUG } from '@/payload/collections/constants'

export async function getMentors() {
  const payload = await getPayload()
  const mentors = await payload.find({
    collection: MENTOR_SLUG,
    depth: 1,
  })

  return mentors.docs
}

export async function getMentor(slug: string) {
  const payload = await getPayload()
  const mentor = await payload.find({
    collection: MENTOR_SLUG,
    where: {
      slug: { equals: slug },
    },
  })
  return mentor.docs[0]
}
