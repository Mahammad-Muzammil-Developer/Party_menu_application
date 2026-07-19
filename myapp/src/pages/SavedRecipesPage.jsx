import { Link, useNavigate } from 'react-router-dom'
import { menuItems } from '../data/menuData.js'
import { useSavedRecipes } from '../context/SavedRecipesContext.jsx'
import './SavedRecipesPage.css'
import './FoodDetailPage.css'

export default function SavedRecipesPage() {
  const { savedIds, removeSaved } = useSavedRecipes()
  const savedItems = menuItems.filter((item) => savedIds.includes(item.id))
  const navigate = useNavigate()

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
          <p>No saved recipes yet.</p>
          <Link to="/" className="primary-button">
            Browse the menu
          </Link>
        </section>
      ) : (
        <section className="saved-list">
          {savedItems.map((item) => (
            <section className="saved-row" key={item.id}>
              <div className="saved-top detail-card">
                <div className="detail-image-wrapper" onClick={() => navigate(`/menu/${item.id}`)}>
                  <img src={item.image} alt={item.name} />
                  <span className={`diet-badge ${item.isVeg ? 'veg' : 'nonveg'}`}>
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>
                <div className="detail-info">
                  <span className="category-label">{item.category.toUpperCase()}</span>
                  <h1>{item.name}</h1>
                  <p className="servings-text">{item.servings}</p>
                  <p className="detail-description">{item.fullDescription}</p>
                  <div className="ingredients-panel">
                    <h2>Ingredients</h2>
                    <ul>
                      {item.ingredients.map((ing) => (
                        <li key={ing.name}><strong>{ing.name}:</strong> {ing.quantity}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="button" className="primary-button" onClick={() => navigate(`/menu/${item.id}`)}>
                      View
                    </button>
                    <button type="button" className="remove-button" onClick={() => removeSaved(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              
            </section>
          ))}
        </section>
      )}
    </main>
  )
}
