import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import TaskLists from "@/components/Tasks/TaskLists";
import Colors from "@/constants/Colors";

const GroupAllTask = () => {
  const { groupId } = useLocalSearchParams();

  return (
    <View style={{
      paddingTop:40,
      paddingHorizontal:20,
      backgroundColor:Colors.lightBlur,
      flex:1
    }}>
      <TaskLists groupId={groupId} list={true} />
    </View>
  );
};

export default GroupAllTask;

const styles = StyleSheet.create({});
