import { NavLink } from 'react-router'
import { useLocalAuth } from '../hooks/localAuth'

export function Navbar() {
  const { user, logout } = useLocalAuth()
  return (
    <nav className="navbar navbar-expand bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand mb-0 h1" to="/">
          MySite
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/board">
                Board
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/bucket">
                Bucket
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/food">
                Food
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/reddit">
                Reddit
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/news">
                News
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/checkbox">
                Checkbox
              </NavLink>
            </li>
          </ul>
          <div className="d-flex gap-1">
            {user ? (
              <button onClick={logout} className="btn btn-outline-light">
                Logout
              </button>
            ) : (
              <a className="btn btn-outline-primary" href="/login">
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
