import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";

interface ProfileBadgeProps {
  groupCount: Number;
  taskCount: Number;
}
const ProfileBadge = ({ groupCount, taskCount }: ProfileBadgeProps) => {
  return (
    <View style={styles.badgeContent}>
      <View style={styles.badgeArea}>
        <Text style={[styles.badgeText, {color:Colors.red600}]}>{groupCount}</Text>
        <View style={styles.badgeIconContent}>
          <Text style={styles.badgeHeadText}>My Groups</Text>

          <Ionicons name="people" size={28} color={Colors.red600} />
        </View>
      </View>
      <View style={styles.badgeArea}>
        <Text style={[styles.badgeText, {color:Colors.blue600}]}>{taskCount}</Text>
        <View style={styles.badgeIconContent}>
          <Text style={styles.badgeHeadText}>My Tasks</Text>
          <Ionicons name="list" size={28} color={Colors.blue600} />
        </View>
      </View>
    </View>
  );
};

export default ProfileBadge;

const styles = StyleSheet.create({
  badgeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badgeArea: {
    backgroundColor: Colors.palette.backgroundCard,
    padding: 10,
    flexGrow: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.38,
    shadowRadius: 4.84,
    elevation: 5,
  },
  badgeText: {
    fontSize: 28,
    fontWeight: 600,
   
  },
  badgeIconContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  badgeHeadText: {
    fontSize: 12,
    fontWeight: 500,
    color: Colors.palette.textSecondary,
  },
});
