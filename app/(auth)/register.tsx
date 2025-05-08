import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AuthHeader from "@/components/AuthHeader";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Colors from "@/constants/Colors";
import TextField from "@/components/TextField";
import { Link, Route, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/services/auth/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const { user, token, error, message } = useSelector((state) => state?.auth);

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (token) {
      router.push("/(tabs)/home");
    }
  }, [token]);

  const handleRegister = async () => {
    console.log("ckiek", formData);
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
    };
    await dispatch(register(data));
  };
  console.log("token", error, message, token, "user", user);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <AuthHeader subHead="Register" subText="Create your account" />
      <TouchableOpacity
        style={{ position: "absolute", top: 50, left: 20 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" color={Colors.background} size={24} />
      </TouchableOpacity>
      <View style={{ marginVertical: 30, marginHorizontal: 20, gap: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <CustomInput
            label="Name"
            labelStatus="auth"
            placeholder="Enter your name"
            width={width * 0.43}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <CustomInput
            label="Surname"
            labelStatus="auth"
            placeholder="Enter your surname"
            width={width * 0.45}
            value={formData.surname}
            onChangeText={(text) => setFormData({ ...formData, surname: text })}
          />
        </View>

        <CustomInput
        labelStatus="auth"
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <CustomInput
        labelStatus="auth"
          status="password"
          label="password"
          placeholder="Enter your password"
          maxLength={12}
          secureTextEntry={!showPassword}
          isPassword={showPassword ? true : false}
          onPress={() => setShowPassword(!showPassword)}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
        <CustomInput
        labelStatus="auth"
          status="password"
          label="confirm password"
          placeholder="Enter confirm password"
          maxLength={12}
          secureTextEntry={!showConfirmPassword}
          isPassword={showConfirmPassword ? true : false}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          value={formData.confirmPassword}
          onChangeText={(text) =>
            setFormData({ ...formData, confirmPassword: text })
          }
        />

        <CustomButton
          onPress={handleRegister}
          text="Register"
          style={styles.registerBtn}
          textColor={Colors.background}
        />

        <View style={styles.footer}>
          <TextField text="Don't have an account?" style={styles.footerText} />
          <Link href={"/(auth)/login"}>
            <TextField text="Login" style={styles.textField} />
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlur,
  },
  registerBtn: {
    backgroundColor: Colors.primary,
    marginTop: height * 0.02,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,

    borderRadius: 10,
    height: 48,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    cursor: "pointer",
  },
  textField: {
    color: Colors.primary,
    textAlign: "right",
    fontWeight: "500",
    paddingRight: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: 20,
    gap: 4,
  },
  footerText: {
    color: Colors.textPrimary,
  },
});
