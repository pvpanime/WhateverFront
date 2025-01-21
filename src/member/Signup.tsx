import { Container, FormFloating, TheLinkYouWant } from './WhatYouWant'

export function Signup() {
  return (
    <Container>
      <title>Signup</title>
      <h2 className="pb-4">Sign Up</h2>
      <form
        method="POST"
        action="/api/user/signup"
        onSubmit={(e) => e.preventDefault()}
      >
        <FormFloating name="username" label="Username" />
        <FormFloating name="password" label="Password" type="password" />
        <FormFloating label="Password Confirm" type="password" />
        <FormFloating name="email" label="E-mail" type="email" />
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
