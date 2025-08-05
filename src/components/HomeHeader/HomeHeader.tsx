import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import { colors } from "@/theme"

import { styles } from "./HomeHeader.styles"

export function HomeHeader() {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <Text style={styles.label}>Total que você possui</Text>
    </LinearGradient>
  )
}
