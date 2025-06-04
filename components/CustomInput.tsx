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
  labelStatus?: string;
  placeholder: string;
  value?: string;
  isPassword?: boolean;
  onPress: () => void;
  width?: string | number | undefined;
  status?: string;
  numberOfLines?: number;
  inputHeight?: number;
}

const CustomInput = ({
  label,
  placeholder,
  value,
  isPassword,
  onPress,
  width,
  status,
  numberOfLines,
  inputHeight,
  labelStatus,
  ...props
}: CustomInputProps) => {

  return (
    <View style={{ position: "relative", width: width }}>
      <Text
        style={[
          styles.labelText,
          {
            backgroundColor:
              labelStatus === "auth" ? Colors.lightBlur : Colors.background,
          },
        ]}
      >
        {label}
      </Text>
      <TextInput
        {...props}
        value={value}
        placeholder={placeholder}
        style={[styles.input, inputHeight]}
        numberOfLines={numberOfLines}
      />

      {status === "password" && (
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
  iconBtn: {
    position: "absolute",
    top: 28,
    right: 10,
    backgroundColor: Colors.lightBlur,
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#90a1b9",
    zIndex: 1,
  },
});
