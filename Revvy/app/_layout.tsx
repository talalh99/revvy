import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AuthScreen } from "@/components/AuthScreen";

export default function RootLayout() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // PRODUCTION: replace with firebase auth().onAuthStateChanged
    setTimeout(() => setLoading(false), 1200);
  }, []);

  if (loading) {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashLogo}>Revvy</Text>
        <View style={styles.splashUnderline} />
        <ActivityIndicator color="#F97316" style={{ marginTop: 32 }} />
      </View>
    );
  }

  if (!user) {
    return <AuthScreen onLogin={(u: any) => setUser(u)} />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
  },
  splashLogo: {
    fontSize: 56,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -2,
  },
  splashUnderline: {
    width: 60,
    height: 4,
    backgroundColor: "#F97316",
    borderRadius: 2,
    marginTop: 8,
  },
});
