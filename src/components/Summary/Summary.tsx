import { View, Text } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { styles } from "./Summary.styles"
import type { Props, SummaryProps } from "./Summary.types"

export function Summary({ data, icon, isLeft = false }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, isLeft && { justifyContent: "flex-end" }]}>
        <MaterialIcons name={icon.name} size={16} color={icon.color} />
        <Text style={styles.label}>{data.label}</Text>
      </View>
      <Text style={styles.value}>{data.value}</Text>
    </View>
  )
}

export type { SummaryProps }
