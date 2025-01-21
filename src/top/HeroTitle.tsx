import React from 'react'

export function HeroTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="display-1 text-center py-4 my-0">{children}</h1>
}
