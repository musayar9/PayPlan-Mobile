import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link, Tabs } from "expo-router";
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
        name="createGroup"
        options={{
          headerShown: false,
          tabBarButton(props) {
            return (
              <Link
                href={{
                  pathname: "/(tabs)/createGroup",
                  // params: { id: 0, status: "new" },
                }}
                asChild
              >
                <TouchableOpacity
                  {...props}
                  style={{
                    ...props.style,
                    backgroundColor: Colors.palette.accent,
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    top: -20,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.25,
                    elevation: 5,
                  }}
                >
                  <Ionicons name="add" color="#fff" size={24} />
                </TouchableOpacity>
              </Link>
            );
          },
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              icon="checkbox"
              name="Tasks"
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
