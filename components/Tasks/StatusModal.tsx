import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { SetStateAction } from "react";
import Colors from "@/constants/Colors";
import StateStatus from "../StateStatus";
import { isPending } from "@reduxjs/toolkit";
import { api } from "@/utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setFilterData,
  setMyTask,
  setUpdateTask,
  setUpdateTaskLoading,
} from "@/redux/taskSlice";
import { getAssignedTask } from "@/app/(tabs)/tasks";
import { Ionicons } from "@expo/vector-icons";

interface StatusModalProps {
  modalVisible: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  taskValues: { taskId: string; taskStatus: string };
}

const StatusModal = ({
  modalVisible,
  setShowModal,
  taskValues,
}: StatusModalProps) => {
  const statuses = ["pending", "in-progress", "completed"];
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const isDisabled = statuses.includes(taskValues.taskStatus);

  const selectStatus = async (status: string) => {
    try {
      dispatch(setUpdateTaskLoading(true));
      const res = await api.patch(`/api/v1/tasks/${taskValues.taskId}/status`, {
        status,
      });
      setShowModal(false);

      const { data } = await getAssignedTask({ userId: user?._id });
      dispatch(setMyTask(data));
      if (data) {
        dispatch(setFilterData(data));
      }
      dispatch(setUpdateTaskLoading(false));
    } catch (error) {
      console.log("error", error);
      if (axios.isAxiosError(error)) {
        console.log("error", error?.response?.data?.message);
      } else {
        console.log("error", error);
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setShowModal(false)}
          >
            <Ionicons name="close" size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>Select Task State</Text>
          {statuses.map((status) => (
            <TouchableOpacity
              //   disabled={isDisabled}
              key={status}
              onPress={() => selectStatus(status)}
              style={styles.statusButton}
            >
              <Text style={styles.statusText}>{status}</Text>
              {/* <StateStatus
                statusValue={status}
                style={{ minWidth: "100%", width: 200, height:40, alignItems:"center", justifyContent:"center", textAlign:"center", fontSize:16}}
              /> */}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)", // Modal arka plan yarı şeffaf
  },
  modalView: {
    width: "80%",
    backgroundColor: Colors.lightBlur,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",

    paddingVertical: 10,
  },
  statusButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  statusText: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 14,
    backgroundColor: "#ddd",
    borderRadius: 50,
    padding: 4,
  },
});
