import { Stack } from "expo-router"

import { colors } from "@/theme/colors"

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    />
  )
}
