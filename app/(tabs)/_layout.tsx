import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const TabIcon = ({
  icon,
  name,
  focused,
  color,
}: {
  icon: string;
  name: string;
  focused: boolean;
  color: string;
}) => {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        width: "100%",
        minWidth: 112,
        minHeight: 20,
        marginTop: 20,
        justifyContent: "center",
      }}
    >
      <Ionicons name={icon} color={focused ? color : "#111"} size={16} />
      <Text
        style={{
          color: focused ? color : "#111",
          textTransform: "capitalize",
          fontSize: 12,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

//   return(
//     <View
//       style={{
//         alignItems: "center",
//         flex: 1,
//         width: "100%",
//         minWidth: 112,
//         minHeight: 18,
//         marginTop: 16,
//         justifyContent: "center",
//       }}
//     >
//       <Ionicons name={icon} color={color} size={16} />
//     </View>
//   )
// };

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#111",
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          // backgroundColor: "#fff",
          borderTopWidth: 0,
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 50,
          
        },
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon="home" name="home" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              icon="people"
              name="group"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              icon="person"
              name="profile"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
