import TopNavigation from "@/components/TopNavigation";
import { Slot } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation />
      <View style={styles.contentArea}>
        <Slot />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  contentArea: {
    flex: 1,
    padding: 8,
  },
});
