import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const width = Dimensions.get("window").width - 32;

export default function SensorChart({ title, data, keyName }) {
  const labels = data.slice(-6).map((_, idx) => `${idx + 1}`);
  const values = data.slice(-6).map((d) => Number(d[keyName]));

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={{
          labels,
          datasets: [{ data: values.length ? values : [0] }],
        }}
        width={width}
        height={180}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={false}
        chartConfig={{
          backgroundGradientFrom: "#0b1220",
          backgroundGradientTo: "#0b1220",
          decimalPlaces: 1,
          color: () => "#60a5fa",
          labelColor: () => "#94a3b8",
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: "#0b1220", borderRadius: 14, padding: 10 },
  title: { color: "#e2e8f0", fontWeight: "700", marginBottom: 8 },
  chart: { borderRadius: 12 },
});

