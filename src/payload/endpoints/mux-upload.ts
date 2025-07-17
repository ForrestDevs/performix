import Mux from '@mux/mux-node'
import { PayloadHandler } from 'payload'

export const createMuxUploadHandler = (mux: Mux): PayloadHandler => {
  return async (request) => {
    const userHasAccess = request.user?.role === 'admin'
    if (!userHasAccess) {
      return new Response(
        JSON.stringify({
          status: 403,
          message: 'Forbidden',
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const corsOrigin = process.env.NEXT_PUBLIC_SERVER_URL
    if (!corsOrigin) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: 'Internal Server Error: NEXT_PUBLIC_SERVER_URL is not set',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    try {
      const upload = await mux.video.uploads.create({
        cors_origin: corsOrigin,
        new_asset_settings: {
          playback_policies: ['public'],
        },
      })

      return Response.json({
        id: upload.id,
        url: upload.url,
      })
    } catch (err) {
      console.error(err)
      return new Response(
        JSON.stringify({
          status: 500,
          message: err instanceof Error ? err.message : 'Unknown error occurred',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }
  }
}

export const getMuxUploadHandler = (mux: Mux): PayloadHandler => {
  return async (request) => {
    const userHasAccess = request.user?.role === 'admin'

    if (!userHasAccess) {
      return Response.error()
    }

    try {
      const id = request.query.id as string

      const upload = await mux.video.uploads.retrieve(id)

      return Response.json(upload)
    } catch (err) {
      return Response.json(err)
    }
  }
}
