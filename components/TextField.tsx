import { StyleProp, StyleSheet, Text, View } from "react-native";
import React from "react";

const TextField = ({ text, style }: { text: string; style: StyleProp }) => {
  return <Text style={style}>{text}</Text>;
};

export default TextField;

const styles = StyleSheet.create({});
