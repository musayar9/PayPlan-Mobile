import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { GroupsType } from "@/types/groupsType";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setMembersList } from "@/redux/groupSlice";

const GroupCard = ({ item }: { item: GroupsType }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: item.groupPicture
            ? `data:image/png;base64,${item.groupPicture}`
            : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
        }}
        style={styles.groupImage}
      />
      <View style={styles.groupContent}>
        <Text style={{ color: Colors.palette.textSecondary, fontSize: 12 }}>
          {item.members.length}
        </Text>
      </View>
      <View style={styles.groupWrapper}>
        <View style={styles.groupNameContent}>
          <Link
            asChild
            href={{
              pathname: "/newtask/[groupId]",
              params: { groupId: item._id },
            }}
            onPress={() => {
              dispatch(setMembersList([]));
            }}
          >
            <TouchableOpacity style={styles.taskBtn}>
              <Ionicons
                name={"add"}
                size={16}
                color={Colors.background}
                style={{ fontWeight: "bold" }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: Colors.background,
                  fontWeight: 500,
                }}
              >
                New Task
              </Text>
            </TouchableOpacity>
          </Link>

          <View style={styles.groupDetail}>
            <Text style={styles.groupNameText}>{item.name}</Text>

            <Text
              style={{ fontSize: 12, color: Colors.textSecondary }}
              numberOfLines={1}
            >
              {item.description}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            {item.members.map((member, index) => (
              <View
                key={member?._id}
                style={{
                  flexDirection: "column",
                  alignItems: "start",
                  marginLeft: index === 0 ? 0 : -20,
                  paddingVertical: 5,
                }}
              >
                <Image
                  source={{ uri: member.profilePicture }}
                  style={styles.memberImage}
                />
              </View>
            ))}
          </View>

          <Link
            href={{
              pathname: "/group/[id]",
              params: { id: item._id },
            }}
            asChild
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 2,
                bottom: 4,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <Text style={{ color: Colors.primary, fontSize: 12 }}>
                View Detail
              </Text>
              <Ionicons name="arrow-redo" color={Colors.primary} />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default GroupCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  groupImage: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 50,
    zIndex: 100,
    left: 1,
    borderWidth: 2,
    borderColor: Colors.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    backgroundColor: "#fff",
    elevation: 3,
  },
  groupContent: {
    position: "absolute",
    left: 24,
    width: 20,
    height: 20,
    bottom: 84,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    zIndex: 1000,
  },
  groupWrapper: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    //borderWidth: 1,
    //borderColor: Colors.gray,
    backgroundColor: "#fff",
    borderRadius: 14,
    left: 8,
    marginHorizontal: 12,
  },
  groupNameContent: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  groupNameText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: 600,
  },
  memberImage: {
    width: 44,
    height: 44,
    // borderWidth: 1,
    borderRadius: 50,
  },
  taskBtn: {
    backgroundColor: Colors.palette.accent,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    gap: 4,
    right: 1,
    top: -3,
  },
  groupDetail: {
    paddingVertical: 8,
  },
});
