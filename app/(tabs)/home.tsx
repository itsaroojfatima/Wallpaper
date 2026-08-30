import HomeComponent from "@/components/HomeComponent";
import { View, StyleSheet } from "react-native";

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <HomeComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a12",
  },
});
