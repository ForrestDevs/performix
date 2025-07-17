'use client'

import * as React from 'react'
import { cn } from '@/lib/utilities/ui'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import * as loom from '@loomhq/loom-embed'
// import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export type imgResolution = 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault'

interface YoutubeVideoProps {
  /** YouTube video ID */
  id: string
  /** Video title for accessibility */
  title: string
  /** Announcement text for screen readers (default: "Watch") */
  announce?: string
  /** CSS class applied when video is activated */
  activatedClass?: string
  /** Enable ad network preconnection */
  adNetwork?: boolean
  /** Video aspect ratio height (default: 9) */
  aspectHeight?: number
  /** Video aspect ratio width (default: 16) */
  aspectWidth?: number
  /** CSS class for the iframe element */
  iframeClass?: string
  /** Use no-cookie YouTube domain */
  noCookie?: boolean
  /** Force use of regular YouTube domain (overrides noCookie) */
  cookie?: boolean
  /** Enable YouTube JavaScript API */
  enableJsApi?: boolean
  /** Load iframe immediately without user interaction */
  alwaysLoadIframe?: boolean
  /** Additional URL parameters for the video */
  params?: string
  /** CSS class for the play button */
  playerClass?: string
  /** Treat as playlist instead of single video */
  playlist?: boolean
  /** Cover video ID for playlist thumbnail */
  playlistCoverId?: string
  /** Thumbnail image resolution (default: "hqdefault") */
  poster?: imgResolution
  /** Use WebP format for thumbnails */
  webp?: boolean
  /** CSS class for the wrapper element */
  wrapperClass?: string
  /** Callback fired when iframe is added to DOM */
  onIframeAdded?: () => void
  /** Start video muted */
  muted?: boolean
  /** Custom thumbnail URL (overrides poster) */
  thumbnail?: string
  /** Link rel attribute for poster preload */
  rel?: string
  /** HTML container element type (default: "div") */
  containerElement?: keyof React.JSX.IntrinsicElements
  /** Inline styles for the container */
  style?: React.CSSProperties
  /** Additional className for the wrapper */
  className?: string
}

export function YoutubeVideo({
  className,
  wrapperClass,
  iframeClass,
  playerClass,
  activatedClass,
  aspectHeight = 9,
  aspectWidth = 16,
  poster = 'hqdefault',
  webp = true,
  ...props
}: YoutubeVideoProps) {
  const defaultWrapperClass = cn(
    // Base container styles
    'relative w-full overflow-hidden bg-black',
    // Aspect ratio using Tailwind
    'aspect-video',
    // Background image positioning
    'bg-cover bg-center bg-no-repeat',
    // Cursor and interaction
    'cursor-pointer',
    // Custom class
    className,
    wrapperClass,
  )

  const defaultIframeClass = cn('absolute inset-0 w-full h-full', iframeClass)

  const defaultPlayerClass = cn(
    // Let CSS handle all the play button styling
    playerClass,
  )

  const defaultActivatedClass = cn('transition-all duration-300', activatedClass)

  return (
    <div className="w-full">
      <LiteYouTubeEmbed
        {...props}
        aspectHeight={aspectHeight}
        aspectWidth={aspectWidth}
        poster={poster}
        webp={webp}
        wrapperClass={defaultWrapperClass}
        iframeClass={defaultIframeClass}
        playerClass={defaultPlayerClass}
        activatedClass={defaultActivatedClass}
      />
    </div>
  )
}

export function LoomVideo({ url, className }: { url: string; className?: string }) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const videoRef = React.useRef<HTMLDivElement>(null)
  const linkRef = React.useRef<HTMLAnchorElement | null>(null)

  React.useEffect(() => {
    let isMounted = true

    const loadLoomEmbed = async () => {
      if (!videoRef.current || !url || !isMounted) return

      try {
        setIsLoaded(false)
        setHasError(false)

        // Wait for the DOM to be ready
        if (document.readyState !== 'complete') {
          await new Promise<void>(resolve => {
            const handleLoad = () => {
              window.removeEventListener('load', handleLoad)
              resolve()
            }
            window.addEventListener('load', handleLoad, { once: true })
          })
        }

        // Check if component is still mounted after async operation
        if (!isMounted || !videoRef.current) return

        // Clean up previous link if it exists
        if (linkRef.current && videoRef.current.contains(linkRef.current)) {
          videoRef.current.removeChild(linkRef.current)
          linkRef.current = null
        }

        // Create a new link element for Loom to replace
        const linkElement = document.createElement('a')
        linkElement.href = url + '&hideEmbedTopBar=true'
        linkElement.className = 'loom-video'
        linkElement.style.display = 'block'
        linkElement.style.width = '100%'
        linkElement.style.height = '100%'

        // Store reference and append to container
        linkRef.current = linkElement
        videoRef.current.appendChild(linkElement)

        // Check if loom is available and initialize
        if (typeof window !== 'undefined' && loom && isMounted) {
          // Use Loom's linkReplace function to convert the link to an embed
          await loom.linkReplace('.loom-video', {
            gifThumbnail: true,
          })
          
          if (isMounted) {
            setIsLoaded(true)
          }
        } else {
          throw new Error('Loom SDK not available')
        }
      } catch (error) {
        console.error('Error loading Loom video:', error)
        if (isMounted) {
          setHasError(true)
        }
      }
    }

    loadLoomEmbed()

    // Cleanup function
    return () => {
      isMounted = false
      if (linkRef.current && videoRef.current?.contains(linkRef.current)) {
        try {
          videoRef.current.removeChild(linkRef.current)
        } catch (error) {
          // Ignore errors during cleanup
        }
      }
      linkRef.current = null
    }
  }, [url])

  if (hasError) {
    return (
      <div className={cn('w-full rounded-lg bg-gray-100 flex items-center justify-center', className)}>
        <div className="text-center">
          <p className="text-gray-600 mb-2">Failed to load video</p>
          <a 
            href={url + '?hideEmbedTopBar=true'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Watch on Loom
          </a>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={videoRef}
      className={cn('w-full rounded-lg', className)}
    >
      {!isLoaded && (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <p className="text-gray-600">Loading video...</p>
        </div>
      )}
    </div>
  )
}
