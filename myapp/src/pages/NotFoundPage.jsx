import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './NotFoundPage.css'

export default function NotFoundPage() {
  const { isAuthenticated } = useAuth()
  const fallbackLink = isAuthenticated ? '/' : '/signin'
  const fallbackText = isAuthenticated ? 'Back to Menu' : 'Back to Sign In'

  return (
    <main className="notfound-page">
      <section className="notfound-card">
        <h1>404 – Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to={fallbackLink} className="primary-button">
          {fallbackText}
        </Link>
      </section>
    </main>
  )
}
