import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import CustomBackButton from "@/components/CustomBackButton";
import Colors from "@/constants/Colors";
import CustomInput from "@/components/CustomInput";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import AddMemberModal from "@/components/Modals/AddMemberModal";
import { useDispatch, useSelector } from "react-redux";
import { setMembersList } from "@/redux/groupSlice";
import { User } from "@/types/authType";
import { AppDispatch, RootState } from "@/redux/store";
import { createGroup, getMyGroups } from "@/services/group/groupService";
import { api } from "@/utils/api";
import CustomHeader from "@/components/CustomHeader";
const CreateGroup = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    groupPicture: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { membersList } = useSelector((state) => state.group);
  const router = useRouter();
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
        setFormData({ ...formData, groupPicture: result.assets[0].base64 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMemberRemove = (itemValue: User) => {
    const list = membersList?.filter((member) => member._id !== itemValue._id);
    dispatch(setMembersList(list));
  };

  const handleCreateGroup = async () => {
    const groupData = {
      name: formData.name,
      description: formData.description,
      groupPicture: formData.groupPicture,
      members: membersList.map((member) => member._id),
      createdBy: user?._id, // Replace with actual user ID
    };

    try {
      setIsLoading(true);
      const response = await api.post("/api/v1/groups", groupData);
      if (response.status === 201) {
        setFormData({
          name: "",
          description: "",
          groupPicture: "",
        });
        setGroup(response.data.group);
        // await dispatch(getMyGroups(user?._id));
        await dispatch(setMembersList([]));
        router.push("/home");
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Bilinmeyen bir hata oluştu.";
        setError(message);
      } else {
        setError("Bilinmeyen bir hata oluştu.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  console.log("erro", error);
  useEffect(() => {
    if (user?._id && !membersList.some((member) => member._id === user._id)) {
      const list = [...membersList, user];
      dispatch(setMembersList(list));
    }
  }, []);

  // useEffect(() => {
  //   const dismissKeyboard = () => Keyboard.dismiss();
  //   const keyboardListener = Keyboard.addListener(
  //     "keyboardDidHide",
  //     dismissKeyboard
  //   );

  //   return () => {
  //     keyboardListener.remove();
  //   };
  // }, []);
  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar />

        <CustomHeader subHead="Create Group" />

        <View style={styles.imageContent}>
          <Image
            source={{
              uri: formData.groupPicture
                ? `data:image/png;base64,${formData.groupPicture}`
                : "https://img.freepik.com/premium-vector/team-icon-group-people-icon_1199668-1555.jpg?w=360",
            }}
            resizeMode="cover"
            style={styles.groupPicture}
          />

          <TouchableOpacity
            style={styles.cameraBtn}
            onPress={handleImagePicker}
          >
            <Ionicons name="camera" />
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "600" }}>
          {formData.name || "Group Name"}
        </Text>
        <View style={styles.forms}>
          <CustomInput
            label="Group Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            maxLength={20}
            placeholder="Enter group name"
          />
          <Text style={styles.characterText}>
            {20 - formData.name.length} characters remaining
          </Text>

          <CustomInput
            label="Group Description"
            numberOfLines={4}
            inputHeight={{ height: 150 }}
            value={formData.description}
            textAlignVertical="top"
            maxLength={200}
            multiline={true}
            placeholder="Tell us about your group"
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
          />
          <Text style={styles.characterText}>
            {200 - formData.description.length} characters remaining
          </Text>
        </View>

        <View
          style={[
            styles.memberField,
            {
              backgroundColor: membersList?.length > 1 ? Colors.background : "",
            },
          ]}
        >
          <View style={styles.addMember}>
            <Text style={styles.memberText}>Add Member</Text>

            <TouchableOpacity
              // style={styles.addMemberBtn}
              style={styles.addMemberBtn}
              onPress={() => {
                console.log("copern modal"), setModalVisible(true);
              }}
            >
              <Ionicons name="add" size={20} color={Colors.background} />
            </TouchableOpacity>
          </View>

          {membersList.length > 0 && (
            <FlatList
              horizontal
              data={membersList}
              key={(item) => item.id}
              renderItem={({ item }) => {
                if (item._id === user?._id) return null;

                return (
                  <View
                    style={{
                      paddingHorizontal: 4,
                      gap: 10,
                    }}
                  >
                    <Image
                      source={{ uri: item?.profilePicture }}
                      style={styles.profilePicture}
                    />
                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => {
                        handleMemberRemove(item);
                      }}
                    >
                      <Ionicons name="close" size={16} color={Colors.error} />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          )}
        </View>
        <CustomButton
          text={isLoading ? "Creating..." : "Create Group"}
          disabled={isLoading}
          style={styles.createBtn}
          textColor={Colors.background}
          onPress={handleCreateGroup}
        />

        <AddMemberModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 45,
    paddingHorizontal: 15,
    position: "relative",

    backgroundColor: Colors.lightBlur,
    gap: 10,
  },

  forms: {
    gap: 10,
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 10,
  },

  imageContent: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // marginTop: 30,
  },

  groupPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: Colors.palette.border,
    padding: 20,
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  cameraBtn: {
    position: "absolute",
    bottom: 8,
    right: 130,
    backgroundColor: Colors.palette.backgroundLight,
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth:1,
  },
  characterText: {
    fontSize: 12,
    color: Colors.palette.textSecondary,
    paddingLeft: 12,
    marginTop: -8,
  },
  createBtn: {
    backgroundColor: Colors.palette.accent,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addMember: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    // marginTop:-10
  },
  memberText: {
    color: Colors.palette.textPrimary,
    fontSize: 16,
    fontWeight: 500,
  },
  addMemberBtn: {
    backgroundColor: Colors.palette.accent,
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  removeBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: Colors.palette.backgroundLight,
    padding: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  memberField: {
    gap: 10,
    paddingBottom: 20,

    borderRadius: 12,
    paddingHorizontal: 10,
  },
});
