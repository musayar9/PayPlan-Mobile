import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setMembersList } from "@/redux/groupSlice";

const CustomBackButton = ({ style }: { style?: StyleProp<any> }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => {
        router.back();
        dispatch(setMembersList([]));
      }}
    >
      <Ionicons name="chevron-back" color={Colors.textPrimary} size={24} />
    </TouchableOpacity>
  );
};

export default CustomBackButton;

const styles = StyleSheet.create({
  button: {
    // position: "absolute",
  },
});
