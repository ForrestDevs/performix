export const formatDateTime = (timestamp: string): string => {
  const now = new Date()
  let date = now
  if (timestamp) date = new Date(timestamp)
  const months = date.getMonth()
  const days = date.getDate()
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  // const seconds = date.getSeconds();

  const MM = months + 1 < 10 ? `0${months + 1}` : months + 1
  const DD = days < 10 ? `0${days}` : days
  const YYYY = date.getFullYear()
  // const AMPM = hours < 12 ? 'AM' : 'PM';
  // const HH = hours > 12 ? hours - 12 : hours;
  // const MinMin = (minutes < 10) ? `0${minutes}` : minutes;
  // const SS = (seconds < 10) ? `0${seconds}` : seconds;

  return `${MM}/${DD}/${YYYY}`
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
  return date.toLocaleDateString()
}
