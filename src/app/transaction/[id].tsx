import { useState } from "react"
import { router, useLocalSearchParams } from "expo-router"
import { Alert, View } from "react-native"

import { Button } from "@/components/Button"
import { CurrencyInput } from "@/components/CurrencyInput"
import { Input } from "@/components/Input"
import { PageHeader } from "@/components/PageHeader"
import { TransactionType } from "@/components/TransactionType"

import { useTransactionsDatabase } from "@/database/useTransactionsDatabase"

import { TransactionTypes } from "@/utils/TransactionTypes"

export default function Transaction() {
  const [type, setType] = useState(TransactionTypes.Input)
  const [amount, setAmount] = useState(0)
  const [observation, setObservation] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const params = useLocalSearchParams<{ id: string }>()

  const transactionDB = useTransactionsDatabase()

  async function handleCreate() {
    try {
      if (amount <= 0) {
        return Alert.alert(
          "Atenção",
          "Preencha o valor. A transação deve ser maior que zero."
        )
      }

      setIsCreating(true)

      await transactionDB.create({
        target_id: Number(params.id),
        amount: type === TransactionTypes.Output ? amount * -1 : amount,
        observation,
      })

      Alert.alert("Sucesso", "Transação salva com sucesso.", [
        {
          text: "OK",
          onPress: router.back,
        },
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transação.")

      console.log(error)

      setIsCreating(false)
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />
      <View style={{ gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />
        <CurrencyInput
          value={amount}
          onChangeValue={setAmount}
          label="Valor (R$)"
        />
        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco"
          value={observation}
          onChangeText={setObservation}
        />
        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  )
}
