import React from 'react'
import { Navbar } from '../components/navbar'
import { Section } from '../components/section/section'

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Section />

    </div>
  )
}
