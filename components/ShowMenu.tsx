import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors"

interface ShowMenuProps {
  showMenu: boolean;
}

const ShowMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
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
          <Ionicons name="pencil-sharp" size={18}/>
          <Text>Update</Text>

        </View>
        <View style={styles.editBtn}>
          <Ionicons name="trash" size={18}/>
          <Text>Delete</Text>

        </View>
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
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    zIndex: 1000,
    width: 150,
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    //alignItems:"center",
    //justifyContent:"flex-start"
  },
  editBtn:{
    paddingVertical:10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"flex-start",
    gap:4,
    borderBottomWidth:1,
    borderBottomColor:Colors.gray

  }
});
