import { useNavigate } from 'react-router-dom'
import './FoodCard.css'

export function FoodCard({ item, showRemove = false, onRemove }) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/menu/${item.id}`)
  }

  const handleRemove = (event) => {
    event.stopPropagation()
    if (onRemove) onRemove(item.id)
  }

  return (
    <article className="food-card" onClick={handleCardClick}>
      <div className="food-card-image-wrapper">
        <img className="food-card-image" src={item.image} alt={item.name} />
        <span className={`diet-badge ${item.isVeg ? 'veg' : 'nonveg'}`}>
          {item.isVeg ? 'Veg' : 'Non-Veg'}
        </span>
      </div>
      <div className="food-card-body">
        <span className="category-label">{item.category.toUpperCase()}</span>
        <h3 className="food-card-title">{item.name}</h3>
        <p className="food-card-description">{item.description}</p>
        <div className="food-card-footer">
          <span className="servings-text">{item.servings}</span>
          {showRemove && (
            <button type="button" className="remove-button" onClick={handleRemove}>
              Remove
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
