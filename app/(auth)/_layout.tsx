import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack options={{ headerShown: false }}>
      {/* <Stack.Screen
        name="index"
        options={{  headerShown: false }}
      /> */}
      <Stack.Screen
        name="login"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="register"
        options={{ title: "Register", headerShown: false }}
      />
    </Stack>
  );
};

export default AuthLayout;
