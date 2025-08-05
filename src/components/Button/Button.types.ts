import { PressableProps } from "react-native"

export type Props = PressableProps & {
  title: string
  isProcessing?: boolean
}
