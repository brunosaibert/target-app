import type { ColorValue, PressableProps } from "react-native"
import type { MaterialIcons } from "@expo/vector-icons"

export type Props = PressableProps & {
  isSelected: boolean
  title: string
  icon: keyof typeof MaterialIcons.glyphMap
  selectedColor: ColorValue
}
