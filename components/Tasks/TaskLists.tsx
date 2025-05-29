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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { api } from "@/utils/api";
import { TasksType } from "@/types/TaskType";

import TasksLayout from "./TasksLayout";
import EmptyTask from "./EmptyTask";
import TaskListCard from "./TaskListCard";
import TaskDetailModal from "../Modals/TaskDetailModal";
import { getTasksByGroupId } from "@/services/tasks/tasksService";

interface TaskListProps {
  groupId: string;
  list?: boolean;
}

const TaskLists = ({ groupId, list }: TaskListProps) => {
  const [tasks, setTasks] = useState<TasksType[] | null>(null);
  const [showTask, setShowTask] = useState(false);
  const { groupTasks } = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch<AppDispatch>();
  useFocusEffect(
    useCallback(() => {
      if (groupId) {
        dispatch(getTasksByGroupId(groupId));
      }

      // Cleanup varsa burada yazabilirsiniz
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
    <TasksLayout groupId={groupId} list={list} taskLength={tasks?.length}>
      {groupTasks?.length === 0 && (
        <EmptyTask title={" No tasks have been created for this group yet."} />
      )}
      {list
        ? groupTasks?.map((item) => (
            <TaskListCard
              key={item?._id}
              item={item}
              setShowTask={setShowTask}
            />
          ))
        : groupTasks
            ?.slice(0, 3)
            .map((item) => (
              <TaskListCard
                key={item?._id}
                item={item}
                setShowTask={setShowTask}
              />
            ))}
      <TaskDetailModal showTask={showTask} setShowTask={setShowTask} />
    </TasksLayout>
  );
};

export default TaskLists;

const styles = StyleSheet.create({});
