import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

const LOG_TYPES = [
  { key: "fuel", label: "Fuel", emoji: "⛽", color: "#F97316" },
  { key: "oil", label: "Oil Change", emoji: "🛢️", color: "#3B82F6" },
  { key: "service", label: "Service", emoji: "🔧", color: "#8B5CF6" },
  { key: "repair", label: "Repair", emoji: "🔨", color: "#EF4444" },
  { key: "other", label: "Other", emoji: "📋", color: "#6B7280" },
];

const emptyForm = () => ({
  type: "fuel",
  date: new Date().toISOString().slice(0, 10),
  mileage: "",
  cost: "",
  notes: "",
});

export function LogFormModal({
  visible,
  entry,
  isPro,
  logCount,
  freeLimit,
  onSave,
  onClose,
}: any) {
  const [form, setForm] = useState(emptyForm());

  useEffect(() => {
    setForm(
      entry
        ? {
            type: entry.type,
            date: entry.date,
            mileage: entry.mileage,
            cost: entry.cost,
            notes: entry.notes,
          }
        : emptyForm(),
    );
  }, [entry, visible]);

  const handleSave = () => {
    if (!form.mileage || !form.cost) {
      Alert.alert("Missing fields", "Please enter mileage and cost.");
      return;
    }
    if (!isPro && !entry && logCount >= freeLimit) {
      Alert.alert(
        "Free limit reached",
        "Upgrade to Pro for unlimited entries.",
      );
      onClose();
      return;
    }
    onSave(form);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{entry ? "Edit Entry" : "New Entry"}</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.body}>
          <Text style={styles.label}>Type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            {LOG_TYPES.map((t) => (
              <TouchableOpacity
                key={t.key}
                style={[
                  styles.typePill,
                  form.type === t.key && {
                    backgroundColor: t.color,
                    borderColor: t.color,
                  },
                ]}
                onPress={() => setForm((f) => ({ ...f, type: t.key }))}
              >
                <Text style={{ fontSize: 16 }}>{t.emoji}</Text>
                <Text
                  style={[
                    styles.pillLabel,
                    form.type === t.key && { color: "#fff" },
                  ]}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={form.date}
            placeholder="YYYY-MM-DD"
            onChangeText={(v) => setForm((f) => ({ ...f, date: v }))}
          />

          <Text style={styles.label}>Mileage (km)</Text>
          <TextInput
            style={styles.input}
            value={form.mileage}
            placeholder="e.g. 87420"
            keyboardType="numeric"
            onChangeText={(v) => setForm((f) => ({ ...f, mileage: v }))}
          />

          <Text style={styles.label}>Cost ($)</Text>
          <TextInput
            style={styles.input}
            value={form.cost}
            placeholder="e.g. 72.50"
            keyboardType="decimal-pad"
            onChangeText={(v) => setForm((f) => ({ ...f, cost: v }))}
          />

          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, { height: 80, textAlignVertical: "top" }]}
            value={form.notes}
            placeholder="Optional notes..."
            multiline
            onChangeText={(v) => setForm((f) => ({ ...f, notes: v }))}
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F2F2F7" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E5EA",
  },
  title: { fontSize: 17, fontWeight: "600", color: "#0F172A" },
  cancel: { fontSize: 16, color: "#8E8E93" },
  save: { fontSize: 16, color: "#F97316", fontWeight: "600" },
  body: { padding: 16 },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8E8E93",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#0F172A",
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#E5E5EA",
  },
  typePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    marginRight: 8,
    backgroundColor: "#fff",
    gap: 6,
  },
  pillLabel: { fontSize: 13, color: "#0F172A" },
});
