import {
  applyWallpaperToTarget,
  downloadAndSaveWallpaper,
  WallpaperTarget,
} from "@/services/wallpaper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailScreen() {
  const { imageUrl, photographer } = useLocalSearchParams<{
    imageUrl?: string;
    photographer?: string;
  }>();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSettingWallpaper, setIsSettingWallpaper] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl) {
      Alert.alert("Error", "Image URL is missing.");
      return;
    }

    try {
      setIsDownloading(true);
      const result = await downloadAndSaveWallpaper(imageUrl);
      if (result.success) {
        Alert.alert(
          "Download Complete 🎉",
          "Wallpaper has been saved to your Photos/Gallery in the 'Wallpapers' album!",
        );
      } else if (result.error && result.error !== "Permission denied") {
        Alert.alert("Download Failed", result.error);
      }
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to download wallpaper.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpenSetOptions = () => {
    if (!imageUrl) {
      Alert.alert("Error", "Image URL is missing.");
      return;
    }
    setShowOptionsModal(true);
  };

  const handleSelectTarget = async (target: WallpaperTarget) => {
    setShowOptionsModal(false);
    if (!imageUrl) return;

    try {
      setIsSettingWallpaper(true);
      const result = await applyWallpaperToTarget(imageUrl, target);
      if (
        !result.success &&
        result.error &&
        result.error !== "Permission denied"
      ) {
        Alert.alert("Error", result.error);
      }
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to set wallpaper.");
    } finally {
      setIsSettingWallpaper(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
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

          <View style={styles.bottomContainer}>
            {photographer ? (
              <Text style={styles.photographerText}>
                Photo by {photographer}
              </Text>
            ) : null}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleDownload}
                disabled={isDownloading || isSettingWallpaper}
                activeOpacity={0.8}
              >
                {isDownloading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <>
                    <Ionicons
                      name="download-outline"
                      size={20}
                      color="#ffffff"
                    />
                    <Text style={styles.buttonText}>Download</Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.setButton]}
                onPress={handleOpenSetOptions}
                disabled={isDownloading || isSettingWallpaper}
                activeOpacity={0.8}
              >
                {isSettingWallpaper ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <>
                    <Ionicons
                      name="color-palette-outline"
                      size={20}
                      color="#ffffff"
                    />
                    <Text style={styles.buttonText}>Set Wallpaper</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <Modal
        visible={showOptionsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowOptionsModal(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.handleBar} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Wallpaper</Text>
              <Text style={styles.modalSubtitle}>
                Where would you like to set this wallpaper?
              </Text>
            </View>

            <View style={styles.optionsList}>
              <TouchableOpacity
                style={styles.optionItem}
                activeOpacity={0.7}
                onPress={() => handleSelectTarget("home")}
              >
                <View style={styles.optionIconBadge}>
                  <Ionicons
                    name="phone-portrait-outline"
                    size={22}
                    color="#b8867a"
                  />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>Home Screen</Text>
                  <Text style={styles.optionDesc}>
                    Apply wallpaper to your main home screen
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#6b7280" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionItem}
                activeOpacity={0.7}
                onPress={() => handleSelectTarget("lock")}
              >
                <View style={styles.optionIconBadge}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={22}
                    color="#b8867a"
                  />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>Lock Screen</Text>
                  <Text style={styles.optionDesc}>
                    Apply wallpaper to your lock screen
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#6b7280" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionItem}
                activeOpacity={0.7}
                onPress={() => handleSelectTarget("both")}
              >
                <View style={styles.optionIconBadge}>
                  <Ionicons name="albums-outline" size={22} color="#b8867a" />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>
                    Both Home & Lock Screen
                  </Text>
                  <Text style={styles.optionDesc}>
                    Apply across both screens
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              activeOpacity={0.8}
              onPress={() => setShowOptionsModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#171720",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingBottom: 34,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  handleBar: {
    width: 44,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  modalHeader: {
    marginBottom: 18,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#9ca3af",
  },
  optionsList: {
    gap: 10,
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f2c",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    gap: 14,
  },
  optionIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(184, 134, 122, 0.14)",
    justifyContent: "center",
    alignItems: "center",
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  optionDesc: {
    color: "#9ca3af",
    fontSize: 12,
  },
  cancelButton: {
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  cancelButtonText: {
    color: "#e2e8f0",
    fontSize: 15,
    fontWeight: "600",
  },
});
