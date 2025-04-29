import {
  Alert,
  Animated,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { api } from "@/utils/api";
import axios from "axios";
import { GroupsType } from "@/types/groupsType";
import { StatusBar } from "expo-status-bar";
import CustomBackButton from "@/components/CustomBackButton";
import Colors from "@/constants/Colors";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import ShowMenu from "@/components/ShowMenu";
import { Ionicons } from "@expo/vector-icons";

const GroupDetail = () => {
  const { id } = useLocalSearchParams();
  const groupId = id as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groupDetail, setGroupDetail] = useState<GroupsType | null>(null);
  //   console.log("grpoup ,id", id);

  useEffect(() => {
    const getGroup = async () => {
      try {
        const response = await api.get(`/api/v1/groups/${groupId}`);
        // console.log("response", JSON.stringify(response.data, null, 2));
        setGroupDetail(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error", error.response?.data.message);
        } else {
          console.log("error", error);
        }
      }
    };

    if (id) {
      getGroup();
    }
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <View
        style={{
          paddingTop: 40,

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CustomBackButton />

        <Text
          style={{ color: Colors.textPrimary, fontSize: 20, fontWeight: "800" }}
        >
          Details
        </Text>

        <ShowMenu />
      </View>

      <Image
        source={{
          uri: groupDetail?.groupPicture
            ? `data:image/png;base64,${groupDetail.groupPicture}`
            : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
        }}
        style={{
          alignSelf: "center",
          height: 300,
          width: 300,
          borderRadius: 12,
          objectFit: "cover",
          marginVertical: 20,
        }}
        // resizeMode="stretch"
      />

      <View>
        <Text
          style={{ color: Colors.textPrimary, fontSize: 20, fontWeight: 500 }}
        >
          {groupDetail?.name}
        </Text>
        <Text
          style={{
            backgroundColor: Colors.gray,
            borderRadius: 10,
            padding: 12,
            marginVertical: 10,
            color: Colors.palette.textPrimary,
            fontWeight: 500,
          }}
        >
          {groupDetail?.description}
        </Text>
      </View>

      <View style={{gap:20, marginTop:20}}>
        <Text style={{fontSize:18, fontWeight:600, color:Colors.textPrimary}}>Group Members</Text>

        <FlatList
          data={groupDetail?.members}
          keyExtractor={(item) => item._id}
          horizontal
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal:6, alignItems:"center", justifyContent:"center" }}>
              <Image
                source={{ uri: item.profilePicture }}
                alt={item.name}
                style={{ width: 60, height: 60, borderRadius: 50 }}
              />
              <Text
                style={{
                  color: Colors.textPrimary,
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default GroupDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
});
