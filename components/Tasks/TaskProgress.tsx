import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Colors from "@/constants/Colors";

interface TaskProgressProps {
  statusValue: "pending" | "in-complete" | "complete";
}

const TaskProgress = ({ statusValue }: TaskProgressProps) => {
  let fill = 0;
  let color = Colors.red400;

  // Determine fill and color based on status
  switch (statusValue) {
    case "pending":
      fill = 0;
      color = Colors.red400;
      break;
    case "in-progress":
      fill = 50;
      color = Colors.blue400;
      break;
    case "completed":
      fill = 100;
      color = Colors.green400;
      break;
    default:
      fill = 0;
      color = Colors.red400; // Fallback for invalid status
  }

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={45}
        width={5}
        fill={fill}
        tintColor={color}
        backgroundColor="#e0e0e0"
        rotation={0}
        lineCap="round"
      >
        {(fill) => (
          <Text style={styles.percentage}>{`${Math.round(fill)}%`}</Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default TaskProgress;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  percentage: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
});
