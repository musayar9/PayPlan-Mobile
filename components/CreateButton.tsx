import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

const CreateButton = React.memo((props: any) => (
  <TouchableOpacity
    {...props}
    style={{
      ...props.style,
      backgroundColor: Colors.palette.accent,
      width: 60,
      height: 60,
      borderRadius: 30,
      top: -20,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      elevation: 5,
    }}
  >
    <Ionicons name="add" color="#fff" size={24} />
  </TouchableOpacity>
));

export default CreateButton;
