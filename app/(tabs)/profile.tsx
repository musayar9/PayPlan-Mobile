import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import Colors from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { signOut } from "@/redux/userSlice";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <View style={styles.container}>
      <Text>Profile</Text>

      <CustomButton
        text="Sign Out"
        style={styles.btn}
        textColor={Colors.background}
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
