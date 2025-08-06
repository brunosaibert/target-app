import { useSQLiteContext } from "expo-sqlite"

import type {
  TargetCreateProps,
  TargetUpdateProps,
  TargetResponse,
} from "./useTargetDatabase.types"

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

  function listBySavedValue() {
    return database.getAllAsync<TargetResponse>(`
        SELECT
          targets.id,
          targets.name,
          targets.amount,
          COALESCE(SUM(transactions.amount), 0) AS current,
          COALESCE((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
          targets.created_at,
          targets.updated_at
        FROM targets
        LEFT JOIN transactions ON targets.id = transactions.target_id
        GROUP BY targets.id, targets.name, targets.amount
        ORDER BY current DESC
      `)
  }

  function show(id: number) {
    return database.getFirstAsync<TargetResponse>(`
        SELECT
          targets.id,
          targets.name,
          targets.amount,
          COALESCE(SUM(transactions.amount), 0) AS current,
          COALESCE((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
          targets.created_at,
          targets.updated_at
        FROM targets
        LEFT JOIN transactions ON targets.id = transactions.target_id
        WHERE targets.id = ${id}
      `)
  }

  async function update(data: TargetUpdateProps) {
    const statement = await database.prepareAsync(`
        UPDATE targets SET
          name = $name,
          amount = $amount,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $id
      `)

    statement.executeAsync({
      $id: data.id,
      $name: data.name,
      $amount: data.amount,
    })
  }

  async function remove(id: number) {
    await database.runAsync("DELETE FROM targets WHERE id = ?", id)
  }

  return {
    create,
    update,
    remove,
    listBySavedValue,
    show,
  }
}

export type { TargetResponse, TargetCreateProps, TargetUpdateProps }
