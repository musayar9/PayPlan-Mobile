import { FlatList, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import GroupLayout from "@/components/Home/GroupLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import GroupCard from "@/components/Home/GroupCard";

import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { searchFilterGroup } from "@/redux/groupSlice";

const Groups = () => {
  const { group } = useSelector((state: RootState) => state.group);
  const [searchMember, setSearchMember] = useState("");
  const [filterGroup, setFilterGroup] = useState(group);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const filteredData = searchMember
      ? group.filter((item) =>
          item.name
            .toLocaleLowerCase()
            .includes(searchMember.toLocaleLowerCase())
        )
      : group;

    setFilterGroup(filteredData);
  }, [searchMember, group]);

  useEffect(() => {
    setFilterGroup(group);
  }, [group]);

  return (
    <GroupLayout isGroupPage={true} headStyle={styles.headStyle}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Filter by group name"
          placeholderTextColor={Colors.textSecondary}
          value={searchMember}
          onChangeText={(text) => setSearchMember(text)}
          autoCapitalize="none"
          autoCorrect={true}
          textTransform="lowercase"
        />
      </View>

      <FlatList
        data={filterGroup}
        style={{ marginTop: 20 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <GroupCard item={item} />}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      />
    </GroupLayout>
  );
};

export default Groups;

const styles = StyleSheet.create({
  headStyle: {
    flex: 1,
    // marginVertical: 50,
    paddingTop: 80,
    paddingHorizontal: 15,
    backgroundColor: Colors.lightBlur,
    position: "relative",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,
    // borderWidth: 1,
    paddingVertical: 6,
    //borderColor: Colors.gray,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fff",
    elevation: 2,
  },
});
