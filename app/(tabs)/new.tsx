import NewComponent from "@/components/NewComponent";
import { View, StyleSheet } from "react-native";

export default function NewTab() {
  return (
    <View style={styles.container}>
      <NewComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a12",
  },
});
