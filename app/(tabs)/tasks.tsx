import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

const Tasks = () => {
  const [assignedMe, setAssignedMe] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.headContent}>
        <TouchableOpacity onPress={() => setAssignedMe(true)}>
          <Text
            style={[
              styles.btnText,
              {
                color: assignedMe
                  ? Colors.palette.accent
                  : Colors.palette.textSecondary,
              },
            ]}
          >
            Bana Atananlar
          </Text>
          <View
            style={[
              styles.bar,
              {
                borderBottomColor: assignedMe
                  ? Colors.palette.accent
                  : "transparent",
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAssignedMe(false)}>
          <Text
            style={[
              styles.btnText,
              {
                color: assignedMe
                  ? Colors.palette.textSecondary
                  : Colors.palette.accent,
              },
            ]}
          >
            Group Taskları
          </Text>
          <View
            style={[
              styles.bar,
              {
                borderBottomColor: !assignedMe
                  ? Colors.palette.accent
                  : "transparent",
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headWrapper} />

      {assignedMe ? (
        <View>
          <Text>bANA ATANAN TASKLAR</Text>
        </View>
      ) : (
        <View>
          <Text>Group Tasklar</Text>
        </View>
      )}
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlur,
    paddingTop: 50,
  },
  headWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.palette.backgroundCard,
    width: "100%",
    // paddingTop: -10,
    top: -4,
  },

  headContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  btnText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 600,
    paddingHorizontal: 12,
    cursor: "pointer",
  },
  bar: {
    borderBottomWidth: 4,
    borderRadius: 50,
    zIndex: 100,
    top: 8,
  },
});
