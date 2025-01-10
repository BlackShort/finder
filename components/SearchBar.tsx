'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from 'lucide-react'
import { useSearch } from './SearchProvider'

interface SearchBarProps {
  onClose: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const { search, setSearch } = useSearch()

  const handleCloseClick = () => {
    if (search) {
      setSearch('')
    } else {
      onClose()
    }
  }

  return (
    <div className="relative flex items-center w-full">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-12 pr-8 w-full text-neutral-900 tracking-wider"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute text-neutral-900 right-0 top-1/2 transform -translate-y-1/2"
        onClick={handleCloseClick}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  )
}

