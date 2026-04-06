import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import Svg, { Path, G, Rect } from "react-native-svg";

const { height } = Dimensions.get("window");

// ── Google Icon ────────────────────────────────────────
function GoogleIcon() {
  return (
    <Svg width="20" height="20" viewBox="0 0 48 48">
      <Path
        fill="#FFC107"
        d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"
      />
      <Path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"
      />
      <Path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-3-11.3-7.3l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <Path
        fill="#1976D2"
        d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.5-4.6 5.8l6.2 5.2C40.9 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"
      />
    </Svg>
  );
}

// ── Apple Icon ─────────────────────────────────────────
function AppleIcon({ color = "#fff" }: { color?: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 814 1000">
      <Path
        fill={color}
        d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 376.7 0 248.3 0 124.8 0 56.8 23.5 1 67.8 1c47.4 0 96.4 38.1 96.4 110.9 0 61.6-23.5 129.7-70.5 206.3 48.4 41.1 96.4 75.5 173.7 75.5 70.9 0 131-30.9 180.8-30.9 74.2 0 134.6 46 182.4 46 74.2 0 134.6-46 134.6-46z"
      />
    </Svg>
  );
}

interface Props {
  onLogin: (user: any) => void;
}

export function AuthScreen({ onLogin }: Props) {
  const [loading, setLoading] = useState(false);

  const signInGoogle = async () => {
    setLoading(true);
    try {
      // PRODUCTION:
      // await GoogleSignin.hasPlayServices();
      // const { idToken } = await GoogleSignin.signIn();
      // const credential = auth.GoogleAuthProvider.credential(idToken);
      // const result = await auth().signInWithCredential(credential);
      // onLogin(result.user);
      await new Promise((r) => setTimeout(r, 900));
      onLogin({
        uid: "mock_google",
        displayName: "Alex Johnson",
        email: "alex@gmail.com",
      });
    } catch {
      Alert.alert("Sign in failed", "Please try again.");
    }
    setLoading(false);
  };

  const signInApple = async () => {
    setLoading(true);
    try {
      // PRODUCTION:
      // const response = await appleAuth.performRequest({
      //   requestedOperation: appleAuth.Operation.LOGIN,
      //   requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      // });
      // const credential = auth.AppleAuthProvider.credential(response.identityToken, response.nonce);
      // const result = await auth().signInWithCredential(credential);
      // onLogin(result.user);
      await new Promise((r) => setTimeout(r, 900));
      onLogin({
        uid: "mock_apple",
        displayName: "Alex Johnson",
        email: "alex@icloud.com",
      });
    } catch {
      Alert.alert("Sign in failed", "Please try again.");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Top section */}
      <View style={styles.top}>
        <View style={styles.iconWrap}>
          {/* Speedometer icon */}
          <Svg width="56" height="56" viewBox="0 0 160 160">
            <Path
              d="M28 98 A52 52 0 1 1 132 98"
              fill="none"
              stroke="#1E293B"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <Path
              d="M28 98 A52 52 0 0 1 118 58"
              fill="none"
              stroke="#F97316"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <Path
              d="M80 80 L118 58"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <Path
              d="M80 80 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0-16 0"
              fill="#F97316"
            />
            <Path
              d="M80 80 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0-6 0"
              fill="#0F172A"
            />
          </Svg>
        </View>

        <Text style={styles.appName}>revvy</Text>
        <View style={styles.underline} />
        <Text style={styles.tagline}>
          Your cars complete history,{"\n"}always in your pocket.
        </Text>

        <View style={styles.featureRow}>
          {["⛽  Fuel logs", "🔧  Service history", "📊  Spend tracking"].map(
            (f) => (
              <View key={f} style={styles.featurePill}>
                <Text style={styles.featurePillText}>{f}</Text>
              </View>
            ),
          )}
        </View>
      </View>

      {/* Bottom buttons */}
      <View style={styles.bottom}>
        {loading ? (
          <ActivityIndicator
            color="#F97316"
            size="large"
            style={{ marginVertical: 24 }}
          />
        ) : (
          <>
            <TouchableOpacity style={styles.googleBtn} onPress={signInGoogle}>
              <GoogleIcon />
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.appleBtn} onPress={signInApple}>
              <AppleIcon color="#fff" />
              <Text style={styles.appleText}>Continue with Apple</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              By continuing you agree to our{" "}
              <Text style={styles.disclaimerLink}>Terms of Service</Text> and{" "}
              <Text style={styles.disclaimerLink}>Privacy Policy</Text>.
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0F172A" },

  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 20,
  },

  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  appName: {
    fontSize: 52,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -2,
  },

  underline: {
    width: 56,
    height: 4,
    backgroundColor: "#F97316",
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 16,
  },

  tagline: {
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 28,
  },

  featureRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },

  featurePill: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#334155",
  },

  featurePillText: {
    fontSize: 12,
    color: "#94A3B8",
  },

  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },

  googleBtn: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  googleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
  },

  appleBtn: {
    backgroundColor: "#1C1C1E",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },

  appleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },

  disclaimer: {
    fontSize: 11,
    color: "#475569",
    textAlign: "center",
    lineHeight: 16,
    marginTop: 4,
  },

  disclaimerLink: {
    color: "#64748B",
    textDecorationLine: "underline",
  },
});
