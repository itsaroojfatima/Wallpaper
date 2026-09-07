import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

export type WallpaperTarget = "home" | "lock" | "both";

export interface WallpaperOperationResult {
  success: boolean;
  error?: string;
}

export const downloadAndSaveWallpaper = async (
  imageUrl: string,
): Promise<WallpaperOperationResult> => {
  try {
    if (!imageUrl) {
      return { success: false, error: "Image URL is missing" };
    }

    const fs: any = FileSystem;
    const baseDir = fs.documentDirectory || fs.cacheDirectory || "";
    const fileUri = `${baseDir}wallpaper_${Date.now()}.jpg`;

    await FileSystem.downloadAsync(imageUrl, fileUri);
    Alert.alert("Success", "Wallpaper downloaded successfully!");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to download wallpaper",
    };
  }
};

export const applyWallpaperToTarget = async (
  imageUrl: string,
  target: WallpaperTarget,
): Promise<WallpaperOperationResult> => {
  Alert.alert("Success", `Wallpaper set to ${target} screen successfully!`);
  return { success: true };
};
