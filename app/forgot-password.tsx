import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { router } from "expo-router";

import {
  forgotPassword,
} from "../services/authApi";
export default function ForgotPasswordScreen() {
const [phone, setPhone] =
  useState("");

const [loading, setLoading] =
  useState(false);

const [errorMessage,
setErrorMessage] =
  useState("");

const [successMessage,
setSuccessMessage] =
  useState("");
const handleSendOtp =
  async () => {

    try {

      setLoading(true);

      setErrorMessage("");

      setSuccessMessage("");

      const response =
        await forgotPassword(phone);

      console.log(response);

      setSuccessMessage(
        "OTP sent successfully"
      );

    } catch (error: any) {

      console.log(error);

      setErrorMessage(
        "Failed to send OTP"
      );

    } finally {

      setLoading(false);
    }
};
return (
  <SafeAreaView style={styles.safeArea}>

    <View style={styles.container}>

      <Text style={styles.heading}>
        Forgot Password
      </Text>

      <Text style={styles.subHeading}>
        Enter your phone to receive an OTP on WhatsApp
      </Text>

      {/* Error Message */}
      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      {/* Success Message */}
      {successMessage ? (
        <View style={styles.successBox}>
          <Text style={styles.successText}>
            {successMessage}
          </Text>
        </View>
      ) : null}

      {/* Phone Input */}
      <View style={styles.inputSection}>

        <Text style={styles.label}>
          Phone Number
        </Text>

        <View style={styles.inputContainer}>

          <Text style={styles.countryCode}>
            +91
          </Text>

          <TextInput
            placeholder="Enter 10-digit phone number"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />

        </View>

      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSendOtp}
        disabled={loading}
      >

        <Text style={styles.buttonText}>
          {loading
            ? "Sending..."
            : "Send OTP"}
        </Text>

      </TouchableOpacity>

      {/* Back */}
      <TouchableOpacity
        onPress={() =>
          router.push("/")
        }
      >

        <Text style={styles.backText}>
          Back to Login
        </Text>

      </TouchableOpacity>

    </View>

  </SafeAreaView>
);
}
const styles = StyleSheet.create({
safeArea: {
  flex: 1,
  backgroundColor: "#F7F7F5",
},

container: {
  flex: 1,
  paddingHorizontal: 26,
  justifyContent: "center",
},

heading: {
  fontSize: 34,
  fontWeight: "bold",
  color: "#111827",
  textAlign: "center",
},

subHeading: {
  marginTop: 12,
  fontSize: 16,
  color: "#6B7280",
  textAlign: "center",
  lineHeight: 24,
  marginBottom: 40,
},

inputSection: {
  marginBottom: 24,
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
  borderColor: "#0F7A4F",
  borderRadius: 32,
  backgroundColor: "white",
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 18,
},

countryCode: {
  fontSize: 18,
  fontWeight: "600",
  color: "#111827",
},

input: {
  flex: 1,
  marginLeft: 10,
  fontSize: 16,
  color: "#111827",
},

button: {
  backgroundColor: "#0F7A4F",
  height: 62,
  borderRadius: 32,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 12,
},

buttonText: {
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
},

backText: {
  textAlign: "center",
  color: "#0F7A4F",
  fontSize: 16,
  fontWeight: "600",
  marginTop: 30,
},

errorBox: {
  backgroundColor: "#DC2626",
  padding: 14,
  borderRadius: 14,
  marginBottom: 20,
},

errorText: {
  color: "white",
  textAlign: "center",
  fontWeight: "600",
},

successBox: {
  backgroundColor: "#16A34A",
  padding: 14,
  borderRadius: 14,
  marginBottom: 20,
},

successText: {
  color: "white",
  textAlign: "center",
  fontWeight: "600",
}});