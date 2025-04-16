import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const  TabsLayout= () => {
  return (
    <Tabs>
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="groups" options={{ title: "Groups" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  )
}

export default  TabsLayout

