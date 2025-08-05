import { ActivityIndicator } from "react-native"

import { colors } from "@/theme"

import { styles } from "./Loading.styles"

export function Loading() {
  return <ActivityIndicator color={colors.blue[500]} style={styles.container} />
}
