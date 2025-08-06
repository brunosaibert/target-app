import { useCallback, useState } from "react"
import { Alert, View } from "react-native"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router"

import { Button } from "@/components/Button"
import { List } from "@/components/List"
import { Loading } from "@/components/Loading"
import { PageHeader } from "@/components/PageHeader"
import { Progress } from "@/components/Progress"
import { Transaction, type TransactionProps } from "@/components/Transaction"

import { useTargetDatabase } from "@/database/useTargetDatabase"

import { TransactionTypes } from "@/utils/TransactionTypes"
import { numberToCurrency } from "@/utils/numberToCurrency"

const TRANSACTIONS: TransactionProps[] = [
  {
    id: "1",
    value: "R$ 20,00",
    date: "12/04/25",
    type: TransactionTypes.Output,
  },
  {
    id: "2",
    value: "R$ 300,00",
    date: "11/04/25",
    description: "CDB de 110% no banco XPTO",
    type: TransactionTypes.Input,
  },
]

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>()

  const [isFetching, setIsFetching] = useState(true)
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  })

  const targetDB = useTargetDatabase()

  async function fetchDetails() {
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

  async function fetchData() {
    const fetchDetailsPromisse = fetchDetails()

    await Promise.all([fetchDetailsPromisse])

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
    <View style={{ flex: 1, padding: 24, paddingBottom: 32, gap: 32 }}>
      <PageHeader
        title={details.name}
        rigthButton={{
          icon: "edit",
          onPress: () => {},
        }}
      />
      <Progress data={details} />
      <List
        title="Transações"
        data={TRANSACTIONS}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
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
