import { auth, youtube_v3 } from '@googleapis/youtube'

const client = new auth.GoogleAuth({
  apiKey: process.env.YOUTUBE_API_KEY,
})

const youtube = new youtube_v3.Youtube({
  auth: client,
})

export default youtube
