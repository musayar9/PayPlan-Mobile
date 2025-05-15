import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import axios from "axios";
import { api } from "@/utils/api";
import { useRouter } from "expo-router";

interface ShowMenuProps {
  showMenu: boolean;
}

const ShowMenu = ({ groupId }: { groupId: string }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/api/v1/groups/${groupId}`);
      router.back();
      setShowMenu(false);
      return res;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("Error", err.response?.data.message);
      } else {
        console.log("Err", err);
      }
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color={Colors.textPrimary}
        />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [
              {
                scale: showMenu ? 1 : 0.5,
              },
            ],
            opacity: showMenu ? 1 : 0,
          },
        ]}
      >
        <View style={styles.editBtn}>
          <Ionicons
            name="pencil-sharp"
            size={18}
            color={Colors.palette.accent}
          />
          <Text style={styles.subText}>Update</Text>
        </View>
        <TouchableOpacity onPress={handleDelete} style={styles.editBtn}>
          <Ionicons name="trash" size={18} color={Colors.red300} />
          <Text style={styles.subText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ShowMenu;

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    top: 40,
    right: 5,
    backgroundColor: "rgba(239, 246, 255, 0.9)",
    // opacity: 0.9,
    borderRadius: 8,
    padding: 10,
    zIndex: 1000,
    width: 150,
    height: 100,
    borderWidth: 1,
    borderColor: Colors.palette.backgroundCard,
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    // alignItems:"center",
    // justifyContent:"flex-start"
  },
  editBtn: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },

  subText: {
    fontWeight: 500,
    fontSize: 12,
    color: Colors.textPrimary,
  },
});
