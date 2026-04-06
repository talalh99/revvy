import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LogCard } from "@/components/LogCard";
import { StatCard } from "@/components/StatCard";
import { LogFormModal } from "@/components/LogFormModal";
import { useLogs } from "@/hooks/useLogs";

const FREE_LIMIT = 10;

export default function HomeScreen() {
  const { logs, addLog, editLog, deleteLog, isPro, setIsPro } = useLogs();
  const [modalVisible, setModalVisible] = useState(false);
  const [editEntry, setEditEntry] = useState<any>(null);

  const totalSpend = logs.reduce((s, l) => s + parseFloat(l.cost || "0"), 0);
  const totalFuel = logs
    .filter((l) => l.type === "fuel")
    .reduce((s, l) => s + parseFloat(l.cost || "0"), 0);
  const lastMileage = logs.length
    ? Math.max(...logs.map((l) => parseFloat(l.mileage || "0")))
    : 0;
  const lastOil = [...logs]
    .filter((l) => l.type === "oil")
    .sort((a, b) => b.date.localeCompare(a.date))[0];
  const oilGap = lastOil
    ? lastMileage - parseFloat(lastOil.mileage || "0")
    : null;
  const showOilReminder = oilGap !== null && oilGap >= 4500;
  const recentLogs = [...logs]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const openAdd = () => {
    setEditEntry(null);
    setModalVisible(true);
  };
  const openEdit = (entry: any) => {
    setEditEntry(entry);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>revvy</Text>
            <Text style={styles.headerSub}>My Vehicle</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            {!isPro && (
              <TouchableOpacity style={styles.proChip}>
                <Text style={styles.proChipText}>Go Pro</Text>
              </TouchableOpacity>
            )}
            <Text style={{ fontSize: 22 }}>👤</Text>
          </View>
        </View>

        {showOilReminder && (
          <View style={styles.reminder}>
            <Text style={{ fontSize: 16 }}>⚠️</Text>
            <Text style={styles.reminderText}>
              Oil change due — {oilGap?.toFixed(0)} km since last change
            </Text>
          </View>
        )}

        {!isPro && (
          <TouchableOpacity style={styles.freeBanner}>
            <Text style={styles.freeBannerText}>
              Free plan: {logs.length}/{FREE_LIMIT} entries used ·{" "}
              <Text style={{ fontWeight: "700" }}>Upgrade for unlimited →</Text>
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.statsRow}>
          <StatCard label="Total spent" value={`$${totalSpend.toFixed(0)}`} />
          <StatCard label="Fuel costs" value={`$${totalFuel.toFixed(0)}`} />
          <StatCard
            label="Mileage"
            value={lastMileage > 0 ? lastMileage.toLocaleString() : "—"}
          />
        </View>

        <Text style={styles.sectionTitle}>Recent logs</Text>
        {recentLogs.length === 0 && (
          <Text style={styles.empty}>No entries yet. Tap + to add one.</Text>
        )}
        {recentLogs.map((log) => (
          <LogCard
            key={log.id}
            entry={log}
            onEdit={openEdit}
            onDelete={deleteLog}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={openAdd}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <LogFormModal
        visible={modalVisible}
        entry={editEntry}
        isPro={isPro}
        logCount={logs.length}
        freeLimit={FREE_LIMIT}
        onSave={(data: any) => {
          if (editEntry) editLog({ ...data, id: editEntry.id });
          else addLog(data);
          setModalVisible(false);
        }}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F2F2F7" },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E5EA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -1,
  },
  headerSub: { fontSize: 13, color: "#8E8E93", marginTop: 2 },
  proChip: {
    backgroundColor: "#F97316",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  proChipText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  reminder: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFF3CD",
    margin: 16,
    padding: 12,
    borderRadius: 10,
  },
  reminderText: { flex: 1, fontSize: 13, color: "#854F0B" },
  freeBanner: {
    backgroundColor: "#FFF7ED",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  freeBannerText: { fontSize: 13, color: "#9A3412", textAlign: "center" },
  statsRow: { flexDirection: "row", padding: 16, gap: 10 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  empty: { textAlign: "center", color: "#8E8E93", padding: 32, fontSize: 14 },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: { color: "#fff", fontSize: 32, lineHeight: 36 },
});
