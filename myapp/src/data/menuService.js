import { menuItems } from './menuData.js'

export function filterMenuItems({ category = 'all', diet = 'all', name = '' } = {}) {
  const lowerName = name.trim().toLowerCase()

  return menuItems.filter((item) => {
    if (category !== 'all' && item.category !== category) {
      return false
    }

    if (diet !== 'all') {
      if (diet === 'veg' && !item.isVeg) return false
      if (diet === 'nonveg' && item.isVeg) return false
    }

    if (lowerName && !item.name.toLowerCase().includes(lowerName)) {
      return false
    }

    return true
  })
}

export function getMenuItemById(id) {
  return menuItems.find((item) => item.id === Number(id))
}
