import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TasksType } from "@/types/TaskType";
import Colors from "@/constants/Colors";

interface TaskHeaderComponentProps {
  data: TasksType[] | null;
}

const TaskHeaderComponent = ({ data }: TaskHeaderComponentProps) => {
//   if (!data || data.length === 0 || !data[0].group) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: Colors.palette.backgroundCard,
//           padding: 20,
//           margin: 10,
//         }}
//       >
//         <Text>Bu grupa henüz task atanmamış</Text>
//       </View>
//     ); // veya uygun bir placeholder render edebilirsiniz
//   }

  return (
    <View style={styles.content}>
      <View style={{ flexDirection: "row", alignItems: "start", gap: 10 }}>
        <Image
          source={{
            uri: data[0]?.group?.groupPicture
              ? `data:image/png;base64,${data[0]?.group?.groupPicture}`
              : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
          }}
          style={styles.groupImage}
        />
        <View>
          <Text
            style={{
              fontSize: 16,
              color: Colors.textPrimary,
              fontWeight: "bold",
            }}
          >
            {data[0]?.group?.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: Colors.palette.textSecondary,
              fontWeight: 500,
            }}
          >
            {data[0]?.group?.description}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {data[0]?.group?.members.length > 0 &&
              (data[0]?.group?.members || []).map((member, index) => (
                <View
                  key={member?._id}
                  style={{
                    flexDirection: "column",
                    alignItems: "start",
                    marginLeft: index === 0 ? 0 : -15,
                    paddingVertical: 5,
                  }}
                >
                  <Image
                    source={{ uri: member?.profilePicture }}
                    style={styles.memberImage}
                  />
                </View>
              ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskHeaderComponent;

const styles = StyleSheet.create({
  content: {
    paddingTop: 30,
    paddingBottom: 10,
    // width:"100%",
    marginHorizontal: 18,
    // backgroundColor:Colors.palette.backgroundCard,
    // borderWidth:1,
    // borderColor:Colors.palette.border
    borderBottomWidth: 2,
    borderColor: Colors.palette.backgroundCard,
  },

  groupImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  memberImage: {
    width: 30,
    height: 30,
    // borderWidth: 1,
    borderRadius: 50,
  },
});
