import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const OAuthButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Image
        source={require("@/assets/images/google.png")}
        style={styles.image}
      />
      <Text style={styles.subText}>Google</Text>
    </TouchableOpacity>
  );
};

export default OAuthButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 0.5,
    borderColor: "#90a1b9",
    borderRadius: 10,
    height: 48,
    backgroundColor: Colors.lightBlur,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    cursor: "pointer",
  },
  image: { width: 20, height: 20 },
  subText: { fontSize: 18, fontWeight: 400 },
});
