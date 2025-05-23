import CustomButton from "@/components/CustomButton";
import Colors from "@/constants/Colors";

import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
} from "react-native";
import LottieView from "lottie-react-native";
import { Video } from "expo-av";
import { Redirect, useRouter } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function Index() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const redirect = async () => {
      if (user) {
        // router.replace("/(tabs)/home");
        return <Redirect href={"/(tabs)/home"} />;
      }
      // return router.replace("/(auth)");
      return <Redirect href={"/(auth)"} />;
    };

    redirect();
  }, [user]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* <View style={{ flex: 0.2 }} /> */}
      {/* <Image
        source={require("@/assets/images/group.png")}
        style={styles.image}
      /> */}
      <View style={styles.image}>
        {/* <Video
          source={require("@/assets/images/plan.mp4")}
          rate={2.0}
          volume={1.0}
          isMuted={true}
          resizeMode="contain"
          shouldPlay
          isLooping
          style={styles.image}
        /> */}

        <LottieView
          source={require("@/assets/lottieFiles/group.json")}
          autoPlay
          loop
          style={{ width: 400, height: 400 }}
        />
      </View>

      <View style={styles.headerContent}>
        <Text style={styles.headerText}>PayPlan</Text>
        {/* <Text style={styles.subHead}> Hoş Geldiniz</Text> */}
        <Text style={styles.contentText}>
        Get started with our app and simplify your life. Easily keep track of your tasks and create new projects effortlessly        </Text>
      </View>
      <View style={{ flex: 0.3 }} />
      <CustomButton
        text="Let's Start"
        style={styles.button}
        onPress={() => router.push("/(auth)/login")}
      />
    </View>
  );
}

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:"center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  headerContent: {
    alignItems: "center",
    marginTop: 25,
    gap: 20,
    padding: 12,
  },
  headerText: {
    fontSize: 42,

    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  image: {
    width: width * 1,
    height: height * 0.55,
    resizeMode: "cover",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: "center",
    justifyContent: "center",
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
  subHead: { fontWeight: "600", fontSize: 24, color: "#1d293d" },
  contentText: {
    textAlign: "center",
    fontSize: 18,
    color: "#1d293d",
    fontWeight: "400",
    lineHeight: 28,
  },
  button: {
    marginTop: height * 0.02,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
    backgroundColor: "#fff",
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
});
