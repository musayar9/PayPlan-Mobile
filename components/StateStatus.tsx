import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const StateStatus = ({ statusValue, style }: { statusValue: string, style?:ViewStyle }) => {
  const stateStatus = (status) => {
    switch (status) {
      case "pending":
        return <Text style={[styles.taskStatus, styles.pending, style]}>Pending</Text>;
      case "in-progress":
        return (
          <Text style={[styles.taskStatus, styles.inProgress, style]}>
            In Progress
          </Text>
        );
      case "completed":
        return (
          <Text style={[styles.taskStatus, styles.completed, style]}>Completed</Text>
        );
    }
  };

  return <View>{stateStatus(statusValue)}</View>;
};

export default StateStatus;

const styles = StyleSheet.create({
  taskStatus: {
    fontWeight: "bold",
    fontSize: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pending: {
    backgroundColor: Colors.red300,
    color: Colors.red500,
  },

  inProgress: {
    backgroundColor: Colors.blue400,
    color: Colors.blue600,
  },

  completed: {
    backgroundColor: Colors.green400,
    color: Colors.green600,
  },
});
