export type TargetCreateProps = {
  name: string
  amount: number
}

export type TargetUpdateProps = TargetCreateProps & {
  id: number
}

export type TargetResponse = {
  id: number
  name: string
  amount: number
  current: number
  percentage: number
  created_at: Date
  updated_at: Date
}
