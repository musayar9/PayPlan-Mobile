import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { SetStateAction, useEffect } from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { api } from "@/utils/api";

interface TaskDetailModalProps {
  showTask: boolean;
  setShowTask: React.Dispatch<SetStateAction<boolean>>;
}

const TaskDetailModal = ({ showTask, setShowTask }: TaskDetailModalProps) => {
  console.log("show", showTask);

  const { taskId } = useSelector((state: RootState) => state.task);
  useEffect(() => {
    const getTaskDetail = async () => {
      try {
        const res = await api.get(`/api/v1/tasks/${taskId}`);
        console.log("resdata", res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error", error?.response?.data?.message);
        } else {
          console.log("error", error);
        }
      }
    };

    if (taskId) {
      getTaskDetail();
    }
  }, [taskId]);

  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTask}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setSShowTask(!showTask);
        }}
      >
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button]}
            onPress={() => setShowTask(!showTask)}
          >
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TaskDetailModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalView: {
    // margin: 20,
    width: "100%",
    height: "70%",
    backgroundColor: Colors.lightBlur,
    borderRadius: 20,
    padding: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    bottom: 0,
    position: "absolute",
  },

  button: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
