import {
  Pressable,
  StyleSheet,
  Modal,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "@/services/group/groupService";
import { User } from "@/types/authType";
import axios from "axios";
import { api } from "@/utils/api";
import CheckBox from "expo-checkbox";
import { setMembersList } from "@/redux/groupSlice";
interface AddMemberModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenderItem = ({
  item,
}: {
  item: User;
  // setMembersList: React.Dispatch<SetStateAction<User[]>>;
}) => {
  const [isSelected, setSelection] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { membersList } = useSelector((state) => state.group);
  const dispatch = useDispatch();
  if (item._id === user?._id) return null;

  const handleSelect = (itemValue: User) => {
    if (isSelected) {
      setSelection(false);
      const list = membersList?.filter(
        (member) => member._id !== itemValue._id
      );
      dispatch(setMembersList(list));
    } else {
      setSelection(true);
      const list = [...membersList, itemValue];

      dispatch(setMembersList(list));
    }
  };

  useEffect(() => {
    // return;

    const isMember = membersList?.some((menubar) => menubar._id === item._id);
    if (isMember) {
      setSelection(true);
    }
  }, [user, membersList]);

  return (
    <View style={styles.memberContainer}>
      <CheckBox
        value={isSelected}
        onValueChange={() => handleSelect(item)}
        // onPress={() => handleSelect(item)}
        style={styles.checkbox}
      />
      <Image
        source={{ uri: item?.profilePicture }}
        style={styles.profilePicture}
        resizeMode="cover"
      />

      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberName}>{item.surname}</Text>
      </View>
    </View>
  );
};

const AddMemberModal = ({
  modalVisible,
  setModalVisible,
}: AddMemberModalProps) => {
  const [searchMember, setSearchMember] = useState("");
  const {} = useSelector((state) => state.group);
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/v1/users");
        // setUsers(res.data.users)
        // console.log("res.data", res.data);
        setUsers(res.data.users);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error", error.response?.data.message);
        } else {
          console.log("error", error);
        }
      }
    };

    if (modalVisible) {
      fetchUsers();
    }
  }, [modalVisible]);

  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: Colors.textPrimary,
                }}
              >
                Add Members
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons name="close" size={24} color={Colors.textPrimary} />
              </Pressable>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={Colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Search for members"
                placeholderTextColor={Colors.textSecondary}
                value={searchMember}
                onChangeText={(text) => setSearchMember(text)}
              />
            </View>

            <FlatList
              data={users}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <RenderItem item={item} />}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddMemberModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
    zIndex: 100,
  },
  modalView: {
    // margin: 20,
    width: "100%",
    height: "80%",
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },
  textStyle: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginVertical: 10,
  },

  // render Item styles
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingVertical: 12,
  },

  checkbox: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    borderRadius: 5,
    width: 20,
    height: 20,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },

  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  memberName: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textPrimary,
  },
});
