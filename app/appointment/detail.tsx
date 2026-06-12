import {
  View,
  Text,TouchableOpacity, Alert,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import {
    router,
  useLocalSearchParams,
} from "expo-router";

import {
  getAppointmentById, cancelAppointment
} from "../../src/services/appointment.service";

export default function AppointmentDetails() {

  const { id } =
    useLocalSearchParams();

  const [appointment,
  setAppointment] =
    useState<any>(null);

  useEffect(() => {

    loadAppointment();

  }, []);

  const loadAppointment =
  async () => {

    const response =
      await getAppointmentById(
        id as string
      );

    setAppointment(
      response.data.data
    );
  };
  const handleCancel =
async () => {

  try {

    await cancelAppointment(
      id as string
    );

    Alert.alert(
      "Success",
      "Appointment cancelled"
    );

  } catch {

    Alert.alert(
      "Error"
    );
  }
};


  return (

    <View
      style={{
        padding: 20,
      }}
    >

      <Text>
        Doctor
      </Text>

      <Text>
        {
          appointment
            ?.doctorEmployeeId
            ?.name
        }
      </Text>

      <Text>
        Date
      </Text>

      <Text>
        {
          appointment
            ?.appointmentDate
        }
      </Text>

      <Text>
        Time
      </Text>

      <Text>
        {
          appointment
            ?.timeSlot
        }
      </Text>

      <Text>
        Status
      </Text>

      <Text>
        {
          appointment
            ?.status
        }
      </Text>
{
  (
    appointment?.status === "PENDING" ||
    appointment?.status === "BOOKED"
  ) && (

    <TouchableOpacity
      onPress={handleCancel}
      style={{
        backgroundColor: "red",
        padding: 15,
        marginTop: 20,
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
        Cancel Appointment
      </Text>
    </TouchableOpacity>

  )
}
{
  appointment?.status ===
  "PENDING" && (

    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname:
            "/appointment/edit",

          params: {
            id:
              appointment._id,
          },
        })
      }
    >

      <Text>
        Edit Appointment
      </Text>

    </TouchableOpacity>

  )
}

    </View>
  );
}
