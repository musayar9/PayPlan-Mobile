import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GroupsType } from "@/types/groupsType";
import Colors from "@/constants/Colors";

const GroupCard = ({ item }: { item: GroupsType }) => {
  return (
    <View
      style={{
        paddingHorizontal: 4,
        marginVertical: 5,

        flexDirection: "row",
        alignItems: "center",

        gap: 10,
      }}
    >
      <Image
        source={{
          uri: item.groupPicture
            ? `data:image/png;base64,${item.groupPicture}`
            : "https://img.freepik.com/premium-vector/team-icon-group-people-icon_1199668-1555.jpg?w=360",
        }}
        style={{
          position: "absolute",
          width: 50,
          height: 50,
          borderRadius: 50,
          zIndex: 100,
          left: -1,
          borderWidth: 2,
          borderColor: Colors.background,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 24,
          width: 20,
          height: 20,
          top: 10,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: Colors.background,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          zIndex: 1000,
        }}
      >
        <Text style={{color:Colors.palette.textSecondary}}>{item.members.length}</Text>
      </View>
      <View
        style={{
          flex: 1,
          paddingVertical: 8,
          paddingHorizontal: 24,
          backgroundColor: Colors.lightGray,
          borderRadius: 14,
          marginHorizontal: 18,
        }}
      >
        <View style={{ paddingVertical: 8, paddingHorizontal: 20 }}>
          <Text
            style={{ color: Colors.textPrimary, fontSize: 16, fontWeight: 600 }}
          >
            {item.name}
          </Text>
          <Text numberOfLines={1}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default GroupCard;

const styles = StyleSheet.create({});
