import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface CustomInputProps extends TextInputProps {
  label: string;
  placeholder: string;
  value?: string;
  isPassword?: boolean;
  onPress: () => void;
}

const CustomInput = ({
  label,
  placeholder,
  value,
  isPassword,
  onPress,
  ...props
}: CustomInputProps) => {
  return (
    <View style={{ position: "relative" }}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        {...props}
        value={value}
        placeholder={placeholder}
        style={styles.input}
        
      />

      {label === "password" && (
        <TouchableOpacity onPress={onPress} style={styles.iconBtn}>
          <Ionicons
            name={isPassword ? "eye" : "eye-off"}
            size={20}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  labelText: {
    position: "absolute",
    top: 8,
    left: 5,
    backgroundColor: "#fff",
    color: "#45556c",
    zIndex: 1,
    width: "auto",

    paddingHorizontal: 16,
    textTransform: "capitalize",
  },

  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#90a1b9",
    borderRadius: 10,
    paddingHorizontal: 21,

    marginTop: 20,
  },
  iconBtn:{
    position: "absolute",
    top: 28,
    right: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#90a1b9",
    zIndex: 1,
    
  }
});
