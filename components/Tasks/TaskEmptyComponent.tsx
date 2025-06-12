import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TasksType } from "@/types/TaskType";
import CustomButton from "../CustomButton";
import { Link } from "expo-router";

interface TaskEmptyComponentProps {
  loading: boolean;
  groupName: string;
  groupImage: string;
  data: TasksType[];
  groupId: string;
}

const TaskEmptyComponent = ({
  loading,
  groupImage,
  groupName,
  data,
  groupId,
}: TaskEmptyComponentProps) => {
  const { isLoading } = useSelector((state: RootState) => state.group);
  //   if (loading || data.length > 0) return <Text>Loaddinggg</Text>;
  if (isLoading || data?.length > 0) {
    return <Text>Load</Text>;
  }
  return (
    <View style={styles.emptyTask}>
      <Image
        source={{
          uri: groupImage
            ? `${groupImage}`
            : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
        }}
        style={styles.groupImage}
      />
      <Text style={styles.groupNameText}> {groupName}</Text>

      <Text style={styles.message}>Bu gruba henüz task atanmamış</Text>

      <Link
        asChild
        href={{
          pathname: "/newtask/[groupId]",
          params: { groupId: groupId },
        }}
        style={{ width: "100%" }}
      >
        <CustomButton text="Create Task" style={styles.createTask} textColor={Colors?.palette.backgroundCard} />
      </Link>
    </View>
  );
};

export default TaskEmptyComponent;

const styles = StyleSheet.create({
  emptyTask: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.palette.backgroundCard,
    padding: 20,
    margin: 10,
    borderRadius: 12,
    gap: 8,
  },
  groupImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    shadowColor: "#deded",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },

  groupNameText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.palette.textPrimary,
  },
  message: {
    fontSize: 14,
    color: Colors.palette.textSecondary,
  },
  createTask: {
    backgroundColor: Colors.palette.accent,
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
});
