import Colors from "@/constants/Colors";
import { store } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Button, useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MenuProvider } from "react-native-popup-menu";
import { Provider, useSelector } from "react-redux";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const { height } = useWindowDimensions();

  return (
    <Provider store={store}>
      <MenuProvider>
        {/* <Slot /> */}
        <Stack options={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="group/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="group/editGroup/[id]" options={{headerShown:false}}/>
          <Stack.Screen
            name="group/data-select"
            options={{
              title: "Schedule",
              presentation: "formSheet",
              sheetAllowedDetents: height > 500 ? [0.6, 0.9] : "fitToContents",
              sheetGrabberVisible: true,
              sheetCornerRadius: 10,
              sheetExpandsWhenScrolledToEdge: false,
              unstable_sheetFooter: () => (
                <View style={{ height: 400, backgroundColor: "#fff" }} />
              ),
              headerLeft: () => (
                <Button
                  title="Cancel"
                  onPress={() => router.back()}
                  color={Colors.primary}
                />
              ),
            }}
          />
          <Stack.Screen
            name="newtask/[groupId]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="groupAllTask/[groupId]"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="profile/editProfile"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="profile/notifications" />
          <Stack.Screen name="profile/themeAppearance" />
          <Stack.Screen name="profile/language" />
          <Stack.Screen name="profile/helpSupport" />

          {/* <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            }}
            /> */}
        </Stack>
      </MenuProvider>
    </Provider>
  );
}
