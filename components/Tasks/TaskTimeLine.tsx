import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Timeline from "react-native-timeline-flatlist";
import Colors from "@/constants/Colors";
const TaskTimeLine = () => {
  return (
    <Timeline
      data={[
        {
          time: "2024-05-01",
          title: "Başladı",
          description: "Task başlatıldı",
        },
        {
          time: "2024-05-03",
          title: "Devam Ediyor",
          description: "Yapım aşamasında",
        },
        { time: "2024-05-05", title: "Tamamlandı", description: "Task bitti" },
      ]}
    
      circleColor="rgb(45,156,219)"
      circleStyle={{  position:"absolute", right:20}}
      lineColor="rgb(45,156,219)"
      timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
      timeStyle={{
        textAlign: "center",
        // backgroundColor: "#ff9797",
        color: Colors.textGray,
        padding: 10,
        borderRadius: 13,
        
      }}
      descriptionStyle={{ color: Colors.textGray }}
      options={{
        style: { paddingTop: 5 },
      }}
      isUsingFlatlist={true}
    />
  );
};

export default TaskTimeLine;

const styles = StyleSheet.create({});
