import type { FlatListProps, StyleProp, ViewStyle } from "react-native"

export type Props<T> = FlatListProps<T> & {
  title: string
  emptyMessage?: string
  containerStyle?: StyleProp<ViewStyle>
}
