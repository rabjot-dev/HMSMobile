import { Tabs } from "expo-router";

export default function PatientLayout() {

  return (
    <Tabs>

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />

    </Tabs>
  );
}