import { useState } from 'react'

function NonReactCheckbox({ checked = true }) {
  return <input type="checkbox" defaultChecked={checked} />
}

function Checkbox({ initChecked = true }) {
  const [checked, setChecked] = useState(initChecked)
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  )
}

export function CheckboxView() {
  return (
    <div className="container">
      <NonReactCheckbox />
      <Checkbox />
    </div>
  )
}
