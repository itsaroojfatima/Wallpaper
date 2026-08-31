import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="forget-password" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="email-verify" />
      <Stack.Screen name="chng-password" />
      <Stack.Screen name="home" />
    </Stack>
  );
}
