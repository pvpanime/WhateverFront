import { Link } from 'react-router'

export function Navbar() {
  return (
    <nav className="navbar navbar-expand bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand mb-0 h1" to="/">
          MySite
        </Link>
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
              <Link className="nav-link" to="/board">
                Board
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bucket">
                BucketList
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/food">
                Food
              </Link>
            </li>
          </ul>
          {/* <th:block sec:authorize="isAuthenticated()">
        <div className="d-flex gap-1">
          <span className="text-body-secondary" th:text="${#authentication.principal.username}"></span>
          <form th:action="@{/logout}" method="POST">
            <input className="btn btn-outline-light" type="submit" value="Logout">
          </form>
        </div>
      </th:block>
      <th:block sec:authorize="isAnonymous()">
        <a className="btn btn-outline-primary" th:href="@{/login}">Login</a>
      </th:block> */}
        </div>
      </div>
    </nav>
  )
}
