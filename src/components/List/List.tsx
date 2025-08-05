import { FlatList, Text, View } from "react-native"

import { colors } from "@/theme"

import { Separator } from "../Separator"

import { styles } from "./List.styles"
import { Props } from "./ListProps.types"

export function List<T>({
  containerStyle,
  title,
  emptyMessage,
  data,
  renderItem,
  ...rest
}: Props<T>) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator color={colors.gray[200]} />}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>{emptyMessage}</Text>
        )}
        {...rest}
      />
    </View>
  )
}
