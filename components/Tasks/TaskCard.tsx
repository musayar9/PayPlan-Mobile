import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TasksType } from "@/types/TaskType";
import Colors from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { formatDates } from "@/utils/functions";
import StateStatus from "../StateStatus";
import TaskProgress from "./TaskProgress";

interface TaskCardProps {
  item: TasksType;
}

const TaskCard = ({ item }: TaskCardProps) => {
  // console.log("itemr", item.title)
  return (
    <View style={styles.container}>
      <View style={styles.taskContent}>
        {/* Crete Task Date*/}

        <View style={styles.taskContentHead}>
          <View style={styles.createTaskInfo}>
            {/* <View>
              <Text style={styles.cTaskLabel}>Due Date</Text>
              <Text style={styles.createDate}>
                {formatDates(item?.dueDate)}
              </Text>
            </View>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={28}
              color={Colors.primary}
            /> */}
            <Image
              source={{
                uri: item.group.groupPicture
                  ? `data:image/png;base64,${item.group.groupPicture}`
                  : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
              }}
              style={styles.groupImage}
            />
            <View>
              <Text style={styles.cTaskLabel}>{item.group.name}</Text>
              <View style={styles.createTaskInfo}>
                <Ionicons name="time" size={18} color={Colors.textLight} />
                <View>
                  <Text style={styles.createDate}>
                    {formatDates(item?.createdAt)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* <StateStatus statusValue={item.status} /> */}
          <TaskProgress />
        </View>

        <View
          style={{
            // flexDirection: "row",
            // alignItems: "center",
            paddingVertical: 12,
            gap: 4,
          }}
        >
          <Text style={{ fontSize: 10, color: Colors.palette.textPrimary }}>
            Task Content:{" "}
          </Text>
          <Text style={styles.appointInfo}>{item?.title}</Text>

          <View style={{ flexDirection: "row", gap: 4 }}>
            <Ionicons
              name="radio-button-on-outline"
              color={Colors.textSecondary}
              size={12}
              style={styles.bullet}
            />
            <Text style={{ fontSize: 12, color: Colors.palette.textSecondary }}>
              {item?.description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    gap: 4,
  },

  taskContent: {
    backgroundColor: Colors.palette.backgroundCard,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 12,
  },

  taskContentHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  createTaskInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cTaskLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.palette.textPrimary,
  },
  createDate: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textLight,
  },
  bullet: {
    marginRight: 6,

    lineHeight: 18,
  },
  memberImage: {
    width: 44,
    height: 44,
    // borderWidth: 1,
    borderRadius: 50,
  },
  groupImage: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
});
