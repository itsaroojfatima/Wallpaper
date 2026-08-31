import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
}

export default function LoadingSpinner({
  message = "Loading...",
  size = "large",
}: LoadingSpinnerProps) {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={size} color="#b8867a" />
      {message ? <Text style={styles.loadingText}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a12",
  },
  loadingText: {
    color: "#a0aec0",
    marginTop: 10,
    fontSize: 14,
  },
});
