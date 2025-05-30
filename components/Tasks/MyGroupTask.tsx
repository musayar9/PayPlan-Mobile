import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Colors from "@/constants/Colors";
import { useFocusEffect } from "expo-router";
import { getTasksByGroupId } from "@/services/tasks/tasksService";
import TaskCard from "./TaskCard";
import { getGroupById } from "@/services/group/groupService";
import TaskHeaderComponent from "./TaskHeaderComponent";
import TaskEmptyComponent from "./TaskEmptyComponent";

const MyGroupTask = () => {
  const { group, groupDetail } = useSelector((state: RootState) => state.group);
  const { groupTasks, loading } = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch<AppDispatch>();
  const [selectId, setSelectId] = useState(group[0]?._id);
  const [active, setActive] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (group) {
        dispatch(getTasksByGroupId(selectId));
        dispatch(getGroupById(selectId));
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
            style={[
              styles.groupContent,
              {
                backgroundColor:
                  selectId === item._id
                    ? Colors.palette.accent
                    : Colors.palette.backgroundCard,
                borderWidth: selectId === item._id ? 2 : 0,
                borderColor: selectId === item?._id ? Colors.background : null,
              },
            ]}
          >
            <Image
              source={{
                uri: item.groupPicture
                  ? `data:image/png;base64,${item?.groupPicture}`
                  : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
              }}
              style={[
                styles.groupImage,
                {
                  borderWidth: selectId === item?._id ? 2 : 0,
                  borderColor:
                    selectId === item?._id ? Colors.background : null,
                },
              ]}
            />
            <Text
              style={[
                styles.groupNameText,
                {
                  color:
                    selectId === item?._id
                      ? Colors.palette.backgroundCard
                      : Colors.palette.textSecondary,
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <FlatList
          data={groupTasks}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={() =>
            groupTasks?.length > 0 && <TaskHeaderComponent data={groupTasks} />
          }
          renderItem={({ item }) => (
            <TaskCard item={item} isAssignedMe={false} />
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                marginVertical: 20,
                marginHorizontal:10
              }}
            >
              {loading || (groupTasks && groupTasks?.length > 0) ? (
                <Text>Loading</Text>
              ) : (
                <TaskEmptyComponent
                  data={groupTasks}
                  groupImage={groupDetail?.groupPicture}
                  groupName={groupDetail?.name}
                  groupId={groupDetail?._id}
                  loading={loading}
                />
              )}
            </View>
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
    // backgroundColor: Colors.palette.backgroundCard,
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
{
  /* <View>
              {loading || groupTasks?.length > 0 ? (
                <Text>Loading</Text>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.palette.backgroundCard,
                    padding: 20,
                    margin: 10,
                  }}
                >
                  <Text> {groupDetail?.name} u grupa henüz task atanmamış</Text>
                </View>
              )}
            </View> */
}
