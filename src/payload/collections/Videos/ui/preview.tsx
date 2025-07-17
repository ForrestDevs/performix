import Image from 'next/image'
import { DefaultCellComponentProps } from 'payload'

export function VideoPreview(props: DefaultCellComponentProps) {
  const row = props.rowData

  const playbackOption = row?.playbackOptions?.[0]

  let imgUrl: string | undefined
  if (row?.source === 'youtube' || row?.source === 'loom') {
    imgUrl = row?.thumbnailUrl
  } else {
    imgUrl = playbackOption?.gifUrl
  }

  if (!imgUrl) {
    return <>Preview not available.</>
  }

  return (
    <Image
      loading="lazy"
      alt={row?.title}
      src={imgUrl}
      width={80}
      height={80}
      unoptimized
      objectFit="contain"
    />
  )
}

export default VideoPreview
