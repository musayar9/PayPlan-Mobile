import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link, useFocusEffect } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { api } from "@/utils/api";
import { TasksType } from "@/types/TaskType";
import TaskListCard from "./TaskListCard";
import TaskDetailModal from "./Modals/TaskDetailModal";

interface TaskListProps {
  groupId: string;
}

const TaskLists = ({ groupId }: TaskListProps) => {
  const [tasks, setTasks] = useState<TasksType[] | null>(null);
  const [showTask, setShowTask] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const getTask = async () => {
        try {
          const res = await api.get(`/api/v1/tasks/group/${groupId}`);
          setTasks(res.data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log("error", error.response?.data.message);
          } else {
            console.log("Error", error);
          }
        }
      };

      if (groupId) {
        getTask();
      }

      // Cleanup varsa burada yazabilirsiniz
      return () => {};
    }, [groupId])
  );
  // useEffect(() => {
  //   const getTask = async () => {
  //     try {
  //       const res = await api.get(`/api/v1/tasks/group/${groupId}`);
  //       console.log("res", res.data);
  //       setTasks(res.data);
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.log("error", error.response?.data.message);
  //       } else {
  //         console.log("Error", error);
  //       }
  //     }
  //   };

  //   if (groupId) {
  //     getTask();
  //   }
  // }, [groupId]);

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

      {tasks?.length === 0 && (
        <View
          style={{
            backgroundColor: Colors.background,
            paddingVertical: 20,
            borderRadius: 12,
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome5
            name="tasks"
            size={24}
            color={Colors.palette.textSecondary}
          />
          <Text
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: Colors.palette.textSecondary,
            }}
          >
            No tasks have been created for this group yet.
          </Text>
        </View>
      )}
      {tasks?.map((item) => (
        <TaskListCard key={item?._id} item={item} setShowTask={setShowTask}/>
      ))}
      <TaskDetailModal showTask={showTask} setShowTask={setShowTask} />
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
