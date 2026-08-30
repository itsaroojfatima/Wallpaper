import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetailScreen() {
  const { imageUrl, photographer } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDownload = () => {
    Alert.alert("Success", "Wallpaper downloaded successfully!");
  };

  const handleSetWallpaper = () => {
    Alert.alert("Success", "Wallpaper applied successfully!");
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      {imageUrl && (
        <Image source={{ uri: imageUrl as string }} style={styles.image} />
      )}

      <View style={styles.infoRow}>
        <Text style={styles.text}>
          Photo by: {photographer || "Pexels Artist"}
        </Text>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favButton}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#ff5252" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Ionicons name="download-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.primaryButton]}
          onPress={handleSetWallpaper}
        >
          <Ionicons name="phone-portrait-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Set Wallpaper</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "70%",
    borderRadius: 16,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    color: "#a0aec0",
    fontSize: 14,
  },
  favButton: {
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  primaryButton: {
    backgroundColor: "#b8867a",
    borderColor: "#b8867a",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
