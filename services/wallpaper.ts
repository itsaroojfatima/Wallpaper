import { File, Paths } from "expo-file-system";
import * as MediaLibrary from "expo-media-library/legacy";
import { Alert, NativeModules, Platform } from "react-native";

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
  try {
    if (!imageUrl) {
      return { success: false, error: "Image URL is missing" };
    }

    if (Platform.OS === "android") {
      const { WallpaperSetterModule } = NativeModules;
      if (WallpaperSetterModule && WallpaperSetterModule.setWallpaper) {
        await WallpaperSetterModule.setWallpaper(imageUrl, target);
        Alert.alert(
          "Wallpaper Set 🎉",
          `Wallpaper set to ${target} screen successfully!`,
        );
        return { success: true };
      } else {
        // Fallback: download to gallery
        const dlResult = await downloadAndSaveWallpaper(imageUrl);
        if (dlResult.success) {
          Alert.alert(
            "Wallpaper Saved",
            "Please apply this wallpaper from your gallery settings.",
          );
          return { success: true };
        }
        return dlResult;
      }
    } else {
      // iOS doesn't allow 3rd party apps to directly change device wallpapers
      const dlResult = await downloadAndSaveWallpaper(imageUrl);
      if (dlResult.success) {
        Alert.alert(
          "Saved to Photos",
          "On iOS, wallpapers cannot be set automatically. The image was saved to your Photos app so you can set it as wallpaper.",
        );
        return { success: true };
      }
      return dlResult;
    }
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to set wallpaper",
    };
  }
};


