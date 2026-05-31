export interface GlobalControlState {
  id: number
  page: string
  isButtonDisabled: boolean
  isInputDisabled: boolean
  isTableVisible: boolean
}

export interface ErrorLogResponse {
  id: number
  createdAt: string
}

const API_BASE = 'http://localhost:8080/api'

export async function fetchControlByPage(page: string): Promise<GlobalControlState> {
  const res = await fetch(`${API_BASE}/control?page=${encodeURIComponent(page)}`)
  if (!res.ok) throw new Error(`Failed to fetch control for ${page}`)
  return res.json()
}

export async function fetchAllControls(): Promise<GlobalControlState[]> {
  const res = await fetch(`${API_BASE}/control/all`)
  if (!res.ok) throw new Error('Failed to fetch all controls')
  return res.json()
}

export async function updateControl(
  page: string,
  updates: Partial<Pick<GlobalControlState, 'isButtonDisabled' | 'isInputDisabled' | 'isTableVisible'>>
): Promise<GlobalControlState> {
  const res = await fetch(`${API_BASE}/control`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page, ...updates }),
  })
  if (!res.ok) throw new Error(`Failed to update control for ${page}`)
  return res.json()
}

export async function postErrorLog(page: string, inputName: string): Promise<ErrorLogResponse> {
  const res = await fetch(`${API_BASE}/logs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page, inputName }),
  })
  if (!res.ok) throw new Error('Failed to post error log')
  return res.json()
}
