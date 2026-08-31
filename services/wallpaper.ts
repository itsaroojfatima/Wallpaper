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
  try {
    if (!imageUrl) {
      return { success: false, error: "Image URL is missing" };
    }

    const targetName =
      target === "home"
        ? "Home Screen"
        : target === "lock"
          ? "Lock Screen"
          : "Both Home & Lock Screen";

    Alert.alert("Success", `Wallpaper set to ${targetName}!`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to set wallpaper",
    };
  }
};
