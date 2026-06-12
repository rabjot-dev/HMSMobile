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

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import DateTimePicker
from "@react-native-community/datetimepicker";

import {
  getAppointmentById,
  getAvailableSlots,
  updateMyAppointment,
} from "../../src/services/appointment.service";

export default function EditAppointment() {

  const { id } =
    useLocalSearchParams();

  const [
    appointment,
    setAppointment,
  ] = useState<any>(null);

  const [
    appointmentDate,
    setAppointmentDate,
  ] = useState("");

  const [
    appointmentTime,
    setAppointmentTime,
  ] = useState("");

  const [
    symptoms,
    setSymptoms,
  ] = useState("");

  const [
    slots,
    setSlots,
  ] = useState<string[]>([]);

  const [
    showDatePicker,
    setShowDatePicker,
  ] = useState(false);

  useEffect(() => {

    loadAppointment();

  }, []);

  const loadAppointment =
    async () => {

      try {

        const response =
          await getAppointmentById(
            id as string
          );

        const data =
          response.data.data;

        setAppointment(
          data
        );

        setAppointmentDate(
          data.appointmentDate
            .split("T")[0]
        );

        setAppointmentTime(
          data.timeSlot
        );

        setSymptoms(
          data.symptoms?.[0] || ""
        );

      } catch {

        Alert.alert(
          "Failed to load appointment"
        );
      }
    };

  const loadSlots =
    async () => {

      try {

        const response =
          await getAvailableSlots(

            appointment
              .doctorEmployeeId
              ._id,

            appointmentDate
          );

        setSlots(
          response.data.data
        );

      } catch {

        Alert.alert(
          "Failed to load slots"
        );
      }
    };

  const handleUpdate =
    async () => {

      try {

        await updateMyAppointment(

          id as string,

          {
            appointmentDate,

            appointmentTime,

            symptoms:
              symptoms
                ? [symptoms]
                : [],
          }
        );

        Alert.alert(

          "Success",

          "Appointment updated successfully",

          [
            {
              text: "OK",

              onPress: () =>
                router.back(),
            },
          ]
        );

      } catch (
        error: any
      ) {

        Alert.alert(

          "Failed",

          error?.response
            ?.data
            ?.message ||

          "Update failed"
        );
      }
    };

  if (!appointment) {

    return (

      <Text>
        Loading...
      </Text>

    );
  }

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
        Edit Appointment
      </Text>

      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        Doctor
      </Text>

      <Text
        style={{
          marginBottom: 20,
        }}
      >
        Dr.
        {" "}
        {
          appointment
            ?.doctorEmployeeId
            ?.name
        }
      </Text>

      <Text
        style={{
          fontWeight: "bold",
        }}
      >
        Appointment Date
      </Text>

      <TouchableOpacity
        onPress={() =>
          setShowDatePicker(
            true
          )
        }
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginTop: 10,
        }}
      >

        <Text>
          {appointmentDate}
        </Text>

      </TouchableOpacity>

      {
        showDatePicker && (

          <DateTimePicker
            mode="date"
            value={
              new Date(
                appointmentDate
              )
            }
            minimumDate={
              new Date()
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

                const date =
                  selectedDate
                    .toISOString()
                    .split("T")[0];

                setAppointmentDate(
                  date
                );
              }
            }}
          />

        )
      }

      <TouchableOpacity
        onPress={
          loadSlots
        }
        style={{
          backgroundColor:
            "#2563EB",

          padding: 12,

          borderRadius: 8,

          marginTop: 15,
        }}
      >

        <Text
          style={{
            color: "white",
            textAlign:
              "center",
          }}
        >
          Load Slots
        </Text>

      </TouchableOpacity>

      {
        slots.length > 0 && (

          <>
            <Text
              style={{
                fontWeight:
                  "bold",

                marginTop: 20,

                marginBottom: 10,
              }}
            >
              Available Slots
            </Text>

            {
              slots.map(
                (
                  slot
                ) => (

                  <TouchableOpacity
                    key={slot}
                    onPress={() =>
                      setAppointmentTime(
                        slot
                      )
                    }
                    style={{
                      borderWidth: 1,

                      borderColor:
                        "#ccc",

                      padding: 10,

                      borderRadius: 8,

                      marginBottom: 8,

                      backgroundColor:
                        appointmentTime ===
                        slot

                          ? "#2563EB"

                          : "#fff",
                    }}
                  >

                    <Text
                      style={{
                        color:
                          appointmentTime ===
                          slot

                            ? "#fff"

                            : "#000",
                      }}
                    >
                      {slot}
                    </Text>

                  </TouchableOpacity>
                )
              )
            }
          </>
        )
      }

      <Text
        style={{
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        Symptoms
      </Text>

      <TextInput
        value={symptoms}
        onChangeText={
          setSymptoms
        }
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 8,
          marginTop: 10,
          minHeight: 80,
        }}
      />

      <TouchableOpacity
        onPress={
          handleUpdate
        }
        style={{
          backgroundColor:
            "green",

          padding: 15,

          borderRadius: 8,

          marginTop: 25,

          marginBottom: 40,
        }}
      >

        <Text
          style={{
            color: "#fff",

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
