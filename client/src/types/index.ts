export type UserRole =
  | 'litigant'
  | 'advocate'
  | 'clerk'
  | 'prosecutor'
  | 'judge'
  | 'reporter'
  | 'appellate'
  | 'admin'
  | 'superadmin'

export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
  meta?: Record<string, unknown>
}
