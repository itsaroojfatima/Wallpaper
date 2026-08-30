import GridComponent from "@/components/GridComponent";
import { View, StyleSheet } from "react-native";

export default function GridTab() {
  return (
    <View style={styles.container}>
      <GridComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a12",
  },
});
