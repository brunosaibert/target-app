import { useCallback, useState } from "react"
import { Alert, StatusBar, View } from "react-native"
import { router, useFocusEffect } from "expo-router"

import { Button } from "@/components/Button"
import { HomeHeader, type HomeHeaderProps } from "@/components/HomeHeader"
import { List } from "@/components/List"
import { Loading } from "@/components/Loading"
import { Target, type TargetProps } from "@/components/Target"

import { useTargetDatabase } from "@/database/useTargetDatabase"
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase"

import { numberToCurrency } from "@/utils/numberToCurrency"

export default function Index() {
  const [summary, setSummary] = useState<HomeHeaderProps>(null)
  const [targets, setTargets] = useState<TargetProps[]>([])
  const [isFetching, setIsFetching] = useState(true)

  const targetDB = useTargetDatabase()
  const transactionDB = useTransactionsDatabase()

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDB.listByClosestTarget()

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: String(item.percentage.toFixed(0)) + "%",
        target: numberToCurrency(item.amount),
      }))
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas.")

      console.log(error)
    }
  }

  async function fetchSummary(): Promise<HomeHeaderProps> {
    try {
      const response = await transactionDB.summary()

      return {
        total: numberToCurrency(response.input + response.output),
        input: {
          label: "Entradas",
          value: numberToCurrency(response.input),
        },
        output: {
          label: "Saídas",
          value: numberToCurrency(response.output),
        },
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o resumo.")

      console.log(error)
    }
  }

  async function fetchData() {
    const targetDataPromisse = fetchTargets()
    const summaryDataPromisse = fetchSummary()

    const [targetData, summaryData] = await Promise.all([
      targetDataPromisse,
      summaryDataPromisse,
    ])

    setTargets(targetData)
    setSummary(summaryData)

    setIsFetching(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <HomeHeader data={summary} />
      <List
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta. Toque em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24 }}
      />
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  )
}
