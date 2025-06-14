import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Colors from "@/constants/Colors";
import CustomBar from "@/components/CustomBar";
import { TasksType } from "@/types/TaskType";
import { useFocusEffect } from "expo-router";
import { api } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import TaskCard from "@/components/Tasks/TaskCard";
import { setFilterData, setMyTask } from "@/redux/taskSlice";
import TaskCalendar from "@/components/Tasks/TaskCalendar";
import TaskTimeLine from "@/components/Tasks/TaskTimeLine";
import AgendaCalendar from "@/components/Tasks/AgendaCalendar";
import EmptyTask from "@/components/Tasks/EmptyTask";
import AssignedToMe from "@/components/Tasks/AssignedToMe";
import MyGroupTask from "@/components/Tasks/MyGroupTask";

export const getAssignedTask = async ({
  userId,
  sortDate,
}: {
  userId: String;
  sortDate?: string;
}) => {
  try {
    const res = await api.get(
      `/api/v1/tasks/assignedTo/${userId}?sortDate=${sortDate}`
    );
    return { data: res.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message);
    } else {
      console.log("errror", error);
    }
  }
};

const Tasks = () => {
  const [assignedMe, setAssignedMe] = useState(true);
  // const [myTask, setMyTask] = useState<TasksType[] | null>(null);
  // const [filterData, setFilterData] = useState<TasksType[] | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const { updateTask, taskUpdateLoading, myTask, filterData } = useSelector(
    (state: RootState) => state.task
  );
  const translateX = useRef(new Animated.Value(0)).current;
  const { selectedDate } = useSelector((state: RootState) => state.task);

  const dispatch = useDispatch<AppDispatch>();
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const { data } = await getAssignedTask({
          userId: user?._id,
          sortDate: selectedDate,
        });

        dispatch(setMyTask(data));
        dispatch(setFilterData(data));
      };
      if (user) {
        getData();
      }
    }, [user, updateTask])
  );

  const handleTabPress = (assigned: boolean) => {
    setAssignedMe(assigned);
    Animated.timing(translateX, {
      toValue: assigned ? 0 : 225, // mesafeyi sekme genişliğine göre ayarla
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContent}>
        <TouchableOpacity
          style={{
            flex: 1,

            alignItems: "center",
            paddingVertical: 10,
            borderRadius: 10,
          }}
          onPress={() => handleTabPress(true)}
        >
          <Text
            style={{
              color: assignedMe
                ? Colors.palette.accent
                : Colors.palette.textSecondary,
              fontWeight: "bold",
            }}
          >
            Bana Atananlar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,

            alignItems: "center",
            paddingVertical: 10,
            borderRadius: 10,
          }}
          onPress={() => handleTabPress(false)}
        >
          <Text
            style={{
              color: !assignedMe
                ? Colors.palette.accent
                : Colors.palette.textSecondary,
              fontWeight: "bold",
            }}
          >
            Group Taskları
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "50%",
            height: 3,
            backgroundColor: Colors.palette.accent,
            transform: [{ translateX }],
          }}
        />
      </View>
      <View style={styles.headWrapper} />
      {assignedMe ? <AssignedToMe /> : <MyGroupTask />}

      {/* <TaskTimeLine /> */}
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlur,
    paddingTop: 50,
  },
  headWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.textLight_50,
    width: "100%",
    // paddingTop: -10,
    top: -4,
  },

  headContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  btnText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 600,
    paddingHorizontal: 12,
    cursor: "pointer",
  },
  bar: {
    borderBottomWidth: 4,
    borderRadius: 50,
    zIndex: 100,
    top: 8,
  },

  statusBarContent: {
    flexDirection: "row",

    // height: 40,
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  noTaskText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 20,
  },
});
