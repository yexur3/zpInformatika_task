'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { fetchAllControls, updateControl, GlobalControlState } from '@/lib/api'

export default function AdminPage() {
  const [controls, setControls] = useState<GlobalControlState[]>([])

  useEffect(() => {
    fetchAllControls().then(setControls).catch(console.error)
  }, [])

  const handleToggle = async (page: string, field: 'isButtonDisabled' | 'isInputDisabled' | 'isTableVisible') => {
    const control = controls.find((c) => c.page === page)
    if (!control) return
    try {
      const updated = await updateControl(page, { [field]: !control[field] })
      setControls((prev) => prev.map((c) => (c.page === page ? updated : c)))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin — Global Control</h1>
        {controls.map((control) => (
          <div key={control.page} className="bg-white rounded-lg shadow p-6 mb-4">
            <h2 className="text-lg font-semibold mb-3">{control.page}</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={control.isButtonDisabled}
                  onChange={() => handleToggle(control.page, 'isButtonDisabled')}
                  className="w-5 h-5"
                />
                <span>Buttons Disabled</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={control.isInputDisabled}
                  onChange={() => handleToggle(control.page, 'isInputDisabled')}
                  className="w-5 h-5"
                />
                <span>Inputs Readonly</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!control.isTableVisible}
                  onChange={() => handleToggle(control.page, 'isTableVisible')}
                  className="w-5 h-5"
                />
                <span>Table Hidden</span>
              </label>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
