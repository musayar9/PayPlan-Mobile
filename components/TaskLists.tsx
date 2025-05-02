import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface TaskListProps {
  groupId: string;
}

const TaskLists = ({ groupId }: TaskListProps) => {

  return (
    <View style={styles.contentField}>
      <View style={styles.taskField}>
        <Text style={styles.subHeadTextTwo}>Task Lists</Text>
        <Link
          asChild
          href={{
            pathname: "/newtask/[groupId]",
            params: { groupId: groupId },
          }}
        >
          <TouchableOpacity style={styles.taskBtn}>
            <Ionicons
              name={"add"}
              size={20}
              color={Colors.palette.accent}
              style={{ fontWeight: "bold" }}
            />
            <Text>New Task</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View style={styles.taskWrapper}>
        <Text style={styles.taskHeader}>React Native</Text>
        <Text style={styles.taskTitle}>Edit Bottom Navigation</Text>

        <View style={styles.taskField}>
          <Text style={styles.taskStatus}>In Progress</Text>
          <Image
            style={styles.taskPersonImg}
            source={{
              uri: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default TaskLists;

const styles = StyleSheet.create({
  contentField: {
    gap: 20,
    marginTop: 20,
  },
  taskField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subHeadTextTwo: { fontSize: 18, fontWeight: 600, color: Colors.textPrimary },
  taskBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  taskWrapper: {
    backgroundColor: Colors.background,
    padding: 15,
    borderRadius: 12,
    gap: 6,
  },
  taskHeader: {
    color: Colors.palette.textSecondary,
    fontSize: 12,
    fontWeight: 500,
  },
  taskTitle: {
    fontSize: 16,
    color: "#222",
    fontWeight: 600,
  },
  taskStatus: {
    fontWeight: "bold",
    fontSize: 12,
    backgroundColor: Colors.red300,
    color: Colors.red500,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  taskPersonImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    backgroundColor: "#fff",
    elevation: 3,
  },
});
