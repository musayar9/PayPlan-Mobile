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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { api } from "@/utils/api";
import { TasksType } from "@/types/TaskType";
import StateStatus from "../StateStatus";
import { formatDates } from "@/utils/functions";
import { getGroupById } from "@/services/group/groupService";

interface TaskDetailModalProps {
  showTask: boolean;
  setShowTask: React.Dispatch<SetStateAction<boolean>>;
}

const TaskDetailModal = ({ showTask, setShowTask }: TaskDetailModalProps) => {
  console.log("show", showTask);

  const { taskId } = useSelector((state: RootState) => state.task);
  const { user } = useSelector((state: RootState) => state.auth);
  const [taskDetail, setTaskDetail] = useState<TasksType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | boolean | null>("");
  const [assignLoad, setAssignLoad] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
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

  const handleAssignTask = async () => {
    try {
      const res = await api.put(`/api/v1/tasks/assigned/${taskId}`, {
        assignedTo: user?._id,
      });
      console.log(res.data, "success");
      dispatch(getGroupById(taskDetail?.group?._id));
      setShowTask(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error", error?.response?.data?.message);
        setError(error?.response?.data.message);
      } else {
        console.log("error", error);
        setError("Request was failed");
      }
    }
  };

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
          {/* <Text style={{paddingBottom:12, fontWeight:600, textAlign:"center", fontSize:20, }}>Task Detail</Text> */}

          <Pressable
            style={[styles.button]}
            onPress={() => setShowTask(!showTask)}
          >
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </Pressable>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              {/* <StateStatus statusValue={taskDetail?.status} /> */}
              <View style={styles.cardLayout}>
                <Text style={styles.cardText}>Due Date: </Text>
                <Text style={styles.cardText}>
                  {formatDates(taskDetail?.dueDate)}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.stateAppoint,
                    {
                      backgroundColor: taskDetail?.votes.vote
                        ? Colors.green400
                        : Colors.red400,

                      color: taskDetail?.votes.vote
                        ? Colors.green600
                        : Colors.red600,
                    },
                  ]}
                >
                  {taskDetail?.votes.vote ? "Appointed" : "Not Appointed"}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.cardLayout,
                {
                  gap: 6,
                  paddingVertical: 8,
                },
              ]}
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
                <Text style={styles.appointInfo}>
                  {taskDetail?.votes.vote
                    ? `${taskDetail.assignedTo.name} ${taskDetail.assignedTo.surname}`
                    : "User Not Appointment"}
                </Text>

                <Text style={styles.cardText}>
                  {taskDetail?.assignedTo?.email}
                </Text>
              </View>
            </View>

            <View
              style={{
                // flexDirection: "row",
                // alignItems: "center",
                paddingVertical: 12,
                gap: 8,
              }}
            >
              <Text style={{ fontSize: 10, color: Colors.palette.textPrimary }}>
                Task Content:{" "}
              </Text>
              <Text style={styles.appointInfo}>{taskDetail?.title}</Text>

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

            <View style={styles.borderLine}></View>
            <View style={{ paddingVertical: 12 }}>
              {user?._id === taskDetail?.group.createdBy ? (
              
              
                <StateStatus
                  statusValue={taskDetail?.status}
                  style={styles.stateStatusText}
                />
                // <Text style={[styles.cardText, {fontSize:14, textAlign:"center"}]}>
                //   You cannot participate in voting for your own task.
                // </Text>
              ) : (
                <View>
                  {taskDetail?.votes?.vote ? (
                    <StateStatus
                      statusValue={taskDetail?.status}
                      style={styles.stateStatusText}
                    />
                  ) : (
                    <View style={[styles.cardLayout, { gap: 5 }]}>
                      <TouchableOpacity
                        style={[styles.btn, styles.btnSuccess]}
                        onPress={handleAssignTask}
                      >
                        <AntDesign
                          name="like1"
                          size={20}
                          color={Colors.background}
                        />
                        <Text style={styles.btnTxt}>I can do it</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.btn, styles.btnError]}
                        onPress={() => setShowTask(false)}
                      >
                        <AntDesign
                          name="dislike1"
                          size={20}
                          color={Colors.background}
                        />
                        <Text style={styles.btnTxt}>I can't do it</Text>
                      </TouchableOpacity>
                    </View>
                  )}
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
    height: "45%",
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
  stateStatusText: {
    fontSize: 18,
    // color:Colors?.background,
    textAlign: "center",
    borderRadius: 30,
  },

  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
  },
  cardLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  stateAppoint: {
    textAlign: "center",
    fontSize: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontWeight: 500,
  },
  appointInfo: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  borderLine: {
    borderTopWidth: 0.5,
    marginVertical: 5,
    borderColor: Colors.palette.accent,
  },

  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "50%",
    backgroundColor: Colors.palette.accent,
    borderRadius: 30,
    shadowColor: Colors.textSecondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    cursor: "pointer",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  btnSuccess: {
    backgroundColor: Colors.palette.accent,
    shadowColor: Colors.textSecondary,
  },
  btnError: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.textSecondary,
  },
  btnTxt: {
    fontSize: 16,
    color: Colors.background,
    fontWeight: 500,
  },
});
