import { StyleSheet, Text, View } from "react-native";

export default function TrendingComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Trending Screen Active</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#701A75", // Distinct Magenta / Fuchsia
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
