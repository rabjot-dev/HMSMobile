import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { navigationRef } from "./src/navigation/RootNavigation";
import AppToast from "./src/components/common/AppToast";
import AppConfirmDialog from "./src/components/common/AppConfirmDialog";

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
      <AppToast />
      <AppConfirmDialog />
    </NavigationContainer>
  );
}
