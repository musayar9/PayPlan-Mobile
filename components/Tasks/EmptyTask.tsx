import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

const EmptyTask = () => {
  return (
    <View style={styles.emptyContent}>
      <FontAwesome5
        name="tasks"
        size={24}
        color={Colors.palette.textSecondary}
      />
      <Text style={styles.emptyText}>
        No tasks have been created for this group yet.
      </Text>
    </View>
  );
};

export default EmptyTask;

const styles = StyleSheet.create({
  emptyContent: {
    backgroundColor: Colors.background,
    paddingVertical: 20,
    borderRadius: 12,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 11,
    fontWeight: 500,
    color: Colors.palette.textSecondary,
  },
});
