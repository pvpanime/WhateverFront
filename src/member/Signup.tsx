import { Container, TheLinkYouWant } from './WhatYouWant'

export function Signup() {
  return (
    <Container>
      <title>Signup</title>
      <h2 className="pb-4">Sign Up</h2>
      <form method="POST" action="/login" onSubmit={(e) => e.preventDefault()}>
        <div className="form-floating mb-3">
          <input
            autoComplete="off"
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Username"
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            autoComplete="off"
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            autoComplete="off"
            type="password"
            className="form-control"
            id="confirm"
            placeholder="Password Confirm"
          />
          <label htmlFor="confirm">Password Confirm</label>
        </div>
        <div className="form-floating mb-3">
          <input
            autoComplete="off"
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder="E-mail"
          />
          <label htmlFor="email">E-mail</label>
        </div>
        <input
          type="submit"
          className="btn btn-primary w-100 py-2 mb-2"
          value="Sign Up!"
        />
      </form>
      <div>Already have account?</div>
      <TheLinkYouWant className="btn btn-outline-secondary py-2" to="/login">
        Login
      </TheLinkYouWant>
    </Container>
  )
}
