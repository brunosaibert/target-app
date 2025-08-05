import { Text, TextInput, View } from "react-native"

import { colors } from "@/theme"

import { styles } from "./Input.styles"
import { Props } from "./Input.types"

export function Input({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </View>
  )
}
