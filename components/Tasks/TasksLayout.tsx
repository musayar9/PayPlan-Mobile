import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import CustomBackButton from "../CustomBackButton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface TasksLayoutProps {
  children: React.ReactNode;
  groupId: string;
  list: boolean;
  taskLength;
}

const TasksLayout = ({
  children,
  groupId,
  list,
  taskLength,
}: TasksLayoutProps) => {
  const { groupDetail } = useSelector((state: RootState) => state.group);

  return (
    <View style={styles.contentField}>
      {list && (
        <View style={styles.contentHeader}>
          <CustomBackButton style={{}} />
          <Text
            style={{ fontSize: 18, fontWeight: 600, color: Colors.textPrimary }}
          >
            {groupDetail?.name}
          </Text>
          <Text></Text>
        </View>
      )}

      <View style={styles.taskField}>
        <View>
          <Text style={styles.subHeadTextTwo}>Task Lists</Text>
          {taskLength > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingTop: 3,
              }}
            >
              <FontAwesome6
                name="clipboard-list"
                size={24}
                color={Colors.primary}
              />
              <Text style={{ color: Colors.primary, fontWeight: 400 }}>
                {taskLength} Tasks
              </Text>
            </View>
          )}
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Link
            asChild
            href={{
              pathname: "/newtask/[groupId]",
              params: { groupId: groupId },
            }}
            style={[styles.taskBtn, { backgroundColor: Colors.background }]}
          >
            <TouchableOpacity>
              <Entypo
                name="add-to-list"
                size={20}
                color={Colors.palette.accent}
                style={{ fontWeight: "bold" }}
              />
            </TouchableOpacity>
          </Link>
          {list || (
            <Link
              asChild
              href={{
                pathname: "/groupAllTask/[groupId]",
                params: { groupId: groupId },
              }}
              style={[styles.taskBtn, { backgroundColor: Colors.gray }]}
            >
              <TouchableOpacity>
                <Ionicons
                  name={"list"}
                  size={20}
                  color={Colors.palette.accent}
                />
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </View>

      {children}
    </View>
  );
};

export default TasksLayout;

const styles = StyleSheet.create({
  contentField: {
    gap: 20,
    marginTop: 20,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  taskField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subHeadTextTwo: { fontSize: 18, fontWeight: 600, color: Colors.textPrimary },
  taskBtn: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    width: 35,
    height: 35,
    borderRadius: 8,
  },
  taskWrapper: {
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 12,
    gap: 8,
  },
  taskHeader: {
    color: Colors.palette.textSecondary,
    fontSize: 12,
    fontWeight: 500,
  },
  taskTitle: {
    fontSize: 14,
    color: "#222",
    fontWeight: 600,
  },
  taskStatus: {
    fontWeight: "bold",
    fontSize: 10,

    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pending: {
    backgroundColor: Colors.red300,
    color: Colors.red500,
  },

  inProgress: {
    backgroundColor: Colors.blue400,
    color: Colors.blue600,
  },

  completed: {
    backgroundColor: Colors.green400,
    color: Colors.green600,
  },

  taskPersonImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
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
});
