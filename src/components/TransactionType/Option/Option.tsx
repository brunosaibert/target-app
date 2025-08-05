import { Pressable, Text } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/theme"

import { styles } from "./Option.styles"
import type { Props } from "./Option.types"

export function Option({
  isSelected,
  title,
  icon,
  selectedColor,
  ...rest
}: Props) {
  return (
    <Pressable
      style={[
        styles.container,
        isSelected && { backgroundColor: selectedColor },
      ]}
      {...rest}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isSelected ? colors.white : colors.gray[500]}
      />
      <Text style={[styles.title, isSelected && { color: colors.white }]}>
        {title}
      </Text>
    </Pressable>
  )
}
