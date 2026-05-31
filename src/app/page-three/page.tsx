'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import SubpageContent from '@/components/SubpageContent'

export default function PageThree() {
  const [errorInputs, setErrorInputs] = useState<Set<string>>(new Set())

  return (
    <div>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Page Three</h1>
        <SubpageContent page="/page-three" errorInputs={errorInputs} setErrorInputs={setErrorInputs} />
      </main>
    </div>
  )
}
