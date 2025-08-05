import { ActivityIndicator, Pressable, Text } from "react-native"

import { colors } from "@/theme"

import { styles } from "./Button.styles"
import type { Props } from "./Button.types"

export function Button({ title, isProcessing = false, ...rest }: Props) {
  return (
    <Pressable style={styles.container} disabled={isProcessing} {...rest}>
      <Text style={styles.title}>
        {isProcessing ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          title
        )}
      </Text>
    </Pressable>
  )
}
