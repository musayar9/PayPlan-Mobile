import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import Colors from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { signOut } from "@/redux/userSlice";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { setMyTask } from "@/redux/taskSlice";
import { getTasksByUserId } from "@/services/tasks/tasksService";
import ProfileBadge from "@/components/Profile/ProfileBadge";
import * as ImagePicker from "expo-image-picker";
import ProfileContent from "@/components/Profile/ProfileContent";
import { api } from "@/utils/api";
import { getUserProfile } from "@/services/auth/authService";
const { width, height } = Dimensions.get("screen");
const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { group } = useSelector((state: RootState) => state.group);
  const { getTasksByUser } = useSelector((state: RootState) => state.task);
  const [profilePicture, setProfilePicture] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getTasksByUserId(user?._id));
  }, []);

  const handleSignOut = () => {
    dispatch(signOut());
    router.push("/(auth)/login");
  };

  const handleImagePicker = async () => {
    try {
      const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status.status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfilePicture(result.assets[0].base64);

        const res = await api.put(
          `/api/v1/users/${user?._id}/profile-picture`,
          {
            profilePicture: result.assets[0].base64,
          }
        );
        console.log("res", res.data.message);

        if (res.status === 200) {
          setSuccessMsg(res.data.message);
          await dispatch(getUserProfile(user?._id));
        }
      }
    } catch (error) {
      console.log("tasksError", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileImageContent}>
          <View style={styles.pictureContent}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: profilePicture
                  ? `data:image/jpeg;base64,${profilePicture}`
                  : user?.profilePicture
                  ? user?.profilePicture.startsWith("data:image")
                    ? user?.profilePicture
                    : user?.profilePicture.startsWith("http")
                    ? user?.profilePicture
                    : `data:image/jpeg;base64,${user?.profilePicture}`
                  : "https://via.placeholder.com/150",
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.cameraBtn}
            onPress={handleImagePicker}
          >
            <Ionicons
              name="camera"
              size={18}
              style={styles.camera}
              color={Colors.textGray}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={[styles.subText, styles.textColor]}>
            {user?.name} {user?.surname}
          </Text>
          <Text style={[styles.textColor]}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.profileContent}>
        <ProfileBadge
          groupCount={group?.length}
          taskCount={getTasksByUser?.length}
        />

        <ProfileContent />

        <CustomButton
          text="Sign Out"
          style={styles.btn}
          textColor={Colors.background}
          onPress={handleSignOut}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlur,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: width * 0.2,
    paddingBottom: width * 0.1,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 15,
    gap: 10,
    backgroundColor: Colors.primary,
    height: height * 0.28,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  btn: {
    backgroundColor: Colors.palette.accent,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 8,
  },
  profileContent: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  profileImageContent: { position: "relative" },
  pictureContent: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.palette.backgroundCard,

    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  cameraBtn: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: Colors.palette.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    bottom: 2,
    right: 0,
  },
  textColor: {
    color: Colors.palette.backgroundCard,
  },
  subText: {
    fontSize: 18,
    fontWeight: 600,
  },
});
