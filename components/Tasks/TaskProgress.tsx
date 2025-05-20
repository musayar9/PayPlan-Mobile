import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const TaskProgress = () => {
  const fill = 75;
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={40}
        width={6}
        fill={fill}
        tintColor="#4CAF50" // yeşil alan
        backgroundColor="#e0e0e0" // gri alan
        rotation={0} // üstten başlasın
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
