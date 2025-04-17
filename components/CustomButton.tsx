import { StyleSheet, Text, View, StyleProp, Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
  textColor?:string
}

const CustomButton = ({ text, style, onPress, textColor }: CustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [style, { opacity: pressed ? 0.5 : 1 }]}
      onPress={onPress}
    >
      <Text style={[styles.subText, {color:textColor}]}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  subText: {
    textAlign: "center",
    fontSize:16,
    fontWeight:"bold",
    color:Colors.textPrimary
  },
});
