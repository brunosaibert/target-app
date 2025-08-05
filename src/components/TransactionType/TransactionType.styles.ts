import { StyleSheet } from "react-native"

import { colors } from "@/theme"

export const styles = StyleSheet.create({
  container: {
    height: 42,
    width: "100%",
    flexDirection: "row",
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    overflow: "hidden",
  },
})
