import { useState } from "react";
import { registerPatient } from "../src/services/patient.service";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

export default function Register() {

  const [firstName,
  setFirstName] =
    useState("");

  const [lastName,
  setLastName] =
    useState("");

  const [email,
  setEmail] =
    useState("");

  const [phone,
  setPhone] =
    useState("");

  const [password,
  setPassword] =
    useState("");

  const [confirmPassword,
  setConfirmPassword] =
    useState("");

  const handleRegister =
async () => {

  try {

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {

      Alert.alert(
        "Validation",
        "All fields are required"
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {

      Alert.alert(
        "Validation",
        "Passwords do not match"
      );

      return;
    }

    await registerPatient({

  firstName,

  lastName,

  email,

  phone,

  password,

  confirmPassword,
});

    Alert.alert(
      "Success",
      "Registration successful"
    );

    router.replace(
      "/login"
    );

  } catch (error: any) {

    Alert.alert(
      "Registration Failed",

      error?.response?.data?.message ||
      "Something went wrong"
    );
  }
};

  return (

    <View
      style={
        styles.container
      }
    >

      <Text
        style={
          styles.title
        }
      >
        Create Account
      </Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={
          setFirstName
        }
        style={
          styles.input
        }
      />

      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={
          setLastName
        }
        style={
          styles.input
        }
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={
          setEmail
        }
        style={
          styles.input
        }
      />

      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={
          setPhone
        }
        style={
          styles.input
        }
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={
          setPassword
        }
        style={
          styles.input
        }
      />

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={
          setConfirmPassword
        }
        style={
          styles.input
        }
      />

      <TouchableOpacity
        style={
          styles.button
        }
        onPress={
          handleRegister
        }
      >
        <Text
          style={
            styles.buttonText
          }
        >
          Register
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles =
StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    justifyContent:
      "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign:
      "center",
  },

  input: {
    borderWidth: 1,
    borderColor:
      "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor:
      "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems:
      "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight:
      "bold",
  },
});