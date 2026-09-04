import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import ManageWallpaper, { TYPE } from "react-native-manage-wallpaper";

export type WallpaperTarget = "home" | "lock" | "both";

export interface WallpaperOperationResult {
  success: boolean;
  error?: string;
}

// --- 1. GALLERY MEIN DOWNLOAD KARNE KI LOGIC ---
export const downloadAndSaveWallpaper = async (
  imageUrl: string,
): Promise<WallpaperOperationResult> => {
  try {
    if (!imageUrl) {
      return { success: false, error: "Image URL is missing" };
    }

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      return { success: false, error: "Permission denied" };
    }

    const fileUri =
      (FileSystem.cacheDirectory || "") + `wallpaper_${Date.now()}.jpg`;
    const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync("Wallpapers", asset, false);

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to download wallpaper",
    };
  }
};

// --- 2. WALLPAPER SET KARNE KI LOGIC ---
export const applyWallpaperToTarget = async (
  imageUrl: string,
  target: WallpaperTarget,
): Promise<WallpaperOperationResult> => {
  try {
    if (!imageUrl) {
      return { success: false, error: "Image URL is missing" };
    }

    return new Promise((resolve) => {
      let targetType = TYPE.HOME;
      if (target === "lock") targetType = TYPE.LOCK;
      if (target === "both") targetType = TYPE.BOTH;

      ManageWallpaper.setWallpaper(
        { uri: imageUrl },
        (res: any) => {
          if (res.status === "success") {
            resolve({ success: true });
          } else {
            resolve({ success: false, error: "Failed to set wallpaper." });
          }
        },
        targetType,
      );
    });
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to set wallpaper",
    };
  }
};
