import { Suspense } from "react"
import { Stack } from "expo-router"
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter"
import { SQLiteProvider } from "expo-sqlite"

import { Loading } from "@/components/Loading"
import { migrate } from "@/database/migrate"
import { colors } from "@/theme"

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider databaseName="target.db" onInit={migrate} useSuspense>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: {
              backgroundColor: colors.white,
            },
          }}
        />
      </SQLiteProvider>
    </Suspense>
  )
}
