import {
  View,
  Text, TouchableOpacity
} from "react-native";

import {
  useEffect,
  useState,
} from "react";
import {
  removeToken,
} from "../../src/storage/token.storage";

import {
  router,
} from "expo-router";
import {
  getProfile,
} from "../../src/services/patient.service";

export default function Profile() {

  const [profile,
  setProfile] =
    useState<any>(null);

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile =
  async () => {

    try {

      const response =
        await getProfile();

      setProfile(
        response.data.data
      );

    } catch (error) {

      console.log(error);
    }
  };
const logout =
async () => {

  await removeToken();

  router.replace(
    "/login"
  );
};
  return (

    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <Text>
        Patient ID:
      </Text>

      <Text>
        {profile?.patientId}
      </Text>

      <Text>
        First Name:
      </Text>

      <Text>
        {profile?.firstName}
      </Text>

      <Text>
        Last Name:
      </Text>

      <Text>
        {profile?.lastName}
      </Text>

      <Text>
        Email:
      </Text>

      <Text>
        {profile?.email}
      </Text>

      <Text>
        Phone:
      </Text>

      <Text>
        {profile?.phone}
      </Text>
      <TouchableOpacity
  onPress={logout}
  style={{
    marginTop: 30,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
  }}
>
  <Text
    style={{
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
    }}
  >
    Logout
  </Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() =>
    router.push(
      "/profile/edit"
    )
  }
  style={{
    backgroundColor:
      "#2563EB",

    padding: 12,

    borderRadius: 8,

    marginTop: 20,
  }}
>
  <Text
    style={{
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
    }}
  >
    Edit Profile
  </Text>
</TouchableOpacity>

    </View>
  );
}