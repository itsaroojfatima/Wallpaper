import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

function CustomHeader() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {/* TITLE */}
      <View style={styles.titleContainer}>
        <Text style={styles.brandTitle}>
          Wallpaper<Text style={styles.brandDot}>.</Text>
        </Text>
        <Text style={styles.brandSubtitle}>Explore 4K & Ultra HD</Text>
      </View>

      {/* ICONS */}
      <View style={styles.headerActions}>
        {/* SETTINGS */}
        <Pressable
          style={styles.iconBtn}
          onPress={() => {
            Alert.alert("Settings", "Settings button clicked!");
            router.push("/");
          }}
        >
          <Ionicons name="settings-outline" size={22} color="#ffffff" />
        </Pressable>

        {/* FAVORITE */}
        <Pressable
          style={styles.iconBtn}
          onPress={() => {
            Alert.alert("Favorite", "Favorite button clicked!");
            router.push("/");
          }}
        >
          <Ionicons name="heart-outline" size={23} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          header: () => <CustomHeader />,
          tabBarStyle: {
            backgroundColor: "#181822",
            borderTopWidth: 0,
            elevation: 10,
            height: Platform.OS === "android" ? 65 : 85,
            paddingBottom: Platform.OS === "android" ? 10 : 25,
            paddingTop: 10,
          },
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarActiveBackgroundColor: "#d19283",
          tabBarItemStyle: {
            borderRadius: 20,
            marginHorizontal: 10,
            padding: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={20}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="grid"
          options={{
            title: "Categories",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={20}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            title: "New",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "sparkles" : "sparkles-outline"}
                size={20}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="trending"
          options={{
            title: "Trending",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "flame" : "flame-outline"}
                size={20}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 50 : 60,
    paddingBottom: 15,
    backgroundColor: "#0a0a12",
    zIndex: 100,
    elevation: 100,
  },
  titleContainer: {
    flex: 1,
  },
  brandTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
  },
  brandDot: {
    color: "#d19283",
  },
  brandSubtitle: {
    color: "#9ca3af",
    fontSize: 11,
    marginTop: 2,
  },
  /* ICONS */
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 200,
    elevation: 200,
  },
  iconBtn: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 21,
    backgroundColor: "#181822",
    zIndex: 300,
    elevation: 300,
  },
});
