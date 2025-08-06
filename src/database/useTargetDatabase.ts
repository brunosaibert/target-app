import { useSQLiteContext } from "expo-sqlite"

import type { TargetCreateProps } from "./useTargetDatabase.types"

export function useTargetDatabase() {
  const database = useSQLiteContext()

  async function create(data: TargetCreateProps) {
    const statement = await database.prepareAsync(
      "INSERT INTO targets (name, amount) VALUES ($name, $amount)"
    )

    statement.executeAsync({
      $name: data.name,
      $amount: data.amount,
    })
  }

  return { create }
}

export type { TargetCreateProps }
