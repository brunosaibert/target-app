import { MaterialIcons } from "@expo/vector-icons"
import { ColorValue } from "react-native"

export type SummaryProps = {
  label: string
  value: string
}

export type Props = {
  data: SummaryProps
  icon: {
    name: keyof typeof MaterialIcons.glyphMap
    color: ColorValue
  }
  isRight?: boolean
}
