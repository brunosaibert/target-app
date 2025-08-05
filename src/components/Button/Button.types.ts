import { TouchableOpacityProps } from "react-native"

export type Props = TouchableOpacityProps & {
  title: string
  isProcessing?: boolean
}
