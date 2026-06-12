import { useState } from "react";
import {
  login,
} from "../src/services/auth.service";

import {
  saveToken,
} from "../src/storage/token.storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { router } from "expo-router";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async () => {

     try {

  const response =
    await login(
      email,
      password
    );

  console.log(
    "LOGIN RESPONSE",
    response.data
  );

  const token =
    response.data?.data?.accessToken;
console.log(
  "TOKEN",
  token
);
  await saveToken(
    token
  );

  router.replace(
    "/(patient)/dashboard"
  );

} catch (error: any) {

  console.log(
    "LOGIN ERROR",
    error
  );

  console.log(
    "LOGIN ERROR RESPONSE",
    error?.response?.data
  );

  Alert.alert(
    "Login Failed",
    error?.response?.data?.message ||
    "Unknown Error"
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
        HMS Patient
      </Text>

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

      <TouchableOpacity
        style={
          styles.button
        }
        onPress={
          handleLogin
        }
      >

        <Text
          style={
            styles.buttonText
          }
        >
          Login
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push(
            "/register"
          )
        }
      >

        <Text>
          Create Account
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles =
  StyleSheet.create({

    container: {
      flex: 1,

      justifyContent:
        "center",

      padding: 20,

      backgroundColor:
        "#fff",
    },

    title: {
      fontSize: 30,

      fontWeight: "bold",

      marginBottom: 30,

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

      marginBottom: 20,
    },

    buttonText: {
      color: "#fff",

      fontWeight:
        "bold",
    },
  });