import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomBarProps {
  title: String;
  onPress: () => void;
  active: string;
  isActive: boolean;
}

const CustomBar = ({ title, onPress, active, isActive }: CustomBarProps) => {
  console.log("acty", active);
  const activeTab = () => {
    switch (title.toLowerCase()) {
      case "all":
        return active === "all" ? styles.all : null;
      case "pending":
        return active === "pending" ? styles.pending : null;
      case "in-progress":
        return active === "in-progress" ? styles.inCompleted : null;
      case "completed":
        return active === "completed" ? styles.completed : null;
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.statusBar,
        {
          backgroundColor: isActive ? Colors.palette.accent : Colors.palette.backgroundCard,
          fontWeight: "500",
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.statusBarTxt, {color:isActive ? Colors.palette.backgroundCard: Colors.palette.textPrimary}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomBar;

const styles = StyleSheet.create({
  statusBar: {
    // borderWidth: 1,
    // borderColor: Colors.gray,
    backgroundColor: Colors.palette.backgroundCard,
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 100,
    marginTop: 10,
  },
  statusBarTxt: {
    fontSize: 12,
    textAlign: "center",
    color: Colors.palette.textPrimary,
    textTransform: "lowercase",
    fontWeight: 400,
  },

  all: { backgroundColor: Colors.palette.accent, fontWeight: "500" },
  pending: { backgroundColor: Colors.red400, fontWeight: "500" },
  inCompleted: { backgroundColor: Colors.primary, fontWeight: "500" },
  completed: { backgroundColor: Colors.green400, fontWeight: "500" },
});
