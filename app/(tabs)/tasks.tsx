import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import CustomBar from "@/components/CustomBar";
import { TasksType } from "@/types/TaskType";
import { useFocusEffect } from "expo-router";
import { api } from "@/utils/api";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import TaskCard from "@/components/Tasks/TaskCard";

const getAssignedTask = async ({ userId }: { userId: String }) => {
  try {
    const res = await api.get(`/api/v1/tasks/assignedTo/${userId}`);
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
  const [myTask, setMyTask] = useState<TasksType[] | null>(null);
  const [filterData, setFilterData] = useState<TasksType[] | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const { data } = await getAssignedTask({ userId: user?._id });
        console.log("data");
        setMyTask(data);
        setFilterData(data);
      };
      if (user) {
        getData();
      }
    }, [user])
  );

  const status = ["all", ...new Set(myTask?.map((item) => item.status))];

  const handleFilterCategory = async (category: title) => {
    console.log("title", category);
    if (category === "all") {
      setFilterData(myTask);
    } else {
      const filterResult = myTask.filter((item) => item?.status === category);
      setFilterData(filterResult);
    }
  };

  // console.log("FİLTERrE", status);
  // console.log(
  //   "FİLTERrESULT",
  //   filterData?.map((item) => item.title)
  // );

  return (
    <View style={styles.container}>
      <View style={styles.headContent}>
        <TouchableOpacity onPress={() => setAssignedMe(true)}>
          <Text
            style={[
              styles.btnText,
              {
                color: assignedMe
                  ? Colors.palette.accent
                  : Colors.palette.textSecondary,
              },
            ]}
          >
            Bana Atananlar
          </Text>
          <View
            style={[
              styles.bar,
              {
                borderBottomColor: assignedMe
                  ? Colors.palette.accent
                  : "transparent",
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAssignedMe(false)}>
          <Text
            style={[
              styles.btnText,
              {
                color: assignedMe
                  ? Colors.palette.textSecondary
                  : Colors.palette.accent,
              },
            ]}
          >
            Group Taskları
          </Text>
          <View
            style={[
              styles.bar,
              {
                borderBottomColor: !assignedMe
                  ? Colors.palette.accent
                  : "transparent",
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headWrapper} />

      {assignedMe ? (
        <View>
          <Text>Tasks assigned to me</Text>
        </View>
      ) : (
        <View>
          <Text>Group Task</Text>
        </View>
      )}
      <View style={{ marginHorizontal: 10 }}>
        <ScrollView
          style={{ width: "100%" }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusBarContent}
        >
          {["all", "pending", "in-Completed", "completed"].map(
            (title, index) => (
              <CustomBar
                key={index}
                title={title}
                onPress={() => handleFilterCategory(title)}
              />
            )
          )}
        </ScrollView>
      </View>

      <View>
        <FlatList
          data={filterData}
          keyExtractor={(item) => item._id}
          renderItem={(task) => <TaskCard item={task.item} />}
          ListEmptyComponent={<View>
          <Text>Task Bulunnamdı</Text>
          </View>}
        />
      </View>
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
});
