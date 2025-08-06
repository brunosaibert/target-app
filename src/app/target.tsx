import { useState } from "react"
import { Alert, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"

import { Button } from "@/components/Button"
import { CurrencyInput } from "@/components/CurrencyInput"
import { Input } from "@/components/Input"
import { PageHeader } from "@/components/PageHeader"

import { useTargetDatabase } from "@/database/useTargetDatabase"

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)

  const params = useLocalSearchParams<{ id?: string }>()

  const targetDB = useTargetDatabase()

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert(
        "Atenção",
        "Preencha nome e o valor precisa ser maior que zero."
      )
    }

    setIsProcessing(true)

    if (params.id) {
      // update
    } else {
      create()
    }
  }

  async function create() {
    try {
      await targetDB.create({
        name,
        amount,
      })

      Alert.alert("Nova Meta", "Meta criada com sucesso", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a meta.")

      console.log(error)

      setIsProcessing(false)
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da Meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
          value={name}
          onChangeText={setName}
        />
        <CurrencyInput
          label="Valor alvo (R$)"
          value={amount}
          onChangeValue={setAmount}
        />
        <Button
          title="Salvar"
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  )
}
