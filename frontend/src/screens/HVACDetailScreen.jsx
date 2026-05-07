import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";

import AIInsightBox from "../components/AIInsightBox.jsx";
import RecommendationPanel from "../components/RecommendationPanel.jsx";
import SensorChart from "../components/SensorChart.jsx";
import { useAppContext } from "../context/AppContext.jsx";

export default function HVACDetailScreen({ route }) {
  const { hvacUnits, alerts, loading } = useAppContext();
  const unit = hvacUnits.find((u) => u.id === route.params.hvacId);
  const latestAlert = alerts.find((a) => a.hvacId === route.params.hvacId);

  if (loading || !unit) return <ActivityIndicator style={{ marginTop: 30 }} color="#60a5fa" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {unit.name} | {unit.healthStatus}
      </Text>
      <Text style={styles.meta}>Location: {unit.location}</Text>

      <SensorChart title="Temperature Trend" data={unit.sensors} keyName="temperature" />
      <SensorChart title="Airflow Trend" data={unit.sensors} keyName="airflow" />
      <SensorChart title="Vibration Trend" data={unit.sensors} keyName="vibration" />
      <SensorChart title="Pressure Trend" data={unit.sensors} keyName="pressure" />

      <AIInsightBox insight={unit.latestInsight} confidence={latestAlert?.confidence ?? 0.65} />
      <RecommendationPanel
        recommendation={latestAlert?.recommendation ?? "No critical recommendation yet."}
        urgency={latestAlert?.urgency ?? "Routine monitoring"}
        checklist={latestAlert?.inspectionChecklist ?? ["Check dashboard for new alerts", "Confirm sensors are online"]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, gap: 12 },
  title: { color: "#f8fafc", fontWeight: "700", fontSize: 20 },
  meta: { color: "#94a3b8", fontSize: 14 },
});

