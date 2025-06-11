import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { anyone } from '@/payload/access'
import { authenticated } from '@/payload/access'
import { MEDIA_SLUG } from '../constants'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: MEDIA_SLUG,
  folders: {
    browseByFolder: true,
  },
  access: {
    create: () => true,
    delete: () => true,
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    ...(process.env.NODE_ENV === 'development' && {
      staticDir: path.resolve(dirname, '../../../../public/media'),
    }),
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        fit: 'cover',
        width: 500,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 100,
          },
        },
      },
    ],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
      },
    },
    resizeOptions: {
      width: 2560,
      withoutEnlargement: true,
    },
    bulkUpload: true,
    disableLocalStorage: true,
    focalPoint: true,
    crop: true,
    pasteURL: {
      allowList: [
        {
          hostname: 'payloadcms.com', // required
          pathname: '',
          port: '',
          protocol: 'https',
          search: '',
        },
        {
          hostname: 'drive.google.com',
          protocol: 'https',
        },
        {
          hostname: 'www.bonavistaleisurescapes.com',
          protocol: 'https',
        },
        {
          hostname: 'www.acdcfeeds.com',
          protocol: 'https',
        },
      ],
    },
  },
}
