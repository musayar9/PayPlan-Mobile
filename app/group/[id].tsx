import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { api } from "@/utils/api";
import axios from "axios";
import { GroupsType } from "@/types/groupsType";
import { StatusBar } from "expo-status-bar";
import CustomBackButton from "@/components/CustomBackButton";

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
    <View style={styles.container}>
    <StatusBar translucent backgroundColor="transparent"/>
      <Image
        source={{
          uri: groupDetail?.groupPicture
            ? `data:image/png;base64,${groupDetail.groupPicture}`
            : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
        }}
        style={{ height: 300, width: "100%", objectFit: "cover" }}
        resizeMode="stretch"
      />
      
      <CustomBackButton/>

      <Text>{groupDetail?.name}</Text>
      <Text>{id || "2"}</Text>
    </View>
  );
};

export default GroupDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
