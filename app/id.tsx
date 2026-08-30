import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailScreen() {
  const { imageUrl, photographer } = useLocalSearchParams();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  // Set Wallpaper Alert Function
  const handleSetWallpaper = () => {
    Alert.alert(
      "Set Wallpaper",
      "Where would you like to set this wallpaper?",
      [
        {
          text: "Home Screen",
          onPress: () =>
            Alert.alert("Success", "Wallpaper set to Home Screen!"),
        },
        {
          text: "Lock Screen",
          onPress: () =>
            Alert.alert("Success", "Wallpaper set to Lock Screen!"),
        },
        {
          text: "Both Home & Lock Screen",
          onPress: () =>
            Alert.alert("Success", "Wallpaper set to Both Screens!"),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imageUrl as string }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Top Bar with Back & Favorite Button */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={22}
                color={isFavorite ? "#ff5252" : "#ffffff"}
              />
            </TouchableOpacity>
          </View>

          {/* Bottom Action Buttons */}
          <View style={styles.bottomContainer}>
            {photographer && (
              <Text style={styles.photographerText}>
                Photo by {photographer}
              </Text>
            )}

            <View style={styles.buttonRow}>
              {/* Download Button */}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  Alert.alert("Success", "Wallpaper downloaded successfully!")
                }
              >
                <Ionicons name="download-outline" size={20} color="#ffffff" />
                <Text style={styles.buttonText}>Download</Text>
              </TouchableOpacity>

              {/* Set Wallpaper Button */}
              <TouchableOpacity
                style={[styles.actionButton, styles.setButton]}
                onPress={handleSetWallpaper}
              >
                <Ionicons
                  name="color-palette-outline"
                  size={20}
                  color="#ffffff"
                />
                <Text style={styles.buttonText}>Set Wallpaper</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a12",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  bottomContainer: {
    gap: 15,
  },
  photographerText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 50,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  setButton: {
    backgroundColor: "#b8867a",
    borderColor: "#b8867a",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
