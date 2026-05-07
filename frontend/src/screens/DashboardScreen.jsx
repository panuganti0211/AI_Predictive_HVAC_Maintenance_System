import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import HVACCard from "../components/HVACCard.jsx";
import { useAppContext } from "../context/AppContext.jsx";

export default function DashboardScreen({ navigation }) {
  const { hvacUnits, loading, error, refreshAll, darkMode, toggleDarkMode } = useAppContext();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Alerts")}>
          <Text style={styles.buttonText}>View Alerts</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Assistant")}>
          <Text style={styles.buttonText}>AI Assistant</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => void refreshAll()}>
          <Text style={styles.buttonText}>Refresh</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={toggleDarkMode}>
          <Text style={styles.buttonText}>{darkMode ? "Dark Mode" : "Light Mode"}</Text>
        </Pressable>
      </View>

      {loading ? <ActivityIndicator size="large" color="#60a5fa" /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {hvacUnits.map((unit) => (
        <HVACCard key={unit.id} item={unit} onPress={() => navigation.navigate("HVACDetail", { hvacId: unit.id })} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, gap: 10 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  button: { backgroundColor: "#1d4ed8", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7 },
  buttonText: { color: "#e2e8f0", fontWeight: "600" },
  error: { color: "#fca5a5", fontSize: 14 },
});

