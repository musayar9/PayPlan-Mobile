import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import AuthHeader from "@/components/AuthHeader";
import CustomInput from "@/components/CustomInput";
import TextField from "@/components/TextField";
import CustomButton from "@/components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import OAuthButton from "@/components/OAuthButton";
import { Link, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/services/auth/authService";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading, error, message, token } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (token) {
      router.push("/(tabs)/home");
    }
  }, [token]);
  const handleLogin = async () => {
    const data = {
      email: formData.email,
      password: formData.password,
    };

    await dispatch(login(data));
  };
  // console.log("user", user);
  // console.log("error", error);
  // console.log("mesassa", message);
  // console.log("token", token);
  return (
    <View style={styles.container}>
      <AuthHeader
        subHead="Sign in to your Account"
        subText="Sign in to your Account"
      />

      <View
        style={{ flex: 1, marginVertical: 30, marginHorizontal: 25, gap: 20 }}
      >
        <CustomInput
        style={{textTransform:"lowercase"}}
          label="email"
          placeholder="Enter your E-mail"
          value={formData.email.trim()}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <CustomInput
          label="password"
          placeholder="Enter your Password"
          value={formData.password.trim()}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry={!showPassword}
          // keyboardType="password"
          onPress={() => setShowPassword(!showPassword)}
          isPassword={showPassword ? true : false}
          maxLength={12}
          status="password"
        />

        <TextField style={styles.textField} text="Forgot Password ?" />

        <CustomButton
          text="Login"
          style={styles.loginBtn}
          textColor={Colors.background}
          onPress={handleLogin}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or login with</Text>
          <View style={styles.dividerLine} />
        </View>

        <OAuthButton />

        <View style={styles.footer}>
          <TextField text="Don't have an account?" style={styles.footerText} />
          <Link href={"/(auth)/register"}>
            <TextField text="Register" style={styles.textField} />
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Login;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBlur,
  },
  textField: {
    color: Colors.primary,
    textAlign: "right",
    fontWeight: "500",
    paddingRight: 4,
  },
  loginBtn: {
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
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#90a1b9",
  },
  dividerText: {
    paddingHorizontal: 10,
    color: "#45556c",
    fontSize: 14,
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
