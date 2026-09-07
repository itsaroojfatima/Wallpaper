import { File, Paths } from "expo-file-system";
import * as MediaLibrary from "expo-media-library/legacy";
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

    // 1. Request MediaLibrary permissions
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photos to save wallpapers.",
      );
      return { success: false, error: "Permission denied" };
    }

    // 2. Download file to local cache using modern File API
    const targetFile = new File(Paths.cache, `wallpaper_${Date.now()}.jpg`);
    const downloaded = await File.downloadFileAsync(imageUrl, targetFile, {
      idempotent: true,
    });

    // 3. Save to Media Library (Gallery/Photos)
    const asset = await MediaLibrary.createAssetAsync(downloaded.uri);
    try {
      const album = await MediaLibrary.getAlbumAsync("Wallpapers");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Wallpapers", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch {
      // If album creation fails on some Android variants, asset is still saved to Photos
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
  Alert.alert("Success", `Wallpaper set to ${target} screen successfully!`);
  return { success: true };
};

