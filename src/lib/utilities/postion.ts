export function getPosition(position: string | undefined | null) {
  if (!position) return ''
  return position.charAt(0).toUpperCase() + position.slice(1)
}
