import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import AlertCard from "../components/AlertCard.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const severities = ["ALL", "LOW", "MEDIUM", "HIGH", "CRITICAL"];

export default function AlertsScreen() {
  const { alerts } = useAppContext();
  const [filter, setFilter] = useState("ALL");

  const filtered = useMemo(() => {
    if (filter === "ALL") return alerts;
    return alerts.filter((a) => a.severity === filter);
  }, [alerts, filter]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Prioritized Alerts</Text>
      <View style={styles.filters}>
        {severities.map((item) => (
          <Pressable
            key={item}
            style={[styles.chip, filter === item && styles.activeChip]}
            onPress={() => setFilter(item)}
          >
            <Text style={styles.chipText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      {filtered.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}

      {!filtered.length ? <Text style={styles.empty}>No alerts for selected filter.</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, gap: 10 },
  heading: { color: "#f8fafc", fontSize: 20, fontWeight: "700" },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: { backgroundColor: "#334155", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14 },
  activeChip: { backgroundColor: "#2563eb" },
  chipText: { color: "#f1f5f9", fontSize: 12 },
  empty: { color: "#94a3b8", marginTop: 12 },
});

