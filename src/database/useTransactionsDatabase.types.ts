export type TransactionCreate = {
  target_id: number
  amount: number
  observation?: string
}

export type TransactionResponse = {
  id: number
  target_id: number
  amount: number
  observation: string
  created_at: Date
  updated_at: Date
}

export type SummaryResponse = {
  input: number
  output: number
}
