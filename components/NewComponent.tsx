import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NewComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>New Items Screen Active</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#7C2D12", // Distinct Amber / Rust Orange
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
