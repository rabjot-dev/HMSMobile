import {
  useEffect,
} from "react";

import {
  View,
  ActivityIndicator,
} from "react-native";

import {
  getToken,
} from "../storage/token.storage";

import {
  getCurrentUser,
} from "../services/auth.service";

export default function SplashScreen({
  navigation,
}: any) {
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth =
    async () => {
      try {
        const token =
          await getToken();

        if (!token) {
          navigation.replace(
            "Login"
          );

          return;
        }

        await getCurrentUser();

        navigation.replace(
          "PatientTabs"
        );
      } catch {
        navigation.replace(
          "Login"
        );
      }
    };

  return (
    <View
      style={{
        flex: 1,
        justifyContent:
          "center",
        alignItems:
          "center",
      }}
    >
      <ActivityIndicator
        size="large"
      />
    </View>
  );
}