import type { TransactionTypes } from "@/utils/TransactionTypes"

export type Props = {
  selected: TransactionTypes
  onChange: (type: TransactionTypes) => void
}
