import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker
from "@react-native-community/datetimepicker";
import { router } from "expo-router";

import {
  useEffect,
  useState,
} from "react";

import {
  getDoctors,
} from "../../src/services/employee.service";

import {
  getAvailableSlots,
  bookAppointment,
} from "../../src/services/appointment.service";

export default function BookAppointment() {

  const [doctors, setDoctors] =
    useState<any[]>([]);

  const [
    selectedDepartment,
    setSelectedDepartment,
  ] = useState("");

  const [doctorId, setDoctorId] =
    useState("");

  const [
    appointmentDate,
    setAppointmentDate,
  ] = useState("");

  const [
    appointmentTime,
    setAppointmentTime,
  ] = useState("");

  const [symptoms, setSymptoms] =
    useState("");

  const [slots, setSlots] =
    useState<string[]>([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors =
    async () => {

      try {

        const response =
          await getDoctors();

        setDoctors(
          response.data.data
        );

      } catch (error) {

        console.log(
          "DOCTOR ERROR",
          error
        );

        Alert.alert(
          "Failed to load doctors"
        );
      }
    };

  const departments = [
    ...new Set(
      doctors.map(
        (doctor) =>
          doctor.department
      )
    ),
  ];

  const filteredDoctors =
    doctors.filter(
      (doctor) =>
        doctor.department ===
        selectedDepartment
    );

  const loadSlots =
    async () => {

      try {

        if (
          !doctorId ||
          !appointmentDate
        ) {

          Alert.alert(
            "Please select doctor and date"
          );

          return;
        }

        const response =
          await getAvailableSlots(
            doctorId,
            appointmentDate
          );

        setSlots(
          response.data.data
        );

      } catch (
        error: any
      ) {

        Alert.alert(
          "Failed",
          error?.response?.data
            ?.message ||
            "Failed to load slots"
        );
      }
    };
    const [showDatePicker,
setShowDatePicker] =
useState(false);

  const handleBookAppointment =
    async () => {

      try {

        if (
          !doctorId ||
          !appointmentDate ||
          !appointmentTime
        ) {

          Alert.alert(
            "Please fill all required fields"
          );

          return;
        }

        await bookAppointment({

          doctorId,

          appointmentDate,

          appointmentTime,

          symptoms:
            symptoms.trim()
              ? [symptoms]
              : [],
        });

        Alert.alert(
          "Success",
          "Appointment request sent",
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
          error?.response?.data
            ?.message ||
            "Booking failed"
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
        Book Appointment
      </Text>

      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Select Department
      </Text>

      {
        departments.map(
          (department) => (

            <TouchableOpacity
              key={department}
              onPress={() => {

                setSelectedDepartment(
                  department
                );

                setDoctorId("");

                setSlots([]);

                setAppointmentTime("");
              }}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 12,
                borderRadius: 8,
                marginBottom: 10,

                backgroundColor:
                  selectedDepartment ===
                  department
                    ? "#2563EB"
                    : "#fff",
              }}
            >

              <Text
                style={{
                  color:
                    selectedDepartment ===
                    department
                      ? "#fff"
                      : "#000",

                  fontWeight: "600",
                }}
              >
                {department}
              </Text>

            </TouchableOpacity>
          )
        )
      }

      {
        selectedDepartment && (

          <>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              Select Doctor
            </Text>

            {
              filteredDoctors.map(
                (doctor) => (

                  <TouchableOpacity
                    key={doctor._id}
                    onPress={() =>
                      setDoctorId(
                        doctor._id
                      )
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      padding: 12,
                      borderRadius: 8,
                      marginBottom: 10,

                      backgroundColor:
                        doctorId ===
                        doctor._id
                          ? "#2563EB"
                          : "#fff",
                    }}
                  >

                    <Text
                      style={{
                        fontWeight: "bold",

                        color:
                          doctorId ===
                          doctor._id
                            ? "#fff"
                            : "#000",
                      }}
                    >
                      Dr. {doctor.name}
                    </Text>

                    <Text
                      style={{
                        color:
                          doctorId ===
                          doctor._id
                            ? "#fff"
                            : "#666",
                      }}
                    >
                      {
                        doctor.specialization
                      }
                    </Text>

                    <Text
                      style={{
                        color:
                          doctorId ===
                          doctor._id
                            ? "#fff"
                            : "#666",
                      }}
                    >
                      Fee: ₹
                      {
                        doctor.consultationFee
                      }
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
        Appointment Date
      </Text>

      <TouchableOpacity
  onPress={() =>
    setShowDatePicker(true)
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
    {
      appointmentDate ||
      "Select Date"
    }
  </Text>
</TouchableOpacity>
{
  showDatePicker && (

    <DateTimePicker
      mode="date"
      value={new Date()}
      minimumDate={new Date()}
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
        onPress={loadSlots}
        style={{
          backgroundColor: "#2563EB",
          padding: 12,
          borderRadius: 8,
          marginTop: 15,
        }}
      >

        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Load Available Slots
        </Text>

      </TouchableOpacity>

      {
        slots.length > 0 && (

          <>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              Available Slots
            </Text>

            {
              slots.map(
                (slot) => (

                  <TouchableOpacity
                    key={slot}
                    onPress={() =>
                      setAppointmentTime(
                        slot
                      )
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
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
        placeholder="Enter symptoms"
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
          handleBookAppointment
        }
        style={{
          backgroundColor: "green",
          padding: 15,
          borderRadius: 8,
          marginTop: 25,
          marginBottom: 40,
        }}
      >

        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Book Appointment
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}