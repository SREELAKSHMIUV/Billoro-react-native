import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { loginUser } from "../services/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function LoginScreen() {

  const [passwordVisible, setPasswordVisible] =
    useState(false);

  const [identifier, setIdentifier] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleLogin = async () => {

    try {

      setLoading(true);

      setErrorMessage("");

      const response =
  await loginUser(
    identifier,
    password
  );

console.log(
  "LOGIN RESPONSE:",
  response
);

await AsyncStorage.setItem(
  "token",
  response.access_token
);

console.log(
  "TOKEN SAVED:",
  response.access_token
);

router.push("/home");

    } catch (error: any) {

      console.log(error);

      setErrorMessage(
        "Incorrect email or password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* Logo */}
        <View style={styles.logoRow}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>B</Text>
          </View>

          <Text style={styles.logoName}>Billoro</Text>
        </View>

        {/* Heading */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Welcome back
          </Text>

          <Text style={styles.subHeading}>
            Sign in to your shop dashboard.
          </Text>
        </View>

        {/* Error Box */}
        {errorMessage ? (
          <View style={styles.errorBox}>
            <Ionicons
              name="alert-circle-outline"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.errorText}>
              {errorMessage}
            </Text>
          </View>
        ) : null}

        {/* Email */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>
            Email
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#6B7280"
            />

            <TextInput
              placeholder="owner@billoro.app"
              placeholderTextColor="#6B7280"
              style={styles.input}
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>
            Password
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#6B7280"
            />

            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#6B7280"
              secureTextEntry={!passwordVisible}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              passwordRules="minlength: 1;"
            />

            <TouchableOpacity
              onPress={() =>
                setPasswordVisible(
                  !passwordVisible
                )
              }
            >
              <Ionicons
                name={
                  passwordVisible
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() =>
            router.push(
              "/forgot-password"
            )
          }
        >
          <Text style={styles.forgotText}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.signInText}>
            {loading
              ? "Signing in..."
              : "Sign in"}
          </Text>
        </TouchableOpacity>

        {/* Bottom */}
        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>
            New to Billoro?
          </Text>

          <TouchableOpacity>
            <Text style={styles.createText}>
              {" "}Create account
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },

  container: {
    paddingHorizontal: 26,
    paddingTop: 30,
    paddingBottom: 40,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },

  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0F7A4F",
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  logoName: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },

  headingContainer: {
    marginBottom: 36,
  },

  heading: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#111827",
  },

  subHeading: {
    marginTop: 10,
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
  },

  errorBox: {
    backgroundColor: "#DC2626",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  errorText: {
    color: "white",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "600",
  },

  inputSection: {
    marginBottom: 22,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 10,
  },

  inputContainer: {
    height: 64,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 32,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#111827",
  },

  forgotText: {
    textAlign: "right",
    color: "#0F7A4F",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 34,
  },

  signInButton: {
    backgroundColor: "#0F7A4F",
    height: 62,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  signInText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 26,
  },

  bottomText: {
    color: "#6B7280",
    fontSize: 15,
  },

  createText: {
    color: "#0F7A4F",
    fontSize: 15,
    fontWeight: "bold",
  },
});