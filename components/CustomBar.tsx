import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomBarProps {
  title: String;
  onPress: () => void;
  active: string;
}

const CustomBar = ({ title, onPress, active }: CustomBarProps) => {
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
      style={[styles.statusBar, activeTab(active)]}
      onPress={onPress}
    >
      <Text style={styles.statusBarTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomBar;

const styles = StyleSheet.create({
  statusBar: {
    // borderWidth: 1,
    // borderColor: Colors.gray,
    backgroundColor: Colors.palette.backgroundCard,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 100,
    marginTop: 20,
  },
  statusBarTxt: {
    fontSize: 12,
    textAlign: "center",
    color: Colors.palette.textPrimary,
    textTransform: "lowercase",
  },

  all: { backgroundColor: Colors.palette.accentLight, fontWeight: "500" },
  pending: { backgroundColor: Colors.red400, fontWeight: "500" },
  inCompleted: { backgroundColor: Colors.primary, fontWeight: "500" },
  completed: { backgroundColor: Colors.green400, fontWeight: "500" },
});
