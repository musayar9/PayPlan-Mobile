import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
        <Text>ShowMenu</Text>
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
    width: 200,
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
});
