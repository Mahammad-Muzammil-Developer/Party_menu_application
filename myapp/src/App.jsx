import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { SavedRecipesProvider } from './context/SavedRecipesContext.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import SignInPage from './pages/SignInPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import FoodDetailPage from './pages/FoodDetailPage.jsx'
import SavedRecipesPage from './pages/SavedRecipesPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <SavedRecipesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MenuPage />
                </ProtectedRoute>
              }
            />
            <Route path="/menu/:id" element={<FoodDetailPage />} />
            <Route path="/saved-recipes" element={<SavedRecipesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </SavedRecipesProvider>
    </AuthProvider>
  )
}

export default App
