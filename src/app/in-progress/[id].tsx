import { View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"

import { Button } from "@/components/Button"
import { List } from "@/components/List"
import { PageHeader } from "@/components/PageHeader"
import { Progress } from "@/components/Progress"
import { Transaction, type TransactionProps } from "@/components/Transaction"
import { TransactionTypes } from "@/utils/TransactionTypes"

const DETAILS = {
  current: "R$ 580,00",
  target: "R$ 1.790,00",
  percentage: 25,
}

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

  return (
    <View style={{ flex: 1, padding: 24, paddingBottom: 48, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rigthButton={{
          icon: "edit",
          onPress: () => {},
        }}
      />
      <Progress data={DETAILS} />
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
