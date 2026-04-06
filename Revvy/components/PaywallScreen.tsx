import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

const FEATURES = [
  { emoji: "📋", text: "Unlimited log entries" },
  { emoji: "🚗", text: "Unlimited vehicles" },
  { emoji: "🔔", text: "Service due reminders" },
  { emoji: "📜", text: "Full maintenance history" },
  { emoji: "📄", text: "PDF export for resale" },
];

export function PaywallScreen({ onClose, onSuccess }: any) {
  const [loading, setLoading] = useState(false);

  const purchase = async (productId: string) => {
    setLoading(true);
    try {
      // PRODUCTION:
      // const offerings = await Purchases.getOfferings();
      // const pkg = offerings.current?.availablePackages.find(p => p.product.identifier === productId);
      // if (pkg) await Purchases.purchasePackage(pkg);
      // const info = await Purchases.getCustomerInfo();
      // if (info.entitlements.active['pro']) onSuccess();
      await new Promise((r) => setTimeout(r, 1000));
      onSuccess();
      Alert.alert("Welcome to Revvy Pro! 🎉", "All features are now unlocked.");
    } catch {
      Alert.alert("Purchase failed", "Please try again.");
    }
    setLoading(false);
  };

  const restore = async () => {
    setLoading(true);
    try {
      // PRODUCTION: const info = await Purchases.restorePurchases();
      await new Promise((r) => setTimeout(r, 800));
      Alert.alert("Restored", "No previous purchases found.");
    } catch {
      Alert.alert("Restore failed", "Please try again.");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.emoji}>🚗</Text>
        <Text style={styles.title}>Unlock Revvy Pro</Text>
        <Text style={styles.sub}>
          Everything you need to maintain and protect your cars value.
        </Text>

        <View style={styles.featuresCard}>
          {FEATURES.map((f) => (
            <View key={f.text} style={styles.featureRow}>
              <View style={styles.check}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
              <Text style={styles.featureText}>
                {f.emoji} {f.text}
              </Text>
            </View>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator
            color="#F97316"
            size="large"
            style={{ marginVertical: 32 }}
          />
        ) : (
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.annualBtn}
              onPress={() => purchase("revvy_pro_annual")}
            >
              <View style={styles.badge}>
                <Text style={styles.badgeText}>BEST VALUE</Text>
              </View>
              <Text style={styles.annualPrice}>$24.99 / year</Text>
              <Text style={styles.annualSub}>Just $2.08/mo · Save 48%</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.monthlyBtn}
              onPress={() => purchase("revvy_pro_monthly")}
            >
              <Text style={styles.monthlyText}>$3.99 / month</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={restore} style={{ marginTop: 4 }}>
              <Text style={styles.restoreText}>Restore purchases</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0F172A" },
  scroll: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  closeBtn: {
    position: "absolute",
    top: 56,
    right: 20,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: { color: "#94A3B8", fontSize: 14 },
  emoji: { fontSize: 56, marginBottom: 16 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  sub: {
    fontSize: 15,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },

  featuresCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    gap: 14,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#334155",
  },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: { color: "#fff", fontSize: 12, fontWeight: "800" },
  featureText: { fontSize: 15, color: "#E2E8F0" },

  buttons: { width: "100%", gap: 12 },
  annualBtn: {
    backgroundColor: "#F97316",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#F97316",
    letterSpacing: 1,
  },
  annualPrice: { fontSize: 22, fontWeight: "800", color: "#fff" },
  annualSub: { fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 3 },

  monthlyBtn: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  monthlyText: { fontSize: 16, fontWeight: "600", color: "#fff" },
  restoreText: { textAlign: "center", color: "#64748B", fontSize: 13 },
});
