import { Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import { colors } from "@/theme"

import { styles } from "./HomeHeader.styles"
import { HomeHeaderProps, Props } from "./HomeHeader.types"

export function HomeHeader({ data }: Props) {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>
    </LinearGradient>
  )
}

export type { HomeHeaderProps }
