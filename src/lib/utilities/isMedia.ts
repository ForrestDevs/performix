export const isMediaObject = (media: any) => {
  return typeof media === 'object' && media !== null && 'url' in media
}
