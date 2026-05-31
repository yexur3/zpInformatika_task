'use client'

import { useGlobalControl } from '@/hooks/useGlobalControl'
import { postErrorLog } from '@/lib/api'
import { useCallback, useRef } from 'react'

interface SubpageContentProps {
  page: string
  errorInputs: Set<string>
  setErrorInputs: React.Dispatch<React.SetStateAction<Set<string>>>
}

export default function SubpageContent({ page, errorInputs, setErrorInputs }: SubpageContentProps) {
  const { control, loading } = useGlobalControl(page)
  const hasLoggedRef = useRef<Set<string>>(new Set())

  const handleInputChange = useCallback(
    (inputName: string, value: string) => {
      if (value === 'ERROR') {
        setErrorInputs((prev) => new Set(prev).add(inputName))
        if (!hasLoggedRef.current.has(inputName)) {
          hasLoggedRef.current.add(inputName)
          postErrorLog(page, inputName).catch(console.error)
        }
      } else {
        setErrorInputs((prev) => {
          const next = new Set(prev)
          next.delete(inputName)
          return next
        })
        hasLoggedRef.current.delete(inputName)
      }
    },
    [page, setErrorInputs]
  )

  if (loading) return <p className="text-gray-500">Loading...</p>
  if (!control) return <p className="text-red-500">Failed to load control state</p>

  const hasError = errorInputs.size > 0

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <button
          disabled={control.isButtonDisabled}
          className={`px-4 py-2 rounded text-white font-medium transition-colors ${
            hasError
              ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-300'
              : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300'
          } disabled:cursor-not-allowed`}
        >
          Button 1
        </button>
        <button
          disabled={control.isButtonDisabled}
          className={`px-4 py-2 rounded text-white font-medium transition-colors ${
            hasError
              ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-300'
              : 'bg-green-600 hover:bg-green-700 disabled:bg-gray-300'
          } disabled:cursor-not-allowed`}
        >
          Button 2
        </button>
        <button
          disabled={control.isButtonDisabled}
          className={`px-4 py-2 rounded text-white font-medium transition-colors ${
            hasError
              ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-300'
              : 'bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300'
          } disabled:cursor-not-allowed`}
        >
          Button 3
        </button>
      </div>

      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Input 1</label>
          <input
            type="text"
            readOnly={control.isInputDisabled}
            onChange={(e) => handleInputChange('input-1', e.target.value)}
            className={`w-full border rounded px-3 py-2 ${
              control.isInputDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Input 2</label>
          <input
            type="text"
            readOnly={control.isInputDisabled}
            onChange={(e) => handleInputChange('input-2', e.target.value)}
            className={`w-full border rounded px-3 py-2 ${
              control.isInputDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
            }`}
          />
        </div>
      </div>

      {control.isTableVisible && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Alice</td>
              <td className="border border-gray-300 px-4 py-2">alice@example.com</td>
              <td className="border border-gray-300 px-4 py-2">Admin</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Bob</td>
              <td className="border border-gray-300 px-4 py-2">bob@example.com</td>
              <td className="border border-gray-300 px-4 py-2">User</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Charlie</td>
              <td className="border border-gray-300 px-4 py-2">charlie@example.com</td>
              <td className="border border-gray-300 px-4 py-2">Editor</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}
