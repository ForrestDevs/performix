/**
 * Extracts the video ID from a YouTube URL
 * Supports various YouTube URL formats including:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 * - URLs with additional parameters
 *
 * @param url - The YouTube URL to extract the video ID from
 * @returns The video ID if found, null otherwise
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null
  }

  try {
    // Remove any whitespace
    const cleanUrl = url.trim()

    // Regular expression to match various YouTube URL formats
    const patterns = [
      // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      // Short URL: https://youtu.be/VIDEO_ID
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      // Embed URL: https://www.youtube.com/embed/VIDEO_ID
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      // Old format: https://www.youtube.com/v/VIDEO_ID
      /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
      // YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
      /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    ]

    for (const pattern of patterns) {
      const match = cleanUrl.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  } catch (error) {
    console.error('Error extracting YouTube video ID:', error)
    return null
  }
}
