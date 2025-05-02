import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CreateTask = () => {
  const { groupId } = useLocalSearchParams();
  const { groupDetail } = useSelector((state: RootState) => state.group);
  console.log("groupDetail", groupDetail)
  
  useEffect(()=>{
    if(groupId !== groupDetail?.id){
        console.log("groupId", groupId)
        console.log("groupDetal bulnamadu")
    }
    console.log("groupDetail bulunud")
  })
  return (
    <View>
      <Text>{groupId}</Text>
    </View>
  );
};

export default CreateTask;

const styles = StyleSheet.create({});
