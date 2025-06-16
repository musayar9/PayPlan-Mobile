import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
interface StatCardProps {
  icon: string;
  labels: string;
  count: number;
  color: string;
}

const StatCard = ({ icon, label, count, color }: StatCardProps) => {
  return (
    <View style={[styles.card, { borderColor: color }]}>
      <Text style={styles.label, {color}}>{label}</Text>
      <View style={{flexDirection:"row", alignItems:"center", gap:8, marginTop:12}}>
        <Ionicons name={icon} size={32} color={color} />
        <View style={{flexDirection:"row",}}>
        
        <Text style={[styles.count, { color }]}>{count} </Text>
        <Text style={{paddingTop:12, fontSize:12, color:Colors.textPrimary}}>Task</Text>
        </View>
      </View>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "center",
    gap: 8,
    padding: 16,
  },
  card: {
    flex: 1,
  
    padding: 10,
    // borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.palette.backgroundCard,
    // elevation: 3,
  },
  label: {
    // marginTop: 8,
    fontSize: 16,
    // color: "#555",
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
    // marginTop: 4,
  },
});
