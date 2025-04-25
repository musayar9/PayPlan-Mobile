import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getMyGroups } from "@/services/group/groupService";
import { Link, useFocusEffect } from "expo-router";
import GroupCard from "./GroupCard";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

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
console.log("error", error)
  return (
    <View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 15 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{ fontSize: 20, color: Colors.textPrimary, fontWeight: 600 }}
          >
            The Groups
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingTop: 3,
            }}
          >
            <Ionicons name="people" size={24} color={Colors.primary} />
            <Text style={{ color: Colors.primary, fontWeight: 400 }}>
              {group?.length} Groups
            </Text>
          </View>
        </View>

        <View style={{flexDirection:"row", gap:10}}>
          <Link
            href={"/(tabs)/createGroup"}
            style={{
              backgroundColor: Colors.gray,
              padding: 8,
              borderRadius: 12,
            }}
          >
            <Ionicons name="add" size={24} color={Colors.palette.accent} />
          </Link>
          
          
          <Link
            href={"/(tabs)/groups"}
            style={{
              backgroundColor: Colors.gray,
              padding: 8,
              borderRadius: 12,
            }}
          >
            <Ionicons name="people" size={24} color={Colors.palette.accent} />
          </Link>
        </View>
      </View>

      <FlatList
        data={group.slice(0,3)}
        style={{ marginTop: 20 }}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <GroupCard item={item} />}
      />
    </View>
  );
};

export default Groups;

const styles = StyleSheet.create({});
