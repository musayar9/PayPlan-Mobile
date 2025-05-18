import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import Colors from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { signOut } from "@/redux/userSlice";
import { useRouter } from "expo-router";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    dispatch(signOut());
    router.push("/(auth)/login")
  };
  
  
  
  
  
  
  
  
  
  
  

  console.log("user", user);
  return (
    <View style={styles.container}>
      <Text>Profile</Text>

      <CustomButton
        text="Sign Out"
        style={styles.btn}
        textColor={Colors.background}
        onPress={handleSignOut}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  btn: {
    backgroundColor: Colors.palette.accent,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
