import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import CustomBackButton from "@/components/CustomBackButton";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { app } from "@/utils/firebase";
import { useHandleFileUpload } from "@/utils/customHooks";
const { width, height } = Dimensions.get("screen");
const EditProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture);
  const [formData, setFormData] = useState({
    name: user?.name,
    surname: user?.surname,
    email: user?.email,
  });

  const [selectedImage, setSelectedImage] = useState("");
  const {imagePercent, handleFileUpload, imageUrl} = useHandleFileUpload()
  
  
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
      console.log("result", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setProfilePicture(`data:image/png;base64,${result.assets[0].base64}`);
        setSelectedImage(asset);
      }
    } catch (error) {
      console.log(error);
    }
  };


  //   asset: ImagePicker.ImagePickerAsset
  // ): Promise<string | null> => {
  //   try {
  //     setUpdateImage(true);
  //     console.log("aset", asset)
  //     if (!asset.uri) return null;

  //     const response = await fetch(asset.uri);
  //     const blob = await response.blob();

  //     const storage = getStorage(app);
  //     const fileName = `${Date.now()}-${asset.fileName || "profile.jpg"}`;
  //     const storageRef = ref(storage, fileName);

  //     const uploadTask = uploadBytesResumable(storageRef, blob);

  //     return new Promise((resolve, reject) => {
  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           const loading =
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           setImagePercent(Math.round(loading));
  //           setUpdateImage(true);
  //           if (loading === 100) {
  //             setUpdateImage(false);
  //           }
  //         },
  //         (error) => {
  //           console.log("Upload error:", error);
  //           setImageError(true);
  //           setErrorMessage(error.message);
  //           reject(null);
  //         },
  //         async () => {
  //           try {
  //             const url = await getDownloadURL(uploadTask.snapshot.ref);
  //             resolve(url);
  //           } catch (err) {
  //             reject(null);
  //           }
  //         }
  //       );
  //     });
  //   } catch (error) {
  //     console.log("File upload error:", error);
  //     return null;
  //   } finally {
  //     setUpdateImage(false);
  //   }
  // };

  const updateProfile = async () => {
    try {
      const profileImage = await handleFileUpload(selectedImage);
      console.log("profileIam", profileImage)
      
      
      

    } catch (error) {
    if(axios.isAxiosError(error)){
    console.log(error.response?.data.message)
    }else{
    console.log("error", error)
    
    }
    
    }
  };

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.head}>
        <CustomBackButton />
        <Text style={styles.headText}>Edit Profile</Text>
      </View>

      <View style={styles.editProfileContent}>
        <View style={styles.profileImageContent}>
          <View style={styles.pictureContent}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: profilePicture,
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
      </View>
      <View style={styles.formArea}>
        <Text
          style={{
            alignSelf: "flex-start",
            paddingLeft: 16,
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          Personal Information
        </Text>

        <View
          style={{
            width: "100%",
            borderBottomWidth: 0.9,
            borderBottomColor: "#90a1b9",
          }}
        />

        <View style={styles.formHead}>
          <CustomInput
            label="Name"
            value={formData.name}
            labelStatus="editProfile"
            width={width * 0.42}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <CustomInput
            label="Surname"
            value={formData.surname}
            width={width * 0.42}
            onChangeText={(text) => setFormData({ ...formData, surname: text })}
          />
        </View>
        <CustomInput
          label="Email"
          value={formData.email}
          width={width * 0.86}
          disabledStatus={true}
        />
      </View>

      <CustomButton
        text="Save Changes"
        style={[styles.btn, styles.updateBtn]}
        textColor={Colors.palette.backgroundCard}
        onPress={updateProfile}
      />

      <View
        style={{
          position: "absolute",
          bottom: height * 0.05,
          width: "100%",
          alignItems: "center",
          left: 15,
          justifyContent: "center",
          borderTopWidth: 1,
          borderTopColor: "#90a1b9",
        }}
      >
        <CustomButton
          text="Delete Account"
          style={[styles.btn, styles.deleteBtn]}
          textColor={Colors.palette.backgroundCard}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: Colors.lightBlur,
    paddingHorizontal: 16,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 8,
  },
  headText: { fontSize: 18, color: Colors.textPrimary, fontWeight: 600 },
  profileContent: {
    marginVertical: 20,
    // marginHorizontal: 10,
  },
  editProfileContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 15,
    gap: 10,
  },

  profileImageContent: { position: "relative" },
  pictureContent: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.palette.backgroundCard,

    width: 90,
    height: 90,
    borderRadius: 50,
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  cameraBtn: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: Colors.lightBlur,
    alignItems: "center",
    justifyContent: "center",
    bottom: 2,
    right: 0,
  },
  formArea: {
    paddingHorizontal: 8,
    paddingVertical: 20,
    backgroundColor: Colors.palette.backgroundCard,
    marginVertical: 12,
    // marginHorizontal: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  formHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  btn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,

    alignItems: "center",
    justifyContent: "center",
  },
  updateBtn: {
    backgroundColor: Colors.palette.accent,
  },
  deleteBtn: {
    backgroundColor: Colors.red500,
    width: "100%",
  },
});
