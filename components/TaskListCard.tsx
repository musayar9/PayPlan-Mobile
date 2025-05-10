import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { TasksType } from "@/types/TaskType";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setTaskId } from "@/redux/taskSlice";
import StateStatus from "./StateStatus";
interface TaskListCardProps {
  item: TasksType;
  setShowTask: React.Dispatch<SetStateAction<boolean>>;
}

const TaskListCard = ({ item, setShowTask }: TaskListCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const stateStatus = (status) => {
    switch (status) {
      case "pending":
        return <Text style={[styles.taskStatus, styles.pending]}>Pending</Text>;
      case "in-progress":
        return (
          <Text style={[styles.taskStatus, styles.inProgress]}>
            In Progress
          </Text>
        );
      case "completed":
        return (
          <Text style={[styles.taskStatus, styles.completed]}>Completed</Text>
        );
    }
  };

  const handleOpenModal = (id: string) => {
    setShowTask(true);
    dispatch(setTaskId(id));
    console.log("opem modal id", id);
  };

  return (
    <TouchableOpacity
      style={styles.taskWrapper}
      onPress={() => handleOpenModal(item._id)}
    >
      <View style={{ position: "absolute", right: 5, top: 5 }}>
        <Text
          style={{
            textAlign: "center",
            backgroundColor: item.votes.vote ? Colors.green400 : Colors.red400,
            fontSize: 8,
            paddingVertical: 4,
            paddingHorizontal: 6,
            borderRadius: 6,
            fontWeight: 500,
            color: item.votes.vote ? Colors.green600 : Colors.red600,
          }}
        >
          {item.votes.vote ? "Appointed" : "Not Appointed"}
        </Text>
      </View>

      <View style={{ marginTop: 12 }}>
        <Text style={styles.taskHeader}>{item.title}</Text>
        <Text style={styles.taskTitle} numberOfLines={1}>
          {item.description}
        </Text>
      </View>

      <View style={styles.taskField}>
        {/* {stateStatus(item.status)} */}
        <StateStatus statusValue={item.status}/>

        {item?.votes.vote && (
          <Image
            style={styles.taskPersonImg}
            source={{
              uri: item?.assignedTo?.profilePicture
                ? item?.assignedTo?.profilePicture
                : "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TaskListCard;

const styles = StyleSheet.create({
  taskField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskWrapper: {
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 12,
    gap: 8,
  },
  taskHeader: {
    color: Colors.palette.textSecondary,
    fontSize: 12,
    fontWeight: 500,
  },
  taskTitle: {
    fontSize: 14,
    color: "#222",
    fontWeight: 600,
  },

  taskStatus: {
    fontWeight: "bold",
    fontSize: 10,

    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pending: {
    backgroundColor: Colors.red300,
    color: Colors.red500,
  },

  inProgress: {
    backgroundColor: Colors.blue400,
    color: Colors.blue600,
  },

  completed: {
    backgroundColor: Colors.green400,
    color: Colors.green600,
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
