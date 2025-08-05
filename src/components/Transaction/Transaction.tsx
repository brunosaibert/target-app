import { Pressable, Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/theme"
import { TransactionTypes } from "@/utils/TransactionTypes"

import { styles } from "./Transaction.styles"
import type { Props, TransactionProps } from "./Transaction.types"

export function Transaction({ data, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={
          data.type === TransactionTypes.Input
            ? "arrow-upward"
            : "arrow-downward"
        }
        size={20}
        color={
          data.type === TransactionTypes.Input
            ? colors.blue[500]
            : colors.red[400]
        }
      />
      <View style={styles.info}>
        <Text style={styles.value}>{data.value}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {data.date} {data.description && `• ${data.description}`}
        </Text>
      </View>
      <Pressable onPress={onRemove}>
        <MaterialIcons name="close" size={18} color={colors.gray[500]} />
      </Pressable>
    </View>
  )
}

export type { TransactionProps }
