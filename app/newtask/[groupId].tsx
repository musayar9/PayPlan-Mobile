import {
  Button,
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { formateDate, formatDates } from "@/utils/functions";
import AddMemberModal from "@/components/Modals/AddMemberModal";
import CustomButton from "@/components/CustomButton";
const CreateTask = () => {
  const { groupId } = useLocalSearchParams();
  const { groupDetail, membersList } = useSelector(
    (state: RootState) => state.group
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  console.log("date", date);
  useEffect(() => {
    if (groupId !== groupDetail?.id) {
      dispatch(getGroupById(groupId as string));
    }
  }, [groupId]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor={"transparent"} />

        <CustomHeader subHead="Create Task" />

        <View style={styles.head}>
          <View>
            <Text style={styles.subHead}>{groupDetail?.name}</Text>
            <Text style={styles.subHeadText}>
              {groupDetail?.members?.length}
              <Text style={styles.subHeadText2}>{""} member</Text>
            </Text>
          </View>
          <Image
            source={{
              uri: groupDetail?.groupPicture
                ? `data:image/png;base64,${groupDetail?.groupPicture}`
                : "https://img.freepik.com/premium-vector/team-icon-group-people-icon_1199668-1555.jpg?w=360",
            }}
            style={styles.groupImage}
          />
        </View>
        <View style={styles.forms}>
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
            inputHeight={{ height: 150 }}
          />
        </View>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={showDatepicker}
            onPress={showDatepicker}
            style={styles.dueDateBtn}
          >
            <Text style={styles.memberText}>Due Date</Text>
            <View style={[styles.addMemberBtn]}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color={Colors.background}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.dueBtnText}>{formatDates(date)}</Text>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}

        <View style={styles.addMember}>
          <Text style={styles.memberText}>Assigned to user</Text>

          <TouchableOpacity
            // style={styles.addMemberBtn}
            style={styles.addMemberBtn}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Ionicons name="add" size={20} color={Colors.background} />
          </TouchableOpacity>
        </View>
        {membersList.length > 0 && (
          <View style={styles.memberListContent}>
            <Image
              source={{ uri: membersList[0]?.profilePicture }}
              style={styles.memberImage}
            />

            <View>
              <Text style={{ fontSize: 14, fontWeight: 500 }}>
                {membersList[0]?.name} {membersList[0]?.surname}
              </Text>
              <Text style={[styles.subHeadText2, { fontSize: 12 }]}>
                {membersList[0]?.email}
              </Text>
            </View>
          </View>
        )}

        <AddMemberModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          status="create_task"
        />

        <CustomButton
          text="Create Task"
          style={styles.createBtn}
          textColor={Colors.background}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlur,
    paddingVertical: 50,
    paddingHorizontal: 15,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 15,
  },
  subHead: { color: Colors.textPrimary, fontWeight: "600", fontSize: 18 },
  subHeadText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 600,
  },
  subHeadText2: {
    color: Colors.textSecondary,
    fontWeight: 400,
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  dueDateBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dueBtnText: {
    marginVertical: 12,
    backgroundColor: Colors.background,
    padding: 10,
    // fontSize: 12,
    borderRadius: 10,
    fontWeight: "500",
    // textAlign: "center",
  },
  forms: {
    gap: 10,
    marginTop: 20,
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 10,
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
  createBtn: {
    backgroundColor: Colors.palette.accent,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  memberListContent: {
    marginVertical: 12,
    backgroundColor: Colors.background,
    padding: 10,
    // fontSize: 12,
    borderRadius: 10,
    fontWeight: "500",
    flexDirection: "row",
    gap: 10,
  },
  memberImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
