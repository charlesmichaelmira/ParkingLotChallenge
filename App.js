import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AsyncStorage from "@react-native-async-storage/async-storage";

/* Redux */
import { Provider } from "react-redux";
import store from "./src/redux/store";

import Dashboard from "./src/screens/Dashboard";
import ParkingScreen from "./src/screens/ParkingScreen";
import PaymentScreen from "./src/screens/PaymentScreen";

// import { PARKING_LOT_MAP } from "./src/constants/Enums";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="XYZ Corp. Parking Lot"
            component={Dashboard}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ParkingScreen"
            component={ParkingScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            // options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
