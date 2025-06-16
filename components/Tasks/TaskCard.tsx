import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { TasksType } from "@/types/TaskType";
import Colors from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { formatDates, getTime } from "@/utils/functions";
import StateStatus from "../StateStatus";
import TaskProgress from "./TaskProgress";
import StatusModal from "./StatusModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface TaskCardProps {
  item: TasksType;
  isAssigned?: boolean;
}

const TaskCard = ({ item, isAssigned }: TaskCardProps) => {
  const { updateTask, taskUpdateLoading, filterData } = useSelector(
    (state: RootState) => state.task
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [taskValues, setTaskValues] = useState({
    taskId: "",
    taskStatus: "",
  });
  console.log("ass", item.assignedTo.profilePicture);
  return (
    <View style={styles.container}>
    
    
    
      <View style={{ alignItems: "center", paddingBottom: 5 }}>
        <Text
          style={{ fontSize: 14, fontWeight: "500", color: Colors.textLight }}
        >
          {getTime(item?.dueDate)}
        </Text>
      </View>

      <View style={styles.taskContent}>
        <View style={styles.taskContentHead}>
          <View style={styles.createTaskInfo}>
            {isAssigned ? (
              <Image
                source={{
                  uri: item.group.groupPicture
                    ? `${item.group.groupPicture}`
                    : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
                }}
                style={styles.groupImage}
              />
            ) : (
              <Image
                source={{
                  uri: item?.assignedTo.profilePicture
                    ? `${item.assignedTo?.profilePicture}`
                    : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
                }}
                style={[styles.groupImage, { width: 50, height: 50 }]}
              />
            )}

            <View>
              <Text style={styles.cTaskLabel}>
                {isAssigned
                  ? item.group.name
                  : `${item.assignedTo.name} ${item.assignedTo.surname}`}
              </Text>
              {isAssigned || (
                <Text style={styles.createDate}>{item.assignedTo.email}</Text>
              )}
              <View style={styles.createTaskInfo}>
                <Ionicons name="time" size={18} color={Colors.textLight} />
                <View>
                  <Text style={styles.createDate}>
                    {formatDates(item?.dueDate)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <TaskProgress statusValue={item.status} />
        </View>

        <View
          style={{
            paddingVertical: 12,
            gap: 4,
          }}
        >
          <Text style={styles.taskTitle}>{item?.title}</Text>

          <View style={{ flexDirection: "row", gap: 4 }}>
            <Ionicons
              name="radio-button-on"
              color={Colors.textSecondary}
              size={12}
              style={styles.bullet}
            />
            <Text style={{ fontSize: 12, color: Colors.palette.textPrimary }}>
              {item?.description}
            </Text>
          </View>
        </View>
        <View style={styles.headWrapper} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 8,
          }}
        >
          {isAssigned || user?._id === item?.assignedTo?._id ? (
            <TouchableOpacity
              disabled={item.status === "completed"}
              onPress={() => {
                setShowModal(true);
                setTaskValues({ taskId: item?._id, taskStatus: item.status });
              }}
              style={[
                styles.editBtn,

                item.status.toLowerCase() === "completed"
                  ? styles.isCompleted
                  : styles.isNotCompleted,
              ]}
            >
              <Ionicons name="pencil" color={Colors.background} size={16} />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 12,
                  color: Colors.background,
                }}
              >
                {item.status === "completed" ? "Edited" : "Edit"}
              </Text>
            </TouchableOpacity>
          ) : <View></View>}

          {taskUpdateLoading && item._id === taskValues.taskId ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <StateStatus
              statusValue={item.status}
              style={{ color: Colors.background }}
            />
          )}
        </View>
        <View />
      </View>
      <View>
        <StatusModal
          modalVisible={showModal}
          setShowModal={setShowModal}
          taskValues={taskValues}
        />
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    gap: 4,
  },

  taskContent: {
    backgroundColor: Colors.palette.backgroundCard,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
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
    width: 40,
    height: 40,
    // borderWidth: 1,
    borderRadius: 10,
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  taskTitle: {
    fontWeight: 600,
  },

  headWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.textLight_50,
    width: "100%",
    // paddingTop: -10,
    top: -4,
  },

  taskPersonImg: {
    width: 40,
    height: 40,
    borderRadius: 10,
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
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    // backgroundColor: Colors.lightBlur,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  isNotCompleted: {
    backgroundColor: Colors.palette.accent,
    borderWidth: 1,
    borderColor: Colors.palette.border,
  },
  isCompleted: {
    backgroundColor: Colors.palette.accentLight,
  },
});
