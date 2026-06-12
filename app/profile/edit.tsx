import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import DateTimePicker
from "@react-native-community/datetimepicker";

import {
  router,
} from "expo-router";

import {
  getProfile,
  updateProfile,
} from "../../src/services/patient.service";

export default function EditProfile() {

  const [showDatePicker,
  setShowDatePicker] =
    useState(false);

  const [dateOfBirth,
  setDateOfBirth] =
    useState("");

  const [gender,
  setGender] =
    useState("");

  const [bloodGroup,
  setBloodGroup] =
    useState("");

  const [maritalStatus,
  setMaritalStatus] =
    useState("");

  const [address,
  setAddress] =
    useState("");

  const [city,
  setCity] =
    useState("");

  const [state,
  setState] =
    useState("");

  const [country,
  setCountry] =
    useState("");

  const [pincode,
  setPincode] =
    useState("");

  const [emergencyContactName,
  setEmergencyContactName] =
    useState("");

  const [emergencyContactPhone,
  setEmergencyContactPhone] =
    useState("");

  const [relationship,
  setRelationship] =
    useState("");
    const [allergies,
setAllergies] =
  useState("");

const [chronicDiseases,
setChronicDiseases] =
  useState("");

const [currentMedications,
setCurrentMedications] =
  useState("");

const [pastSurgeries,

setPastSurgeries] =
  useState("");

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile =
  async () => {

    try {

      const response =
        await getProfile();

      const profile =
        response.data.data;

      if (
        profile.dateOfBirth
      ) {

        setDateOfBirth(
          profile.dateOfBirth
            .split("T")[0]
        );
      }

      setGender(
        profile.gender || ""
      );

      setBloodGroup(
        profile.bloodGroup || ""
      );

      setMaritalStatus(
        profile.maritalStatus || ""
      );

      setAddress(
        profile.address || ""
      );

      setCity(
        profile.city || ""
      );

      setState(
        profile.state || ""
      );

      setCountry(
        profile.country || ""
      );

      setPincode(
        profile.pincode || ""
      );

      setEmergencyContactName(
        profile.emergencyContactName || ""
      );

      setEmergencyContactPhone(
        profile.emergencyContactPhone || ""
      );

      setRelationship(
        profile.relationship || ""
      );
      setAllergies(
  profile.allergies?.join(", ")
  || ""
);

setChronicDiseases(
  profile.chronicDiseases?.join(", ")
  || ""
);

setCurrentMedications(
  profile.currentMedications?.join(", ")
  || ""
);

setPastSurgeries(
  profile.pastSurgeries?.join(", ")
  || ""
);

    } catch {

      Alert.alert(
        "Failed to load profile"
      );
    }
  };
  const handleSave =
async () => {

  try {

    await updateProfile({

      dateOfBirth,

      gender,

      bloodGroup,

      maritalStatus,

      address,

      city,

      state,

      country,

      pincode,

      emergencyContactName,

      emergencyContactPhone,

      relationship,

      allergies:
        allergies
          ? allergies
              .split(",")
              .map(item =>
                item.trim()
              )
          : [],

      chronicDiseases:
        chronicDiseases
          ? chronicDiseases
              .split(",")
              .map(item =>
                item.trim()
              )
          : [],

      currentMedications:
        currentMedications
          ? currentMedications
              .split(",")
              .map(item =>
                item.trim()
              )
          : [],

      pastSurgeries:
        pastSurgeries
          ? pastSurgeries
              .split(",")
              .map(item =>
                item.trim()
              )
          : [],
    });

    Alert.alert(

      "Success",

      "Profile updated successfully",

      [
        {
          text: "OK",

          onPress: () =>
            router.back(),
        },
      ]
    );

  } catch {

    Alert.alert(
      "Failed to update profile"
    );
  }
};

  return (

    <ScrollView
      style={{
        flex: 1,
        padding: 20,
      }}
    >

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Edit Profile
      </Text>

      <Text>
        Date Of Birth
      </Text>

      <TouchableOpacity
        onPress={() =>
          setShowDatePicker(
            true
          )
        }
        style={{
          borderWidth: 1,
          padding: 12,
          marginTop: 10,
          marginBottom: 15,
        }}
      >
        <Text>
          {
            dateOfBirth ||
            "Select Date"
          }
        </Text>
      </TouchableOpacity>

      {
        showDatePicker && (

          <DateTimePicker
            mode="date"
            value={
              dateOfBirth
                ? new Date(
                    dateOfBirth
                  )
                : new Date()
            }
            onChange={(
              event,
              selectedDate
            ) => {

              setShowDatePicker(
                false
              );

              if (
                selectedDate
              ) {

                setDateOfBirth(
                  selectedDate
                    .toISOString()
                    .split("T")[0]
                );
              }
            }}
          />

        )
      }

      <TextInput
        placeholder="Gender"
        value={gender}
        onChangeText={
          setGender
        }
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Blood Group"
        value={bloodGroup}
        onChangeText={
          setBloodGroup
        }
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Marital Status"
        value={maritalStatus}
        onChangeText={
          setMaritalStatus
        }
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={
          setAddress
        }
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="City"
        value={city}
        onChangeText={
          setCity
        }
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="State"
        value={state}
        onChangeText={
          setState
        }
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Country"
        value={country}
        onChangeText={
          setCountry
        }
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Pincode"
        value={pincode}
        onChangeText={
          setPincode
        }
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Emergency Contact Name"
        value={
          emergencyContactName
        }
        onChangeText={
          setEmergencyContactName
        }
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Emergency Contact Phone"
        value={
          emergencyContactPhone
        }
        onChangeText={
          setEmergencyContactPhone
        }
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Relationship"
        value={
          relationship
        }
        onChangeText={
          setRelationship
        }
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
        }}
      />
      <Text
  style={{
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  }}
>
  Medical Information
</Text>

<TextInput
  placeholder="Allergies"
  value={allergies}
  onChangeText={
    setAllergies
  }
  style={{
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
  }}
/>

<TextInput
  placeholder="Chronic Diseases"
  value={
    chronicDiseases
  }
  onChangeText={
    setChronicDiseases
  }
  style={{
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
  }}
/>

<TextInput
  placeholder="Current Medications"
  value={
    currentMedications
  }
  onChangeText={
    setCurrentMedications
  }
  style={{
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
  }}
/>

<TextInput
  placeholder="Past Surgeries"
  value={
    pastSurgeries
  }
  onChangeText={
    setPastSurgeries
  }
  style={{
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
  }}
/>
      <TouchableOpacity
  onPress={
    handleSave
  }
  style={{
    backgroundColor:
      "green",

    padding: 15,

    borderRadius: 8,

    marginBottom: 40,
  }}
>
  <Text
    style={{
      color: "white",

      textAlign:
        "center",

      fontWeight:
        "bold",
    }}
  >
    Save Changes
  </Text>
</TouchableOpacity>

</ScrollView>
);
}