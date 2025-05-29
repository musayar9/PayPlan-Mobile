import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AgendaCalendar from "./AgendaCalendar";
import TaskCard from "./TaskCard";
import EmptyTask from "./EmptyTask";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import CustomBar from "../CustomBar";
import { setFilterData } from "@/redux/taskSlice";

const AssignedToMe = () => {
  const { filterData, myTask } = useSelector((state: RootState) => state.task);
  const { selectedDate } = useSelector((state: RootState) => state.task);
  const [active, setActive] = useState("all");
  const [isActive, setIsActive] = useState(false);
const dispatch = useDispatch<AppDispatch>()
  const status = ["all", ...new Set(myTask?.map((item) => item.status))];
  const handleFilterCategory = async (category: string) => {
    if (category === "all") {
      setActive("all");

      // setFilterData(myTask);
      dispatch(setFilterData(myTask));
    } else {
      const filterResult = myTask.filter((item) => item?.status === category);
      // setFilterData(filterResult);
      dispatch(setFilterData(filterResult));
      setActive(category);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <AgendaCalendar setActive={setActive} />
      <View style={{ marginHorizontal: 10, gap: 4 }}>
        <ScrollView
          style={{ width: "100%" }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusBarContent}
        >
          {["all", "pending", "in-progress", "completed"].map(
            (title, index) => (
              <CustomBar
                key={index}
                title={title}
                onPress={() => handleFilterCategory(title)}
                active={active}
                isActive={title === active}
              />
            )
          )}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={filterData}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 80 }}
          style={{ height: "80%" }}
          renderItem={(task) => <TaskCard isAssigned={true} item={task.item} />}
          
          ListEmptyComponent={
            <EmptyTask
              title="You have no tasks assigned."
              style={{ marginHorizontal: 20, marginVertical: 20 }}
            />
          }
        />
      </View>
    </View>
  );
};

export default AssignedToMe;

const styles = StyleSheet.create({
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
