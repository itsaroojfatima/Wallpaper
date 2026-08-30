import TrendingComponent from "@/components/TrendingComponent";
import { View, StyleSheet } from "react-native";

export default function TrendingTab() {
  return (
    <View style={styles.container}>
      <TrendingComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a12",
  },
});
