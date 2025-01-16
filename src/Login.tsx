import './styles/bootstrap.css'

export function Login() {
  return (
    <div className="form-signin w-100 m-auto">
      <h2 className="py-4">Login</h2>
      <form method="POST" action="/login" onSubmit={(e) => e.preventDefault()}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Username"
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>
        <input
          type="submit"
          className="btn btn-primary w-100 py-2"
          value="Sign in"
        />
      </form>
    </div>
  )
}
