import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Colors from "@/constants/Colors";
import { useFocusEffect } from "expo-router";
import { getTasksByGroupId } from "@/services/tasks/tasksService";
import TaskCard from "./TaskCard";
import { getGroupById } from "@/services/group/groupService";

const MyGroupTask = () => {
  const { group, groupDetail } = useSelector((state: RootState) => state.group);
  const { groupTasks, } = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch<AppDispatch>();
  const [selectId, setSelectId] = useState(group[0]?._id);
  const [active, setActive] = useState(false);
  useFocusEffect(
    useCallback(() => {
      if (group) {
        dispatch(getTasksByGroupId(selectId));
        dispatch(getGroupById(selectId))
      }

      // Cleanup varsa burada yazabilirsiniz
    }, [group, selectId, dispatch])
  );
  const handleGroupPress = (groupId: string) => {

    setSelectId(groupId);
    // Navigate to the group detail page or perform any action with the group ID
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={group}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        style={{ flexGrow: 1 }}
        contentContainerStyle={{
          paddingTop: 10,
          gap: 8,
          paddingHorizontal: 10,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleGroupPress(item._id)}
            style={styles.groupContent}
          >
            <Image
              source={{
                uri: item.groupPicture
                  ? `data:image/png;base64,${item.groupPicture}`
                  : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
              }}
              style={styles.groupImage}
            />
            <Text style={styles.groupNameText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <FlatList
          data={groupTasks}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={()=><View><Text>{groupTasks[0]?.group?.name}</Text></View>}
          renderItem={({ item }) => (
           <TaskCard item={item} isAssignedMe={false}/>
          )}
        />
      </View>
    </View>
  );
};

export default MyGroupTask;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  groupContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.palette.backgroundCard,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 4,
  },
  groupNameText: {
    fontSize: 12,
    color: Colors.palette.textSecondary,
  },
  groupImage: {
    width: 24,
    height: 24,
    borderRadius: 50,
  },
});
