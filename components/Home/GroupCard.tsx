import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GroupsType } from "@/types/groupsType";
import Colors from "@/constants/Colors";

const GroupCard = ({ item }: { item: GroupsType }) => {
  console.log("object", item.members);
  return (
    <View
      style={{
        paddingHorizontal: 2,
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
            : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
        }}
        style={{
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
          shadowRadius: 3.5,
          backgroundColor: "#fff",

          elevation: 3,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 24,
          width: 20,
          height: 20,
          bottom: 74,
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: Colors.background,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          zIndex: 1000,
        }}
      >
        <Text style={{ color: Colors.palette.textSecondary }}>
          {item.members.length}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          paddingVertical: 8,
          paddingHorizontal: 24,
          borderWidth: 1,
          borderColor: Colors.gray,
          backgroundColor: "#fff",
          borderRadius: 14,
          left: 8,
          marginHorizontal: 12,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: 2,
        }}
      >
        <View style={{ paddingVertical: 8, paddingHorizontal: 20 }}>
          <Text
            style={{ color: Colors.textPrimary, fontSize: 16, fontWeight: 600 }}
          >
            {item.name}
          </Text>
          <Text numberOfLines={1}>{item.description}</Text>

          <View style={{ flexDirection: "row" }}>
            {item.members.map((member, index) => (
              <View
                key={member?._id + toString(index)}
                style={{
                  flexDirection: "column",
                  alignItems: "start",
                  marginLeft: index === 0 ? 0 : -20, // Overlapping effect
                  paddingVertical: 5,
                }}
              >
                <Image
                  source={{ uri: member.profilePicture }}
                  style={{
                    width: 44,
                    height: 44,
                    borderWidth: 1,
                    borderColor: Colors.palette.accent,
                    borderRadius: 50,
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default GroupCard;

const styles = StyleSheet.create({});
