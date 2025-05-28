import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Colors from "@/constants/Colors";

const MyGroupTask = () => {
  const { group } = useSelector((state: RootState) => state.group);

  return (
    <View style={styles.container}>
      <FlatList
        data={group}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        style={{ flexGrow: 1 }}
        contentContainerStyle={{
          paddingTop: 10,
          gap: 8,
          paddingHorizontal: 10,
        }}
        renderItem={({ item }) => (
          <View style={styles.groupContent}>
            <Image
              source={{
                uri: item.groupPicture
                  ? `data:image/png;base64,${item.groupPicture}`
                  : "https://t3.ftcdn.net/jpg/04/98/81/32/360_F_498813253_1F67TUXp7RKXETW6ZdavRa3dzwsGNgEd.jpg",
              }}
              style={styles.groupImage}
            />
            <Text style={styles.groupNameText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MyGroupTask;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  groupContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.palette.backgroundCard,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 2,
  },
  groupNameText: {
    fontSize: 12,
    color: Colors.palette.textSecondary,
  },
  groupImage: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});
