import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    console.log("Sign up pressed:", name, email, phone, address);
    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Please Sign Up to Join Us</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#b8867a"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#b0b0b0"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#b8867a"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#b0b0b0"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="call-outline"
                size={20}
                color="#b8867a"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="#b0b0b0"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#b8867a"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#b0b0b0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#b8867a"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#b8867a"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#b0b0b0"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#b8867a"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="location-outline"
                size={20}
                color="#b8867a"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="#b0b0b0"
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>
          <Text style={styles.termsText}>
            I agree to <Text style={styles.linkText}>Terms</Text> and{" "}
            <Text style={styles.linkText}>conditions</Text> &{" "}
            <Text style={styles.linkText}>Privacy</Text>.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  innerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 30,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 25,
  },
  inputContainer: {
    gap: 14,
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#b8867a",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    height: 54,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#2d3748",
  },
  termsText: {
    fontSize: 12,
    color: "#718096",
    marginBottom: 20,
    textAlign: "center",
  },
  linkText: {
    color: "#b8867a",
    fontWeight: "600",
  },
  button: {
    height: 56,
    backgroundColor: "#b8867a",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#b8867a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#718096",
    fontSize: 14,
  },
  loginText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
  },
});
