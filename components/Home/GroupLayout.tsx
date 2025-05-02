import { StyleSheet, Text, View,StatusBar } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


interface GroupPageProps {
  isGroupPage?: boolean;
  headStyle?: any;
  children: React.ReactNode;
}

const GroupLayout = ({ children, isGroupPage, headStyle }: GroupPageProps) => {
  const { group } = useSelector((state: RootState) => state.group);
  return (
    <View style={headStyle}>
      {isGroupPage && <StatusBar backgroundColor={Colors.lightBlur} translucent={true}   />}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{ fontSize: 20, color: Colors.textPrimary, fontWeight: 600 }}
          >
            The Groups
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingTop: 3,
            }}
          >
            <Ionicons name="people" size={24} color={Colors.primary} />
            <Text style={{ color: Colors.primary, fontWeight: 400 }}>
              {group?.length} Groups
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Link
            href={"/(tabs)/createGroup"}
            style={{
              backgroundColor: Colors.background,
              padding: 8,
              borderRadius: 12,
            }}
          >
            <Ionicons name="add" size={24} color={Colors.palette.accent} />
          </Link>

          {!isGroupPage && (
            <Link
              href={"/(tabs)/groups"}
              style={{
                backgroundColor: Colors.gray,
                padding: 8,
                borderRadius: 12,
              }}
            >
              <Ionicons name="people" size={24} color={Colors.palette.accent} />
            </Link>
          )}
        </View>
      </View>

      {children}
    </View>
  );
};

export default GroupLayout;

const styles = StyleSheet.create({});
