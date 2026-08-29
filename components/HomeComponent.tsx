import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Home Screen Active</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#064E3B", // Distinct Emerald Green
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
