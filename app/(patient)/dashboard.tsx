import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import { router }
from "expo-router";

import {
  getDashboard,
} from "../../src/services/patient.service";

export default function Dashboard() {

  const [dashboard,
  setDashboard] =
    useState<any>(null);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
  async () => {

    try {

      const response =
        await getDashboard();
 console.log(
      "DASHBOARD RESPONSE",
      response.data
    );
      setDashboard(
        response.data.data
      );

    } catch (error) {

      console.log(
        "DASHBOARD ERROR",
        error
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
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        Welcome
      </Text>

      <Text
        style={{
          fontSize: 18,
          marginBottom: 20,
        }}
      >
        {
          dashboard?.patient
            ?.firstName
        }
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 20,
          marginBottom: 15,
        }}
      >
        <Text>
          Patient ID
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {
            dashboard?.patient
              ?.patientId
          }
        </Text>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 20,
          marginBottom: 15,
        }}
      >
        <Text>
          Pending Appointments
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {
            dashboard
              ?.appointmentSummary
              ?.pending
          }
        </Text>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 20,
          marginBottom: 15,
        }}
      >
        <Text>
          Booked Appointments
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {
            dashboard
              ?.appointmentSummary
              ?.booked
          }
        </Text>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 20,
          marginBottom: 15,
        }}
      >
        <Text>
          Completed Appointments
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {
            dashboard
              ?.appointmentSummary
              ?.completed
          }
        </Text>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 20,
          marginBottom: 15,
        }}
      >
        <Text>
          Upcoming Appointment
        </Text>

        <Text>
          Doctor:
          {" "}
          {
            dashboard
              ?.upcomingAppointment
              ?.doctorEmployeeId
              ?.name
          }
        </Text>

        <Text>
          Date:
          {" "}
          {
            dashboard
              ?.upcomingAppointment
              ?.appointmentDate
          }
        </Text>

        <Text>
          Time:
          {" "}
          {
            dashboard
              ?.upcomingAppointment
              ?.timeSlot
          }
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push(
            "/appointment/book"
          )
        }
        style={{
          backgroundColor:
            "#2563EB",

          padding: 15,

          borderRadius: 10,
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
          Book Appointment
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}