import { Text, View } from "react-native"
import Input from "react-native-currency-input"

import { colors } from "@/theme"

import { styles } from "./CurrencyInput.styles"
import type { Props } from "./CurrencyInput.types"

export function CurrencyInput({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        {...rest}
      />
    </View>
  )
}
