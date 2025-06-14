'use client'

import { Button } from '@/components/ui/button'
import { useQueryState } from 'nuqs'

export function LoadMoreButton() {
  const [page, setPage] = useQueryState('page', { defaultValue: '1' })

  const handleLoadMore = () => {
    const currentPage = parseInt(page)
    setPage((currentPage + 1).toString())
  }

  return (
    <div className="text-center">
      <Button
        variant="outline"
        size="lg"
        onClick={handleLoadMore}
        className="border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white px-8"
      >
        Load More Mentors
      </Button>
    </div>
  )
}
