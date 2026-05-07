import { StyleSheet, Text, View } from "react-native";

const severityColor = {
  LOW: "#1d4ed8",
  MEDIUM: "#ca8a04",
  HIGH: "#ea580c",
  CRITICAL: "#dc2626",
};

export default function AlertCard({ alert }) {
  return (
    <View style={[styles.card, { borderColor: severityColor[alert.severity] || "#475569" }]}>
      <Text style={styles.title}>{alert.hvacName}</Text>
      <Text style={styles.meta}>
        {alert.severity} | Confidence {Math.round(alert.confidence * 100)}%
      </Text>
      <Text style={styles.body}>{alert.explanation}</Text>
      <Text style={styles.recommend}>Action: {alert.recommendation}</Text>
      <Text style={styles.time}>{new Date(alert.createdAt).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1.5, borderRadius: 12, backgroundColor: "#0b1220", padding: 12, gap: 6 },
  title: { color: "#f8fafc", fontWeight: "700", fontSize: 16 },
  meta: { color: "#cbd5e1", fontSize: 12 },
  body: { color: "#e2e8f0", fontSize: 13 },
  recommend: { color: "#93c5fd", fontSize: 13 },
  time: { color: "#64748b", fontSize: 11 },
});

