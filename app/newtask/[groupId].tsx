import {
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getGroupById } from "@/services/group/groupService";
import Colors from "@/constants/Colors";
import CustomBackButton from "@/components/CustomBackButton";
import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import { Ionicons } from "@expo/vector-icons";

const CreateTask = () => {
  const { groupId } = useLocalSearchParams();
  const { groupDetail } = useSelector((state: RootState) => state.group);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (groupId !== groupDetail?.id) {
      dispatch(getGroupById(groupId as string));
    }
  }, [groupId]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.lightBlur,
          paddingVertical: 50,
          paddingHorizontal: 15,
        }}
      >
        <StatusBar translucent backgroundColor={"transparent"} />

        <CustomHeader subHead="Create Task" />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: Colors.background,
            borderRadius: 10,
            padding: 15,
          }}
        >
          <View>
            <Text style={{ color: Colors.textPrimary, fontWeight: "600", fontSize:18 }}>
              {groupDetail?.name}
            </Text>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 12,
                fontWeight: 600,
                gap: 4,
              }}
            >
              {groupDetail?.members?.length}
              <Text
                style={{
                  color: Colors.textSecondary,
                  fontWeight: 400,
                  paddingLeft: 3,
                }}
              >
                member
              </Text>
            </Text>
          </View>
          <Image
            source={{
              uri: groupDetail?.groupPicture
                ? `data:image/png;base64,${groupDetail?.groupPicture}`
                : "https://img.freepik.com/premium-vector/team-icon-group-people-icon_1199668-1555.jpg?w=360",
            }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
        </View>
        <View style={{gap:10, marginTop:20}}>
          <CustomInput
            label="Task Title"
            maxLength={20}
            placeholder="Enter task title"
          />

          <CustomInput
            label="Task Description"
            numberOfLines={4}
            textAlignVertical="top"
            multiline={true}
            placeholder="Enter task description"
          />
        </View>

        <View style={styles.addMember}>
          <Text style={styles.memberText}>Assigned to user</Text>

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
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
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
});
