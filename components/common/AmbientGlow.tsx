import { ReactNode } from "react";
import {
  Animated,
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

const { width } = Dimensions.get("window");

interface AmbientGlowProps {
  animatedTopStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export default function AmbientGlow({
  animatedTopStyle,
  children,
}: AmbientGlowProps) {
  return (
    <>
      {animatedTopStyle ? (
        <Animated.View style={[styles.ambientGlowTop, animatedTopStyle]} />
      ) : (
        <View style={styles.ambientGlowTop} />
      )}
      <View style={styles.ambientGlowBottom} />
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  ambientGlowTop: {
    position: "absolute",
    top: -width * 0.3,
    right: -width * 0.2,
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: (width * 0.85) / 2,
    backgroundColor: "rgba(184, 134, 122, 0.16)",
  },
  ambientGlowBottom: {
    position: "absolute",
    bottom: -width * 0.3,
    left: -width * 0.2,
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: (width * 0.85) / 2,
    backgroundColor: "rgba(45, 27, 78, 0.22)",
  },
});
