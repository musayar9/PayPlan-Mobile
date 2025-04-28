import { store } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  return (
    <Provider store={store}>
      {/* <Slot /> */}
      <Stack options={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="group/[id]" options={{ headerShown: false }} />
        {/* <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
          }}
        /> */}
      </Stack>
    </Provider>
  );
}
