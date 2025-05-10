import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { api } from "@/utils/api";
import { TasksType } from "@/types/TaskType";
import StateStatus from "../StateStatus";
import { formatDates } from "@/utils/functions";

interface TaskDetailModalProps {
  showTask: boolean;
  setShowTask: React.Dispatch<SetStateAction<boolean>>;
}

const TaskDetailModal = ({ showTask, setShowTask }: TaskDetailModalProps) => {
  console.log("show", showTask);

  const { taskId } = useSelector((state: RootState) => state.task);
  const [taskDetail, setTaskDetail] = useState<TasksType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | boolean | null>("");
  useEffect(() => {
    const getTaskDetail = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/v1/tasks/${taskId}`);

        setTaskDetail(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error", error?.response?.data?.message);
          setError(error?.response?.data.message);
        } else {
          console.log("error", error);
          setError("Request was failed");
        }
      } finally {
        setLoading(false);
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

          <View
            style={{
              padding: 12,
              borderRadius: 12,
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: 20,
              }}
            >
              {/* <StateStatus statusValue={taskDetail?.status} /> */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 12, color: Colors.textSecondary }}>
                  Due Date:{" "}
                </Text>
                <Text style={{ fontSize: 12, color: Colors.textSecondary }}>
                  {formatDates(taskDetail?.dueDate)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    backgroundColor: taskDetail?.votes.vote
                      ? Colors.green400
                      : Colors.red400,
                    fontSize: 10,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    fontWeight: 500,
                    color: taskDetail?.votes.vote
                      ? Colors.green600
                      : Colors.red600,
                  }}
                >
                  {taskDetail?.votes.vote ? "Appointed" : "Not Appointed"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                paddingVertical: 8,
              }}
            >
              {taskDetail?.votes.vote && (
                <Image
                  style={styles.taskPersonImg}
                  source={{
                    uri: taskDetail?.assignedTo?.profilePicture
                      ? taskDetail?.assignedTo?.profilePicture
                      : "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                  }}
                />
              )}
              <View>
                <Text
                  style={{
                    color: Colors.textPrimary,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {taskDetail?.votes.vote
                    ? `${taskDetail.assignedTo.name} ${taskDetail.assignedTo.surname}`
                    : "User Not Appointment"}
                </Text>

                <Text style={{ fontSize: 10, color: Colors.textSecondary }}>
                  {taskDetail?.assignedTo?.email}
                </Text>
              </View>
            </View>

            <View
              style={
                {
                  // flexDirection: "row",
                  // alignItems: "center",
                  paddingVertical:12
                }
              }
            >
              <Text style={{ fontSize: 10, color: Colors.palette.accent }}>
                Task Content:{" "}
              </Text>
              <Text
                style={{
                  color: Colors.textPrimary,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {taskDetail?.title}
              </Text>
              
              
                 <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="radio-button-on-outline"
                color={Colors.textSecondary}
                size={12}
                style={styles.bullet}
              />
              <Text
                style={{ fontSize: 12, color: Colors.palette.textSecondary }}
              >
                {taskDetail?.description}
              </Text>
            </View>

            </View>

         
            <View
              style={{
                borderTopWidth: 0.5,
                marginVertical: 5,
                borderColor: Colors.palette.accent,
              }}
            ></View>
            <View style={{ paddingVertical: 12 }}>
              {taskDetail?.votes?.vote ? (
                <StateStatus statusValue={taskDetail?.status} />
              ) : (
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <TouchableOpacity
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      width: "50%",
                      backgroundColor: Colors.green600,
                      borderRadius: 10,
                      shadowColor:Colors.green600,
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      cursor: "pointer",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <AntDesign
                        name="like1"
                        size={20}
                        color={Colors.background}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.background,
                          fontWeight: 500,
                        }}
                      >
                        I can do it
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      width: "50%",
                      backgroundColor: Colors.red600,
                      borderRadius: 10,
                      shadowColor: Colors.red500,
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      cursor: "pointer",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <AntDesign
                        name="dislike1"
                        size={20}
                        color={Colors.background}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.background,
                          fontWeight: 500,
                        }}
                      >
                        I can't do it
                      </Text>
                    </View>
                    
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
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
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.lightBlur,
    zIndex: 1000,
  },
  taskPersonImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    backgroundColor: "#fff",
    elevation: 3,
  },
  bullet: {
    marginRight: 6,

    lineHeight: 18,
  },
});
