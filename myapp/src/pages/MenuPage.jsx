import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { filterMenuItems } from '../data/menuService.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useSavedRecipes } from '../context/SavedRecipesContext.jsx'
import { FoodCard } from '../components/FoodCard.jsx'
import { FilterBar } from '../components/FilterBar.jsx'
import './MenuPage.css'

export default function MenuPage() {
  const [category, setCategory] = useState('all')
  const [diet, setDiet] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [activeSearch, setActiveSearch] = useState('')
  const { user, signOut } = useAuth()
  const { savedCount } = useSavedRecipes()
  const navigate = useNavigate()

  const menuItems = useMemo(
    () => filterMenuItems({ category, diet, name: activeSearch }),
    [category, diet, activeSearch],
  )

  const handleSearch = () => {
    setActiveSearch(searchText)
  }

  const handleLogout = () => {
    signOut()
    navigate('/signin', { replace: true })
  }

  return (
    <main className="menu-page">
      <header className="menu-header">
        <div>
          <h1>Party Menu</h1>
          <p>Welcome, {user?.name || 'Guest'}</p>
        </div>
        <div className="menu-actions">
          <Link to="/saved-recipes" className="saved-link">
            Saved Recipes <span className="badge">{savedCount}</span>
          </Link>
          <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <FilterBar
        category={category}
        diet={diet}
        searchText={searchText}
        onCategoryChange={setCategory}
        onDietChange={setDiet}
        onSearchTextChange={setSearchText}
        onSearch={handleSearch}
      />

      <section className="menu-summary">
        <p>{menuItems.length} item{menuItems.length === 1 ? '' : 's'} found</p>
      </section>

      {menuItems.length === 0 ? (
        <section className="empty-state">
          <p>No dishes found. Try different filters.</p>
        </section>
      ) : (
        <section className="menu-grid">
          {menuItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </main>
  )
}
