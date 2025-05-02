import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getMyGroups } from "@/services/group/groupService";
import { Link, useFocusEffect } from "expo-router";
import GroupCard from "./GroupCard";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import GroupLayout from "./GroupLayout";

const Groups = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { group, isLoading, error } = useSelector(
    (state: RootState) => state.group
  );
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (user) {
      dispatch(getMyGroups(user?._id));
    }
  }, [dispatch, user]);
  console.log("error", error);
  return (
    <GroupLayout headStyle={styles.headStyle}>
      <FlatList
        horizontal={false}
        data={group?.slice(0, 3)}
        style={{ marginVertical: 20 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <GroupCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </GroupLayout>
  );
};

export default Groups;

const styles = StyleSheet.create({
  headStyle: { flex: 1, paddingVertical: 15, paddingHorizontal: 15 },
});
