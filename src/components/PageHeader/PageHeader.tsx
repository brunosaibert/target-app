import { TouchableOpacity, Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"

import { colors } from "@/theme"

import { styles } from "./PageHeader.styles"
import type { Props } from "./PageHeader.types"

export function PageHeader({ title, subtitle, rigthButton }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            router.back()
          }}
        >
          <MaterialIcons name="arrow-back" size={32} color={colors.black} />
        </TouchableOpacity>
        {rigthButton && (
          <TouchableOpacity
            onPress={() => rigthButton.onPress()}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={rigthButton.icon}
              size={24}
              color={colors.gray[500]}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  )
}
