import type { HTMLInputTypeAttribute } from 'react'
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
  name?: string | undefined
  label: string
  type?: HTMLInputTypeAttribute | undefined
}
export function FormFloating({
  name,
  label,
  type = 'text',
}: FormFloatingProps) {
  const id = useId()
  const actualId = name ? name + '-' + id : id
  return (
    <div className="form-floating mb-3">
      <input
        autoComplete="off"
        type={type}
        className="form-control"
        id={actualId}
        name={name}
        placeholder={label}
      />
      <label htmlFor={actualId}>{label}</label>
    </div>
  )
}
