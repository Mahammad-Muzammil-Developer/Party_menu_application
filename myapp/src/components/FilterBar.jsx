import './FilterBar.css'

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'starter', label: 'Starter' },
  { value: 'main', label: 'Main' },
  { value: 'sides', label: 'Sides' },
  { value: 'desert', label: 'Desert' },
]

const DIET_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'veg', label: 'Veg' },
  { value: 'nonveg', label: 'Non-Veg' },
]

export function FilterBar({ category, diet, searchText, onCategoryChange, onDietChange, onSearchTextChange, onSearch }) {
  return (
    <section className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">Category</span>
        <div className="chips-row">
          {CATEGORY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`chip ${category === option.value ? 'chip-active' : ''}`}
              onClick={() => onCategoryChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">Diet</span>
        <div className="chips-row">
          {DIET_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`chip ${diet === option.value ? 'chip-active' : ''}`}
              onClick={() => onDietChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={searchText}
          placeholder="Search dishes by name"
          onChange={(event) => onSearchTextChange(event.target.value)}
          aria-label="Search dishes"
        />
        <button type="button" className="search-button" onClick={onSearch}>
          Search
        </button>
      </div>
    </section>
  )
}
