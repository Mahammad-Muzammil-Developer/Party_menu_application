import { Link, useNavigate, useParams } from 'react-router-dom'
import { getMenuItemById } from '../data/menuService.js'
import { useSavedRecipes } from '../context/SavedRecipesContext.jsx'
import './FoodDetailPage.css'

export default function FoodDetailPage() {
  const { id } = useParams()
  const item = getMenuItemById(id)
  const { isSaved, toggleSaved, savedCount } = useSavedRecipes()
  const navigate = useNavigate()

  if (!item) {
    return (
      <main className="detail-page">
        <section className="not-found-card">
          <h2>Dish not found</h2>
          <button type="button" className="back-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </section>
      </main>
    )
  }

  const saved = isSaved(item.id)

  return (
    <main className="detail-page">
      <header className="detail-header">
        <button type="button" className="secondary-button" onClick={() => navigate('/')}>Back to Menu</button>
        <div className="detail-links">
          <Link to="/saved-recipes" className="secondary-button">
            Saved Recipes <span className="badge">{savedCount}</span>
          </Link>
          <button type="button" className="primary-button" onClick={() => toggleSaved(item.id)}>
            {saved ? 'Saved' : 'Save Recipe'}
          </button>
        </div>
      </header>

      <section className="detail-card">
        <div className="detail-main">
          <div className="detail-image-wrapper">
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
          </div>
        </div>

        <div className="ingredients-panel detail-ingredients">
          <h2>Ingredients</h2>
          <ul>
            {item.ingredients.map((ingredient) => (
              <li key={ingredient.name}>
                <span className="ingredient-name">{ingredient.name}</span>
                <span className="ingredient-qty">{ingredient.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
