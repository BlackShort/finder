'use client'

import React, { createContext, useState, useContext, useCallback } from 'react'
import { useDebounce } from 'use-debounce'

const SearchContext = createContext<{
  search: string
  debouncedSearch: string
  setSearch: (search: string) => void
}>({
  search: '',
  debouncedSearch: '',
  setSearch: () => { },
})

export const useSearch = () => useContext(SearchContext)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);

  const handleSetSearch = useCallback((newSearch: string) => {
    setSearch(newSearch)
  }, [])

  return (
    <SearchContext.Provider value={{ search, debouncedSearch, setSearch: handleSetSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

