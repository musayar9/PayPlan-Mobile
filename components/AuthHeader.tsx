import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const AuthHeader = ({
  subHead,
  subText,
}: {
  subHead: string;
  subText: string;
}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.subHead}>{subHead}</Text>
      <Text style={styles.subText}>{subText}</Text>

      <View style={styles.decorContainer}>
        <View style={[styles.decorShape, styles.decorShape1]} />
        <View style={[styles.decorShape, styles.decorShape2]} />
      </View>
    </View>
  );
};

export default AuthHeader;
const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  headerContainer: {
    // position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.32,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 80,
    justifyContent: "center",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },

  subHead: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    width: width * 0.7,
  },
  subText: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: 500,
    marginTop: 10,
  },
  decorContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  decorShape: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  decorShape1: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    top: -width * 0.2,
    left: -width * 0.2,
  },
  decorShape2: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    top: -width * 0.3,
    left: -width * 0.3,
  },
});
