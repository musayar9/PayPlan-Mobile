import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import TaskLists from "@/components/TaskLists";

const GroupAllTask = () => {
  const { groupId } = useLocalSearchParams();

  return <TaskLists groupId={groupId} />;
};

export default GroupAllTask;

const styles = StyleSheet.create({});
