import { View } from "react-native"

import { colors } from "@/theme"
import { TransactionTypes } from "@/utils/TransactionTypes"

import { Option } from "./Option"
import { styles } from "./TransactionType.styles"
import { Props } from "./TransactionType.types"

export function TransactionType({ selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Option
        icon="arrow-upward"
        title="Guardar"
        isSelected={selected === TransactionTypes.Input}
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionTypes.Input)}
      />
      <Option
        icon="arrow-downward"
        title="Resgatar"
        isSelected={selected === TransactionTypes.Output}
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionTypes.Output)}
      />
    </View>
  )
}
