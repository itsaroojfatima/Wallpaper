import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const router = useRouter();

  // Settings Menu Items Array
  const settingsOptions = [
    { id: "1", title: "Remove Ads", icon: "star", route: "/remove-ads" },
    { id: "2", title: "History", icon: "time-outline", route: "/history" }, // Added History
    { id: "3", title: "Favourites", icon: "heart", route: "/favorites" },
    {
      id: "4",
      title: "Auto Wallpaper Changer",
      icon: "sync-circle",
      route: "/auto-changer",
    },
    { id: "5", title: "Rate this App", icon: "star-outline", route: "/rate" },
    {
      id: "6",
      title: "Sharing is Caring!",
      icon: "share-social",
      route: "/share",
    },
    {
      id: "7",
      title: "Customer Support",
      icon: "chatbubble-ellipses",
      route: "/support",
    },
    { id: "8", title: "Manage App", icon: "settings", route: "/manage" },
    { id: "9", title: "Legal", icon: "information-circle", route: "/legal" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Settings Options List */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {settingsOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.optionRow}
            activeOpacity={0.7}
            onPress={() => {
              // Agar screen exist karti hai toh route par jayega, warna filhal warning dega
              try {
                router.push(item.route as any);
              } catch (error) {
                console.log(`Route ${item.route} not created yet`);
              }
            }}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon as any} size={22} color="#ffffff" />
            </View>
            <Text style={styles.optionText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a12", // Dark background matching the app theme
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)", // Very light separator
  },
  backButton: {
    paddingRight: 15,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
  },
  listContainer: {
    paddingVertical: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 40, // Fixed width so all text aligns perfectly
    alignItems: "flex-start",
  },
  optionText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "400",
  },
});
