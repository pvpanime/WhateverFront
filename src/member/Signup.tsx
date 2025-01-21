import { useCallback, useRef, type FormEvent } from 'react'
import { Container, FormFloating, TheLinkYouWant } from './WhatYouWant'
import axios from 'axios'
import { useNavigate } from 'react-router'

export function Signup() {
  const navigate = useNavigate()
  const formEl = useRef<HTMLFormElement>()
  const doSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(formEl.current)
    axios
      .post('/api/user/signup', {
        username: formData.get('username'),
        password: formData.get('password'),
        email: formData.get('email'),
      })
      .then(() => {
        window.alert('Welcome!')
        navigate('/login')
      })
      .catch((err) => {
        window.alert(err)
        console.error(err)
      })
  }, [])
  return (
    <Container>
      <title>Signup</title>
      <h2 className="pb-4">Sign Up</h2>
      <form
        ref={formEl}
        method="POST"
        action="/api/user/signup"
        onSubmit={doSubmit}
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
