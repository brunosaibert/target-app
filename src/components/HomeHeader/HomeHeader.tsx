import { Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import { colors } from "@/theme"

import { Separator } from "../Separator"
import { Summary } from "../Summary"

import { styles } from "./HomeHeader.styles"
import { HomeHeaderProps, Props } from "./HomeHeader.types"

export function HomeHeader({ data }: Props) {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>
      <Separator color={colors.blue[400]} />
      <View style={styles.summary}>
        <Summary
          data={{ label: "Entradas", value: "R$ 6,184.90" }}
          icon={{ name: "arrow-upward", color: colors.green[500] }}
        />
        <Summary
          data={{ label: "Saídas", value: "-R$ 883.65" }}
          icon={{ name: "arrow-downward", color: colors.red[400] }}
          isLeft
        />
      </View>
    </LinearGradient>
  )
}

export type { HomeHeaderProps }
