import { Pressable, Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { styles } from "./Target.styles"
import type { TargetProps, Props } from "./Target.types"

export function Target({ data, ...rest }: Props) {
  return (
    <Pressable style={styles.container} {...rest}>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {data.name}
        </Text>
        <Text style={styles.status}>
          {data.percentage} • {data.current} de {data.target}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={20} />
    </Pressable>
  )
}

export type { TargetProps }
