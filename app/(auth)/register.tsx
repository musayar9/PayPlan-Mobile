import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthHeader from "@/components/AuthHeader";

const Register = () => {
  return (
    <View style={styles.container}>
      <AuthHeader
        subHead="Register"
        subText="Create your account"
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
