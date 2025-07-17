import type { CollectionConfig } from 'payload'
import mux from '@/lib/mux'
import { admins, anyone } from '@/payload/access'
import beforeChangeMuxVideoHook from './hooks/beforeChange'
import afterDeleteMuxVideoHook from './hooks/afterDelete'
import { VIDEOS_SLUG } from '../constants'

const Videos: CollectionConfig = {
  slug: VIDEOS_SLUG,
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  access: {
    create: admins,
    delete: admins,
    update: admins,
    read: anyone,
  },
  admin: {
    group: 'Files',
    useAsTitle: 'title',
    defaultColumns: ['title', 'preview', 'duration'],
  },
  hooks: {
    afterDelete: [afterDeleteMuxVideoHook],
    beforeChange: [beforeChangeMuxVideoHook],
  },
  folders: {
    browseByFolder: true,
  },
  fields: [
    {
      name: 'preview',
      type: 'ui',
      admin: {
        components: {
          Cell: '@/payload/collections/Videos/ui/preview#VideoPreview',
        },
      },
    },
    {
      name: 'source',
      type: 'select',
      label: 'Source',
      options: [
        {
          label: 'Mux',
          value: 'mux',
        },
        {
          label: 'YouTube',
          value: 'youtube',
        },
        {
          label: 'Loom',
          value: 'loom',
        },
      ],
      defaultValue: 'mux',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      unique: true,
      admin: {
        description: `A unique title for this video that will help you identify it later.`,
      },
    },
    {
      name: 'muxUploader',
      label: 'Video Preview',
      type: 'ui',
      admin: {
        condition: (data) => data.source === 'mux',
        components: {
          Field: '@/payload/collections/Videos/ui/mux/mux-uploader#MuxUploaderField',
        },
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube URL',
      admin: {
        condition: (data) => data.source === 'youtube',
      },
    },
    {
      name: 'youtubeViewer',
      label: 'YouTube Viewer',
      type: 'ui',
      admin: {
        condition: (data) => data.source === 'youtube',
        components: {
          Field: '@/payload/collections/Videos/ui/youtube/youtube-viewer#YoutubeViewerField',
        },
      },
    },
    {
      name: 'loomUrl',
      type: 'text',
      label: 'Loom URL',
      admin: {
        condition: (data) => data.source === 'loom',
      },
    },
    {
      name: 'loomViewer',
      label: 'Loom Viewer',
      type: 'ui',
      admin: {
        condition: (data) => data.source === 'loom',
        components: {
          Field: '@/payload/collections/Videos/ui/loom/loom-viewer#LoomViewerField',
        },
      },
    },
    {
      name: 'assetId',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
        condition: (data) => data.assetId && data.source === 'mux',
      },
    },
    {
      name: 'duration',
      label: 'Duration',
      type: 'number',
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => data.duration,
        components: {
          Cell: '@/payload/collections/Videos/ui/duration#DurationCell',
        },
      },
    },
    {
      name: 'posterTimestamp',
      type: 'number',
      label: 'Poster Timestamp',
      min: 0,
      admin: {
        description:
          'Pick a timestamp (in seconds) from the video to be used as the poster image. When unset, defaults to the middle of the video.',
        // Only show it when playbackId has been set, so users can pick the poster image using the player
        condition: (data) => data.duration && data.source === 'mux',
        step: 0.25,
      },
      validate: (value: any, { siblingData }: any) => {
        if (!siblingData.duration || !value) {
          return true
        }

        return (
          Boolean(siblingData.duration >= value) ||
          'Poster timestamp must be less than the video duration.'
        )
      },
    },
    {
      name: 'aspectRatio',
      label: 'Aspect Ratio',
      type: 'text',
      admin: {
        readOnly: true,
        condition: (data) => data.aspectRatio && data.source === 'mux',
      },
    },
    {
      name: 'maxWidth',
      type: 'number',
      admin: {
        readOnly: true,
        condition: (data) => data.maxWidth && data.source === 'mux',
      },
    },
    {
      name: 'maxHeight',
      type: 'number',
      admin: {
        readOnly: true,
        condition: (data) => data.maxHeight && data.source === 'mux',
      },
    },
    {
      name: 'playbackOptions',
      type: 'array',
      admin: {
        readOnly: true,
        condition: (data) => !!data.playbackOptions && data.source === 'mux',
      },
      fields: [
        {
          name: 'playbackId',
          label: 'Playback ID',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'playbackPolicy',
          label: 'Playback Policy',
          type: 'select',
          options: [
            {
              label: 'signed',
              value: 'signed',
            },
            {
              label: 'public',
              value: 'public',
            },
          ],
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'playbackUrl',
          label: 'Playback URL',
          type: 'text',
          virtual: true,
          admin: {
            hidden: true,
          },
          hooks: {
            afterRead: [
              async ({ siblingData }) => {
                const playbackId = siblingData?.['playbackId']

                if (!playbackId) {
                  return null
                }

                const url = new URL(`https://stream.mux.com/${playbackId}.m3u8`)

                if (siblingData.playbackPolicy === 'signed') {
                  const token = await mux.jwt.signPlaybackId(playbackId, {
                    expiration: '1d',
                    type: 'video',
                  })

                  url.searchParams.set('token', token)
                }

                return url.toString()
              },
            ],
          },
        },
        {
          name: 'posterUrl',
          label: 'Poster URL',
          type: 'text',
          virtual: true,
          admin: {
            hidden: true,
          },
          hooks: {
            afterRead: [
              async ({ data, siblingData }) => {
                const playbackId = siblingData?.['playbackId']
                const posterTimestamp = data?.['posterTimestamp']

                if (!playbackId) {
                  return null
                }

                const url = new URL(`https://image.mux.com/${playbackId}/thumbnail.png`)

                if (typeof posterTimestamp === 'number') {
                  url.searchParams.set('time', posterTimestamp.toString())
                }

                if (siblingData.playbackPolicy === 'signed') {
                  const token = await mux.jwt.signPlaybackId(playbackId, {
                    expiration: '1d',
                    type: 'thumbnail',
                  })

                  url.searchParams.set('token', token)
                }

                return url.toString()
              },
            ],
          },
        },
        {
          name: 'gifUrl',
          label: 'Gif URL',
          type: 'text',
          virtual: true,
          admin: {
            hidden: true,
          },
          hooks: {
            afterRead: [
              async ({ data, siblingData }) => {
                const playbackId = siblingData?.['playbackId']
                const posterTimestamp = data?.['posterTimestamp']

                if (!playbackId) {
                  return null
                }

                const url = new URL(`https://image.mux.com/${playbackId}/animated.gif`)

                if (typeof posterTimestamp === 'number') {
                  url.searchParams.set('time', posterTimestamp.toString())
                }

                if (siblingData.playbackPolicy === 'signed') {
                  const token = await mux.jwt.signPlaybackId(playbackId, {
                    expiration: '1d',
                    type: 'gif',
                  })

                  url.searchParams.set('token', token)
                }

                return url.toString()
              },
            ],
          },
        },
      ],
    },
    {
      name: 'thumbnailUrl',
      type: 'text',
      label: 'Thumbnail URL',
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) =>
          (data.thumbnailUrl && data.source === 'youtube') || data.source === 'loom',
      },
    },
  ],
} as const

export default Videos
