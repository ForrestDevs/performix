import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
// Image metadata
export const alt = "Performix Hockey: Why We're Different"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), '/public/performix-hockey-banner.png'),
    'base64',
  )
  const logoSrc = `data:image/png;base64,${logoData}`
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={logoSrc} alt={alt} height="100%" width="100%" />
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}
