import { useId } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

export const TheLinkYouWant = styled(Link)`
  display: block;
`
export const Container = styled.div.attrs({
  className: 'form-signin w-100 m-auto',
})`
  max-width: 360px;
  padding: 1rem;
`

interface FormFloatingProps {
  name: string
  label: string
}
export function FormFloating({ name, label }: FormFloatingProps) {
  const id = useId()
  return (
    <div className="form-floating mb-3">
      <input
        autoComplete="off"
        type="text"
        className="form-control"
        id={name + id}
        name={name}
        placeholder={label}
      />
      <label htmlFor={name + id}>{label}</label>
    </div>
  )
}
