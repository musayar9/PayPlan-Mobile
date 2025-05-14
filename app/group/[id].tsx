import {
  Alert,
  Animated,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { api } from "@/utils/api";
import axios from "axios";
import { GroupsType } from "@/types/groupsType";

import CustomBackButton from "@/components/CustomBackButton";
import Colors from "@/constants/Colors";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import ShowMenu from "@/components/ShowMenu";
import { Ionicons } from "@expo/vector-icons";
import TaskLists from "@/components/Tasks/TaskLists";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getGroupById } from "@/services/group/groupService";
import AddMemberModal from "@/components/Modals/AddMemberModal";
import { TasksType } from "@/types/TaskType";

const GroupDetail = () => {
  const { id } = useLocalSearchParams();
  const groupId = id as string;

  const { groupDetail } = useSelector((state: RootState) => state.group);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      // getGroup();
      dispatch(getGroupById(groupId));
    }
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.contentHeader}>
        <CustomBackButton />
        <Text style={styles.headText}>Details</Text>
        <ShowMenu />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginVertical: 20 }}
      >
        <Image
          source={{
            uri: groupDetail?.groupPicture
              ? `data:image/png;base64,${groupDetail.groupPicture}`
              : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
          }}
          style={styles.groupPicture}
        />

        <View>
          <Text style={styles.subHeadText}>{groupDetail?.name}</Text>
          <Text style={styles.subDescriptionText}>
            {groupDetail?.description}
          </Text>
        </View>

        <View style={styles.contentField}>
          <Text style={styles.subHeadTextTwo}>Group Members</Text>

          <FlatList
            data={groupDetail?.members}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => (
              <View
                style={{
                  paddingHorizontal: 6,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: item.profilePicture }}
                  alt={item.name}
                  style={{ width: 60, height: 60, borderRadius: 50 }}
                />
                <Text
                  style={{
                    color: Colors.textPrimary,
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            )}
          />
        </View>

        <TaskLists groupId={groupDetail?._id} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.lightBlur,
  },
  contentHeader: {
    paddingTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headText: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: "800",
  },
  groupPicture: {
    alignSelf: "center",
    height: 300,
    width: 300,
    borderRadius: 12,
    objectFit: "cover",
    marginVertical: 20,
  },
  subHeadText: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: 500,
  },
  subDescriptionText: {
    backgroundColor: "#fff",
    fontSize: 12,
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    color: Colors.palette.textSecondary,
    fontWeight: 500,
  },
  contentField: {
    gap: 20,
    marginTop: 20,
  },
  subHeadTextTwo: { fontSize: 18, fontWeight: 600, color: Colors.textPrimary },
  taskField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
