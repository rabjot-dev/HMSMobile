
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import {
  useEffect,
  useState,
} from "react";
import {
  useFocusEffect,
} from "@react-navigation/native";

import {
  getAppointments,
} from "../../src/services/appointment.service";
import React from "react";

export default function Appointments() {

  const [appointments,
  setAppointments] =
    useState<any[]>([]);

 useFocusEffect(

  React.useCallback(() => {

    loadAppointments();

  }, [])
);

  const loadAppointments =
  async () => {

    const response =
      await getAppointments();

    setAppointments(
      response.data.data
    );
  };
  const getStatusColor = (
  status: string
) => {

  switch (status) {

    case "BOOKED":
      return "green";

    case "PENDING":
      return "orange";

    case "REJECTED":
      return "red";

    case "CANCELLED":
      return "gray";

    default:
      return "black";
  }
};

 return (

  <View style={{ flex: 1 }}>

    <TouchableOpacity
      onPress={() =>
        router.push("/appointment/book")
      }
      style={{
        padding: 15,
        backgroundColor: "#2563EB",
        margin: 10,
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
        Book Appointment
      </Text>
    </TouchableOpacity>

    <FlatList
      data={appointments}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={
        <Text
          style={{
            textAlign: "center",
            marginTop: 50,
          }}
        >
          No Appointments Found
        </Text>
      }
      renderItem={({ item }) => (

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/appointment/detail",
              params: {
                id: item._id,
              },
            })
          }
          style={{
            margin: 10,
            padding: 15,
            borderWidth: 1,
            borderRadius: 10,
          }}
        >

          <Text>
            Doctor:
          </Text>

         <Text style={{ fontWeight: "bold" }}>
  Dr. {item?.doctorEmployeeId?.name}
</Text>

<Text>
  Slot: {item.timeSlot}
</Text>

<View
  style={{
    backgroundColor:
      getStatusColor(
        item.status
      ),
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 5,
  }}
>
  <Text
    style={{
      color: "white",
      fontWeight: "bold",
    }}
  >
    {item.status}
  </Text>
</View>

        </TouchableOpacity>

      )}
    />

  </View>
);

}