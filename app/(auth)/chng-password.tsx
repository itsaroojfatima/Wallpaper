import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";
import AmbientGlow from "@/components/common/AmbientGlow";
import AuthHeader from "@/components/common/AuthHeader";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    console.log("Password changed successfully, going back to login");
    router.replace("/login");
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="light" />

      <AmbientGlow />

      <AuthHeader />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Change Password</Text>
              <Text style={styles.subtitle}>
                Create a strong new password to protect your account.
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <AuthInput
                label="Current Password"
                iconName="lock-closed-outline"
                placeholder="Enter current password"
                isPassword
                value={oldPassword}
                onChangeText={setOldPassword}
              />

              <AuthInput
                label="New Password"
                iconName="key-outline"
                placeholder="Enter new password"
                isPassword
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <AuthInput
                label="Confirm New Password"
                iconName="shield-checkmark-outline"
                placeholder="Confirm new password"
                isPassword
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <AuthButton
              title="Update Password"
              iconName="checkmark"
              onPress={handleChangePassword}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0e12",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  innerContainer: {
    paddingHorizontal: 24,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  titleSection: {
    marginTop: 10,
    marginBottom: 26,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    lineHeight: 20,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 28,
  },
});
