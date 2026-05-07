import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AlertsScreen from "../screens/AlertsScreen.jsx";
import AssistantScreen from "../screens/AssistantScreen.jsx";
import DashboardScreen from "../screens/DashboardScreen.jsx";
import HVACDetailScreen from "../screens/HVACDetailScreen.jsx";

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#0f172a" },
      headerTintColor: "#e2e8f0",
      contentStyle: { backgroundColor: "#020617" },
    }}
  >
    <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: "HVAC Dashboard" }} />
    <Stack.Screen name="HVACDetail" component={HVACDetailScreen} options={{ title: "System Details" }} />
    <Stack.Screen name="Alerts" component={AlertsScreen} />
    <Stack.Screen name="Assistant" component={AssistantScreen} />
  </Stack.Navigator>
);

export default AppNavigator;

