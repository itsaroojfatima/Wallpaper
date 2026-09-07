package com.anonymous.Wallpaper

import android.app.WallpaperManager
import android.graphics.BitmapFactory
import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File
import java.io.InputStream
import java.net.URL
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class WallpaperSetterModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "WallpaperSetterModule"

    @ReactMethod
    fun setWallpaper(imageUriOrUrl: String, target: String, promise: Promise) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val wallpaperManager = WallpaperManager.getInstance(reactContext)
                val bitmap = when {
                    imageUriOrUrl.startsWith("http://") || imageUriOrUrl.startsWith("https://") -> {
                        val input: InputStream = URL(imageUriOrUrl).openStream()
                        BitmapFactory.decodeStream(input)
                    }
                    imageUriOrUrl.startsWith("file://") -> {
                        val path = imageUriOrUrl.removePrefix("file://")
                        BitmapFactory.decodeFile(path)
                    }
                    else -> {
                        val file = File(imageUriOrUrl)
                        if (file.exists()) {
                            BitmapFactory.decodeFile(file.absolutePath)
                        } else {
                            val input: InputStream = URL(imageUriOrUrl).openStream()
                            BitmapFactory.decodeStream(input)
                        }
                    }
                }

                if (bitmap == null) {
                    withContext(Dispatchers.Main) {
                        promise.reject("DECODE_ERROR", "Failed to decode image into bitmap")
                    }
                    return@launch
                }

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    val flags = when (target.lowercase()) {
                        "home" -> WallpaperManager.FLAG_SYSTEM
                        "lock" -> WallpaperManager.FLAG_LOCK
                        "both" -> WallpaperManager.FLAG_SYSTEM or WallpaperManager.FLAG_LOCK
                        else -> WallpaperManager.FLAG_SYSTEM
                    }
                    wallpaperManager.setBitmap(bitmap, null, true, flags)
                } else {
                    wallpaperManager.setBitmap(bitmap)
                }

                withContext(Dispatchers.Main) {
                    promise.resolve(true)
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    promise.reject("SET_WALLPAPER_ERROR", e.message ?: "Unknown error setting wallpaper", e)
                }
            }
        }
    }
}
