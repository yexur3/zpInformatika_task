'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchControlByPage, updateControl, GlobalControlState } from '@/lib/api'

export function useGlobalControl(page: string) {
  const [control, setControl] = useState<GlobalControlState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchControlByPage(page)
      .then(setControl)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [page])

  const toggle = useCallback(
    async (field: 'isButtonDisabled' | 'isInputDisabled' | 'isTableVisible') => {
      if (!control) return
      const newValue = !control[field]
      try {
        const updated = await updateControl(page, { [field]: newValue })
        setControl(updated)
      } catch (err) {
        console.error(err)
      }
    },
    [control, page]
  )

  return { control, loading, toggle }
}
