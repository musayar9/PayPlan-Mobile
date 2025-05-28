import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

interface EmptyTaskProps {
  title: string;
  style?: ViewStyle;
}
const EmptyTask = ({ title, style }: EmptyTaskProps) => {
  return (
    <View style={[styles.emptyContent, style]}>
      <FontAwesome5
        name="tasks"
        size={24}
        color={Colors.palette.accent}
      />
      <Text style={styles.emptyText}>{title}</Text>
    </View>
  );
};

export default EmptyTask;

const styles = StyleSheet.create({
  emptyContent: {
    backgroundColor: Colors.palette.backgroundCard,
    paddingVertical: 20,
    borderRadius: 10,
    gap: 10,
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // shadowColor: "#111",
    // shadowOpacity: 0.3,
    // shadowRadius: 2.65,
    // elevation: 3,
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
  },
  emptyText: {
    fontSize: 12,
    fontWeight: 500,
    color: Colors.palette.textSecondary,
    noTaskText: {
      textAlign: "center",
      color: "#6B7280",
      marginTop: 20,
    },
  },
});
