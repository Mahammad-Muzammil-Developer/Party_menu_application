import { Link } from 'react-router-dom'
import { menuItems } from '../data/menuData.js'
import { useSavedRecipes } from '../context/SavedRecipesContext.jsx'
import { FoodCard } from '../components/FoodCard.jsx'
import './SavedRecipesPage.css'

export default function SavedRecipesPage() {
  const { savedIds, removeSaved } = useSavedRecipes()
  const savedItems = menuItems.filter((item) => savedIds.includes(item.id))

  return (
    <main className="saved-page">
      <header className="saved-header">
        <div>
          <h1>Saved Recipes</h1>
          <p>{savedItems.length} saved item{savedItems.length === 1 ? '' : 's'}</p>
        </div>
        <Link to="/" className="secondary-button">
          Back to Menu
        </Link>
      </header>

      {savedItems.length === 0 ? (
        <section className="empty-state">
          <p>No saved recipes yet</p>
          <Link to="/" className="primary-button">
            Browse the menu
          </Link>
        </section>
      ) : (
        <section className="saved-list menu-grid">
          {savedItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              showRemove
              onRemove={removeSaved}
            />
          ))}
        </section>
      )}
    </main>
  )
}
