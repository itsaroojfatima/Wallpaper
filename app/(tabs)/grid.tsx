import { StyleSheet, Text, View } from "react-native";

export default function GridTab() {
  return (
    <View style={styles.componentBox}>
      <Text style={styles.titleText}>Categories Screen Active</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  componentBox: {
    backgroundColor: "#1e1e1e",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  titleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
