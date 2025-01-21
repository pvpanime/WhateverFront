import { useCallback, useRef } from 'react'
import { Container, FormFloating, TheLinkYouWant } from './WhatYouWant'
import { useLocalAuth } from '../hooks/localAuth'

export function Login() {
  const { user, login } = useLocalAuth()
  const formEl = useRef<HTMLFormElement>()
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const formData = new FormData(formEl.current)
      login(
        formData.get('username').toString(),
        formData.get('password').toString(),
        formData.get('rememberMe') === 'yes',
      )
    },
    [formEl],
  )
  return user ? (
    <script>{(location.href = '/')}</script>
  ) : (
    <Container>
      <title>Login</title>
      <h2 className="pb-4">Login</h2>
      <form method="POST" action="/login" ref={formEl} onSubmit={onSubmit}>
        <FormFloating name="username" label="Username" />
        <FormFloating name="password" label="Password" type="password" />
        <div className="form-check text-start my-3">
          <input
            autoComplete="off"
            className="form-check-input"
            type="checkbox"
            name="rememberMe"
            value="yes"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>
        <input
          type="submit"
          className="btn btn-primary w-100 py-2 mb-2"
          value="Sign in"
        />
      </form>
      <div>have no account?</div>
      <TheLinkYouWant className="btn btn-outline-secondary py-2" to="/signup">
        Sign up
      </TheLinkYouWant>
    </Container>
  )
}
