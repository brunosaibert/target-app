import { useCallback, useState } from "react"
import { Alert, StatusBar, View } from "react-native"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router"
import dayjs from "dayjs"

import { Button } from "@/components/Button"
import { List } from "@/components/List"
import { Loading } from "@/components/Loading"
import { PageHeader } from "@/components/PageHeader"
import { Progress } from "@/components/Progress"
import { Transaction, type TransactionProps } from "@/components/Transaction"

import { useTargetDatabase } from "@/database/useTargetDatabase"
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase"

import { TransactionTypes } from "@/utils/TransactionTypes"
import { numberToCurrency } from "@/utils/numberToCurrency"

export default function InProgress() {
  const [isFetching, setIsFetching] = useState(true)
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  })
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  const params = useLocalSearchParams<{ id: string }>()

  const targetDB = useTargetDatabase()
  const transactionsDB = useTransactionsDatabase()

  async function fetchTargetDetails() {
    try {
      const response = await targetDB.show(Number(params.id))

      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      })
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")

      console.log(error)
    }
  }

  async function fetchTransactions() {
    try {
      const response = await transactionsDB.listByTargetId(Number(params.id))

      setTransactions(
        response.map((item) => ({
          id: String(item.id),
          value: numberToCurrency(item.amount),
          type:
            item.amount > 0 ? TransactionTypes.Input : TransactionTypes.Output,
          description: item.observation,
          date: dayjs(item.created_at).format("DD/MM/YYYY [às] HH:mm"),
        }))
      )
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as transações.")

      console.log(error)
    }
  }

  async function fetchData() {
    const fetchTargetDetailsPromisse = fetchTargetDetails()
    const fetchTransactionsPromisse = fetchTransactions()

    await Promise.all([fetchTargetDetailsPromisse, fetchTransactionsPromisse])

    setIsFetching(false)
  }

  async function handleTransactionRemove(id: string) {
    Alert.alert("Remover", "Deseja remover esta transação?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: () => transactionRemove(id),
      },
    ])
  }

  async function transactionRemove(id: string) {
    try {
      await transactionsDB.remove(Number(id))

      Alert.alert("Transação", "Transação removida com sucesso.")

      fetchData()
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover a transação.")

      console.log(error)
    }
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
    <View style={{ flex: 1, padding: 24, paddingBottom: 48, gap: 32 }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <PageHeader
        title={details.name}
        rigthButton={{
          icon: "edit",
          onPress: () => router.navigate(`/target?id=${params.id}`),
        }}
      />
      <Progress data={details} />
      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() => handleTransactionRemove(item.id)}
          />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
      />
      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  )
}
