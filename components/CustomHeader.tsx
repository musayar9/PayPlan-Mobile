import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomBackButton from "./CustomBackButton";
import Colors from "@/constants/Colors";

const CustomHeader = ({ subHead }: { subHead: string }) => {
  return (
    <View style={styles.head}>
      <CustomBackButton style={styles.arrowButton} />
      <Text style={styles.headText}>{subHead}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 20,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.background,
    shadowColor: "#000",
    backgroundColor: Colors.lightBlur,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headText: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.palette.textPrimary,
  },
});
