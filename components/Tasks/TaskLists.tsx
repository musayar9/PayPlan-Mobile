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


import TasksLayout from "./TasksLayout";
import EmptyTask from "./EmptyTask";
import TaskListCard from "./TaskListCard";
import TaskDetailModal from "../Modals/TaskDetailModal";

interface TaskListProps {
  groupId: string;
  list?:boolean;
}

const TaskLists = ({ groupId, list }: TaskListProps) => {
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
    <TasksLayout groupId ={groupId} list={list} taskLength={tasks?.length} >
      {tasks?.length === 0 && <EmptyTask />}
       {list ? tasks?.map((item) => (
        <TaskListCard key={item?._id} item={item} setShowTask={setShowTask} />
      )): tasks?.slice(0, 3).map((item) => (
        <TaskListCard key={item?._id} item={item} setShowTask={setShowTask} />
      ))}
      <TaskDetailModal showTask={showTask} setShowTask={setShowTask} />
    </TasksLayout>
  );
};

export default TaskLists;

const styles = StyleSheet.create({});
