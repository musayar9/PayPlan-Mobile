import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomBarProps {
  title: String;
  onPress: () => void;
}

const CustomBar = ({ title, onPress }: CustomBarProps) => {
  return (
    <TouchableOpacity style={styles.statusBar} onPress={onPress}>
      <Text style={styles.statusBarTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomBar;

const styles = StyleSheet.create({
  statusBar: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.lightBlur,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    minWidth: 100,
    // shadowColor: "#111",
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 2.84,
    // elevation: 2,
  },
  statusBarTxt: {
    fontSize: 12,
    textAlign: "center",
    color: Colors.palette.textSecondary,
  },
});
