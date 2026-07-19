import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'party_menu_saved_recipes'
const SavedRecipesContext = createContext(null)

export function SavedRecipesProvider({ children }) {
  const [savedIds, setSavedIds] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds))
  }, [savedIds])

  const isSaved = (id) => savedIds.includes(Number(id))

  const addSaved = (id) => {
    const numericId = Number(id)
    setSavedIds((current) => (current.includes(numericId) ? current : [...current, numericId]))
  }

  const removeSaved = (id) => {
    const numericId = Number(id)
    setSavedIds((current) => current.filter((savedId) => savedId !== numericId))
  }

  const toggleSaved = (id) => {
    if (isSaved(id)) {
      removeSaved(id)
    } else {
      addSaved(id)
    }
  }

  const value = useMemo(
    () => ({ savedIds, savedCount: savedIds.length, isSaved, addSaved, removeSaved, toggleSaved }),
    [savedIds],
  )

  return <SavedRecipesContext.Provider value={value}>{children}</SavedRecipesContext.Provider>
}

export function useSavedRecipes() {
  const context = useContext(SavedRecipesContext)
  if (!context) {
    throw new Error('useSavedRecipes must be used within SavedRecipesProvider')
  }
  return context
}
