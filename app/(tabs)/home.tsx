import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "@/components/CustomButton";
import Colors from "@/constants/Colors";
import { Video } from "expo-av";
import { formateDate } from "@/utils/functions";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Groups from "@/components/Home/Groups";
import { useFocusEffect } from "expo-router";
import { AppDispatch } from "@/redux/store";
import { getMyGroups } from "@/services/group/groupService";
const { width, height } = Dimensions.get("screen");
const Home = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { group, isLoading, error } = useSelector(
    (state: RootState) => state.group
  );
  // console.log("user", user);
  const dispatch = useDispatch<AppDispatch>();
  const clickToken = () => {
    AsyncStorage.removeItem("token");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={styles.content}>
        <View style={[styles.headContent, styles.headLeft]}>
          <Text style={styles.headBiggerText}>PayPlan</Text>
          <Ionicons
            name="notifications"
            color={Colors.background}
            size={28}
            style={{ alignItems: "center" }}
          />
        </View>

        <View style={[styles.headContent, { paddingTop: 10 }]}>
          <View>
            <View style={styles.headUserInfo}>
              <Text style={styles.headText}>{user?.name}</Text>
              <Text style={styles.headText}>{user?.surname}</Text>
            </View>

            {/* <View style={styles.dateField}>
          <Video
            source={require("@/assets/images/calendar.mp4")}
            rate={2.0}
            volume={1.0}
            isMuted={true}
            resizeMode="contain"
            shouldPlay
            isLooping
            style={styles.video}
          />
          <Text style={styles.dateText}>{formateDate()}</Text>
        </View> */}
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                }}
              >
                <LottieView
                  source={require("@/assets/lottieFiles/cli.json")}
                  autoPlay
                  loop
                  style={{ width: 40, height: 40 }}
                />
              </View>
              <Text style={[styles.dateText, { marginLeft: -6 }]}>
                3 görev seni bekliyor
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.profileButton,
              { borderColor: user ? Colors.background : Colors.textSecondary },
            ]}
          >
            <Image
              source={require("@/assets/images/itachi.jpeg")}
              style={styles.profilePicture}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Groups />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  content: {
    paddingTop: width * 0.2,
    paddingBottom: width * 0.1,
    borderBottomLeftRadius:60,
    borderBottomRightRadius:60,
    paddingHorizontal: 15,
    gap: 10,
    backgroundColor: Colors.primary,
    height: height * 0.28,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },

  headBiggerText: {
    color: Colors.background,
    fontSize: 28,
    fontWeight: "bold",
  },
  headContent: {
    flexDirection: "row",

    justifyContent: "space-between",
  },

  headLeft: {
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 6,
    borderBottomColor: Colors.background,
  },

  headUserInfo: {
    flexDirection: "row",
    gap: 2,
  },
  profileButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.success,
    backgroundColor: Colors.background,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },

  headText: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: "bold",
  },
  dateField: {
    alignItems: "center",
    flexDirection: "row",
    // justifyContent: "center",
    paddingVertical: 8,
    gap: 8,
  },
  dateText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: 500,
  },

  video: {
    width: 35,
    height: 35,
    resizeMode: "cover",
    backgroundColor: Colors.primary,
    borderRadius: 30,

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
});
