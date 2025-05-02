import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CustomBackButton = ({ style }: { style?: StyleProp<any> }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => router.back()}
    >
      <Ionicons name="arrow-back" color={Colors.background} size={24} />
    </TouchableOpacity>
  );
};

export default CustomBackButton;

const styles = StyleSheet.create({
  button: {
    // position: "absolute",

  },
});
