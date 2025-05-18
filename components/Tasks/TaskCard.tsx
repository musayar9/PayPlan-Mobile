import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TasksType } from "@/types/TaskType";
import Colors from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { formatDates } from "@/utils/functions";
import StateStatus from "../StateStatus";

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
            <Ionicons
              name="calendar-sharp"
              size={24}
              color={Colors.palette.accent}
            />
            <View>
              <Text style={styles.cTaskLabel}>Created Task</Text>
              <Text style={styles.createDate}>
                {formatDates(item?.createdAt)}
              </Text>
            </View>
          </View>

          {/* <StateStatus statusValue={item.status} /> */}

          <View style={styles.createTaskInfo}>
            <View>
              <Text style={styles.cTaskLabel}>Due Date</Text>
              <Text style={styles.createDate}>
                {formatDates(item?.dueDate)}
              </Text>
            </View>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={28}
              color={Colors.primary}
            />
          </View>
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
    fontSize: 10,
    color: Colors.palette.textSecondary,
  },
  createDate: {
    fontSize: 12,
    fontWeight: "600",
  },
  bullet: {
    marginRight: 6,

    lineHeight: 18,
  },
});
