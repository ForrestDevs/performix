import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg"
    />
  )
}

export function PerformixLogo(props: Props) {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <Image
      alt="Performix Logo"
      width={250}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[15rem] w-full h-[34px]', className)}
      src="/performix-logo.png"
    />

    // <div className="flex items-center space-x-2">
    //   <div className="relative w-8 h-8">
    //     <svg viewBox="0 0 32 32" className="w-full h-full">
    //       <path
    //         d="M8 8L24 24M24 8L8 24"
    //         stroke="#0891B2"
    //         strokeWidth="3"
    //         strokeLinecap="round"
    //         className="drop-shadow-sm"
    //       />
    //     </svg>
    //   </div>
    //   <span className="text-xl font-bold text-gray-900">Performix</span>
    // </div>
  )
}
