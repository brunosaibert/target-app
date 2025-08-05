import type { MaterialIcons } from "@expo/vector-icons"

export type Props = {
  title: string
  subtitle?: string
  rigthButton?: {
    onPress: () => void
    icon: keyof typeof MaterialIcons.glyphMap
  }
}
